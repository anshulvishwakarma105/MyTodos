import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Todos from './components/Todos'
import Footer from './components/Footer'
import AddTodo from './components/AddTodo'
import About from './components/About'
import { Routes, Route } from 'react-router'
import EditTodo from './components/EditTodo'
import Header from './components/Header'


function App() {
  //initialization
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  }
  else {
    initTodo = JSON.parse(localStorage.getItem("todos"))
  }

  //states
  const [todos, setTodos] = useState(initTodo);
  const [results, setResults] = useState("");
  const [editTodo, setEditTodo] = useState(false);
  const [addTodo, setAddTodo] = useState(false);
  const [search, setSearch] = useState("");


  //Task done /unndone toggler
  const handleTodoStatus = (newTodo) => {
    setTodos((todos) => {
      return todos.map((todo) => {
        return todo.sno === newTodo.sno ?
          { ...todo, completed: !todo.completed }
          : todo
      })
    })
  }

  // Task update /toggler functions
  const handleEditToggler = (todo) => {
    setEditTodo(todo)
  }
  const handleUpdateTodo = (sno, newTitle, newDesc, newDate, newTime) => {
    setTodos((todos) => {
      return todos.map((todo) => {
        return todo.sno === sno ?
          {
            ...todo,
            sno: sno,
            title: newTitle.trim(),
            desc: newDesc.trim(),
            schedule: {
              date: newDate,
              time: newTime
            },
            notified: false

          }
          : todo
      })
    })
    setEditTodo(false)
  }
  // Task delete function
  const handleDeleteTodo = (todo) => {
    const confirmed = window.confirm(`Are you sure you want to delete this Todo?\n '${todo.title}'`);
    if (confirmed) {
      setTodos(todos.filter((e) => {
        return e !== todo
      }))
    }
  }
  // Task add /toggler functions
  const handleAddToggler = () => {
    setAddTodo(true)
  }
  const handleAddTodo = (title, desc, date, time) => {
    const exists = todos.some((todo) =>
      todo.title.trim() === title.trim()
    );
    if (exists) {
      alert("This Title already exists!!")
      return;
    }
    let sno;
    if (todos.length === 0) {
      sno = 1;
    }
    else {
      sno = todos[todos.length - 1].sno + 1;
    }
    const todo = {
      sno: sno,
      title: title.trim(),
      desc: desc.trim(),
      added_at: new Date(),
      schedule: {
        date: date,
        time: time
      },
      notified: false,
      completed: false
    };
    setTodos([...todos, todo])
    setAddTodo(false)
  }
  //serch results useEffect() function
  useEffect(() => {
    const results = todos.filter(todo =>
      todo.title.toLowerCase().includes(search.toLowerCase()) ||
      todo.desc.toLowerCase().includes(search.toLowerCase())
    )
    setResults(results);
  }, [todos, search])

  // useEffect to save onChange [todos]
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  // useEffect for notification 
  useEffect(() => {
    try {
      if (
        typeof window !== "undefined" &&
        "Notification" in window &&
        Notification.permission === "default"
      ) {
        Notification.requestPermission().catch(() => { });
      }
    } catch (error) {
      console.log("Notification permission error:", error);
    }
  }, []);

  useEffect(() => {
    try {
      if (
        typeof window === "undefined" ||
        !("Notification" in window)
      ) {
        return;
      }

      if (Notification.permission !== "granted") {
        return;
      }

      const timers = [];

      todos.forEach((todo) => {
        try {
          if (
            !todo ||
            todo.completed ||
            todo.notified ||
            !todo.schedule?.date ||
            !todo.schedule?.time
          ) {
            return;
          }

          const scheduledTime = new Date(
            `${todo.schedule.date}T${todo.schedule.time}:00`
          );

          if (isNaN(scheduledTime.getTime())) {
            return;
          }

          const delay = scheduledTime.getTime() - Date.now();

          const showNotification = () => {
            try {
              new Notification(`Todo Reminder: ${todo.title}`, {
                body: todo.desc || "",
                icon: "/favicon.png"
              });

              setTodos((currentTodos) =>
                currentTodos.map((currentTodo) =>
                  currentTodo.sno === todo.sno
                    ? { ...currentTodo, notified: true }
                    : currentTodo
                )
              );
            } catch (error) {
              console.log("Notification failed:", error);
            }
          };

          if (delay <= 0) {
            showNotification();
          } else {
            const timer = setTimeout(showNotification, delay);
            timers.push(timer);
          }
        } catch (error) {
          console.log("Todo notification check failed:", error);
        }
      });

      return () => {
        timers.forEach((timer) => clearTimeout(timer));
      };
    } catch (error) {
      console.log("Notification system error:", error);
    }
  }, [todos]);


  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>

            <Header
              search={search}
              setSearch={setSearch}
              onAdd={handleAddToggler}
            />
            <Todos
              todos={todos}
              onSearch={results}
              onDelete={handleDeleteTodo}
              onEdit={handleEditToggler}
              onDone={handleTodoStatus}
            />
          </>
        }>
        </Route>
        <Route path="/about" element={<About />}></Route>
      </Routes >
      <Footer />
      {addTodo &&
        <AddTodo
          onClose={() => { setAddTodo(false) }}
          onSave={handleAddTodo}

        />}
      {editTodo &&
        <EditTodo
          todo={editTodo}
          onClose={() => { setEditTodo(false) }}
          onSave={handleUpdateTodo}
        />}


    </>
  )
}

export default App
