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
            }

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
