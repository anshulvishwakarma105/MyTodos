import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Todos from '../components/Todos'
import AddTodo from '../components/AddTodo'
import EditTodo from '../components/EditTodo'
import { Alert, Confirm } from '../components/Popups'

export default function Todo() {
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
    const [alert, setAlert] = useState(null);
    const [confirm, setConfirm] = useState(false);
    const [search, setSearch] = useState("");

    const handleAddTodo = (title, desc, date, time) => {
        const exists = todos.some((todo) =>
            todo.title === title);
        if (exists) {
            setAlert({
                type: 'warning',
                message: "This Title already exists!!",
                icon: 'exclamation-triangle-fill'
            });
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
        setAlert({
            type: 'success',
            message: "You Added The Todo Successfully",
            icon: "check-circle-fill"
        });
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
        setAlert({
            type: 'success',
            message: "You Updated The Todo Task!",
            icon: "check-circle-fill"
        });
    }
    const handleDeleteTodo = (todo) => {
        setTodos(todos.filter((e) => {
            return e !== todo
        }));
        setConfirm(false);
        setAlert({
            type: 'success',
            message: "You Deleted The Todo Successfully",
            icon: "check-circle-fill"
        });
    }
    const handleTodoStatus = (newTodo) => {
        setTodos((todos) =>
            todos.map((todo) =>
                todo.sno === newTodo.sno
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        );
        if (!newTodo.completed) {
            setAlert({
                type: 'success',
                message: 'You Completed The Todo Task!',
                icon: 'check-circle-fill'
            });
        }
    };


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
            <Header
                search={search}
                onSearch={setSearch}
                onAlert={setAlert}
                onAdd={setAddTodo}
            />
            <Todos
                todos={todos}
                onEdit={setEditTodo}
                onDone={handleTodoStatus}
                onDelete={handleDeleteTodo}
                onConfirm={setConfirm}
                onSearch={results}
            />
            {addTodo &&
                <AddTodo
                    onSave={handleAddTodo}
                    onClose={() => { setAddTodo(false) }}
                    onAlert={setAlert}
                />}
            {editTodo &&
                <EditTodo
                    todo={editTodo}
                    onSave={handleUpdateTodo}
                    onClose={() => { setEditTodo(false) }}
                    onAlert={setAlert}
                />}
            {alert &&
                <Alert
                    alert={alert}
                    onAlert={setAlert}
                />
            }
            {confirm &&
                <Confirm
                    confirmTodo={confirm}
                    onDelete={handleDeleteTodo}
                    onConfirm={setConfirm} />
            }
        </>
    )
}
