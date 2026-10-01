import React, { useEffect, useState } from 'react'
import TodoItem from './TodoItem'

export default function Todos({ todos, onEdit, onDone, onDelete, onConfirm, onSearch }) {
    const [operation, setOperation] = useState(false);
    useEffect(() => {
        const handleClick = () => {
            setOperation(false);
        };
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    const displayTodos = onSearch ? onSearch : todos;

    return (
        <div className="container pb-3 my-4" style={{
            minHeight: "50vh",
            maxWidth: "800px"
        }}
        >
            <div className="d-flex align-items-center justify-content-between mb-4">
                <h3 className="mb-0 fw-semibold">
                    <i className="bi bi-list-check me-2 text-primary"></i>
                    Todos List
                </h3>

                <span className="badge text-bg-light border">
                    {displayTodos.length} {displayTodos.length === 1 ? "Todo" : "Todos"}
                </span>
            </div>

            {displayTodos.length && !displayTodos.completed ? (
                displayTodos.filter(todo => !todo.completed).map((todo, index) => (
                    <TodoItem
                        key={todo.sno}
                        index={index}
                        todo={todo}
                        onEdit={onEdit}
                        onDone={onDone}
                        onDelete={onDelete}
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
            {displayTodos.filter(todo => todo.completed).length?
                (<div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Completed Todos List
                            </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse " data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                {displayTodos.filter(todo => todo.completed).map((todo, index) => (
                                    <TodoItem
                                        key={todo.sno}
                                        index={index}
                                        todo={todo}
                                        onEdit={onEdit}
                                        onDone={onDone}
                                        onDelete={onDelete}
                                        onConfirm={onConfirm}
                                        operation={operation}
                                        onOperation={setOperation}
                                    />
                                ))
                                }
                            </div>
                        </div>
                    </div>
                </div>)
                : ""}
        </div>
    )
}