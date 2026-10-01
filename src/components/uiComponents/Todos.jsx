import React, { useEffect, useState } from 'react'
import TodoItem from './TodoItem'

export default function Todos({ todos, onEdit, onDone, onConfirm, onSearch }) {
    const [operation, setOperation] = useState(false)

    useEffect(() => {
        const handleClick = () => {
            setOperation(false)
        }
        document.addEventListener("click", handleClick)
        return () => {
            document.removeEventListener("click", handleClick)
        }
    }, [])

    const displayTodos = onSearch ? onSearch : todos
    const pendingTodos = displayTodos.filter(todo => !todo.completed);
    const completedTodos = displayTodos.filter(todo => todo.completed);

    return (
        <div className="container pb-3 my-2" style={{ maxWidth: "800px" }}>
            <div className="d-flex align-items-center justify-content-between mb-3">
                <h3 className="mb-0 fw-semibold">
                    <i className="bi bi-list-check me-2 text-primary"></i>
                    Todos List
                </h3>
                <span className="badge text-bg-light border">
                    {displayTodos.length} {displayTodos.length === 1 ? "Todo" : "Todos"}
                </span>
            </div>
            <hr />
            { pendingTodos.length? (
                pendingTodos.map((todo, index) => (
                    <TodoItem
                        key={todo.sno}
                        index={index}
                        todo={todo}
                        onEdit={onEdit}
                        onDone={onDone}
                        onConfirm={onConfirm}
                        operation={operation}
                        onOperation={setOperation}
                    />
                ))
            ) : (
                <div className="alert alert-secondary d-flex align-items-center gap-2 mb-0">
                    <i className="bi bi-inbox fs-5"></i>
                    <span>No Todo to Display</span>
                </div>
            )}
            {completedTodos.length ? (
                <div className="accordion" id="accordionExample" style={{ paddingBottom: "30px" }}>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseOne"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                            >
                                Completed Todos List
                            </button>
                        </h2>
                        <div
                            id="collapseOne"
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionExample"
                        >
                            <div className="accordion-body">
                                {completedTodos.map((todo, index) => (
                                    <TodoItem
                                        key={todo.sno}
                                        index={index}
                                        todo={todo}
                                        onEdit={onEdit}
                                        onDone={onDone}
                                        onConfirm={onConfirm}
                                        operation={operation}
                                        onOperation={setOperation}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}
