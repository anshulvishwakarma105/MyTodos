import React, { useState, useEffect, useReducer } from 'react'
import Header from '../components/uiComponents/Header'
import Todos from '../components/uiComponents/Todos'
import AddTodo from '../components/modifyComponents/AddTodo'
import EditTodo from '../components/modifyComponents/EditTodo'
import { Alert, Confirm } from '../components/Popups'
import { PageTitle } from '../components/Calculation'
import { todoReducer } from '../reducer/reducer'

export default function Todo() {
    //initialization
    let initTodo;
    if (localStorage.getItem("todos") === null) {
        initTodo = [];
    }
    else {
        initTodo = JSON.parse(localStorage.getItem("todos"))
    }

    const [todos, dispatch] = useReducer(todoReducer, initTodo);
    //states
    const [results, setResults] = useState("");
    const [editTodo, setEditTodo] = useState(false);
    const [addTodo, setAddTodo] = useState(false);
    const [alert, setAlert] = useState(null);
    const [confirm, setConfirm] = useState(false);
    const [search, setSearch] = useState("");


    const handleAddTodo = (title, desc, date, time) => {
        const exists = todos.some((todo) =>
            todo.title.toLowerCase() === title.toLowerCase());
        if (exists) {
            setAlert({
                type: 'warning',
                message: "This Title already exists!!",
                icon: 'exclamation-triangle-fill'
            });
            return;
        }

        dispatch({
            type: "ADD",
            payload: {
                sno: crypto.randomUUID?.()?? Date.now().toString(),
                title: title,
                desc: desc,
                added_at: new Date(),
                schedule: {
                    date: date,
                    time: time
                },
                notified: false,
                completed: false
            }
        });
        setAddTodo(false)
        setAlert({
            type: 'success',
            message: "You Added The Todo Successfully",
            icon: "check-circle-fill"
        });
    }
    const handleUpdateTodo = (sno, newTitle, newDesc, newDate, newTime) => {
        dispatch({
            type: "EDIT",
            payload: {
                sno: sno,
                title: newTitle,
                desc: newDesc,
                schedule: {
                    date: newDate,
                    time: newTime
                }
            }
        })

        setEditTodo(false)
        setAlert({
            type: 'success',
            message: "You Updated The Todo Task!",
            icon: "check-circle-fill"
        });
    }
    const handleDeleteTodo = (todo) => {
        dispatch({
            type: "DELETE",
            payload: todo.sno
        })
        setConfirm(false);
        setAlert({
            type: 'success',
            message: "You Deleted The Todo Successfully",
            icon: "check-circle-fill"
        });
    }
    const handleTodoStatus = (doneTodo) => {
        dispatch({
            type: "STATUS",
            payload: doneTodo.sno
        })

        if (!doneTodo.completed) {
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

                            dispatch({
                                type: "NOTIFY",
                                payload: todo.sno
                            })

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
            <PageTitle title={"App | Task Manager"} />
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
