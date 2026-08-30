import React from 'react'
import TodoItem from './TodoItem'

export default function Todos({ onSearch, todos, onDelete, onEdit, onDone }) {
    const MyStyle = {
        minHeight: "50vh",
    }

    const displayTodos = onSearch ? onSearch : todos;

    return (
        <div className="container pb-3 my-4" style={MyStyle}>
            <div className="d-flex align-items-center justify-content-between mb-4">
                <h3 className="mb-0 fw-semibold">
                    <i className="bi bi-list-check me-2 text-primary"></i>
                    Todos List
                </h3>

                <span className="badge text-bg-light border">
                    {displayTodos.length} {displayTodos.length === 1 ? "Todo" : "Todos"}
                </span>
            </div>

            {displayTodos.length ? (
                displayTodos.map((todo, index) => (
                    <TodoItem
                        key={todo.sno}
                        index={index}
                        todo={todo}
                        onDelete={() => onDelete(todo)}
                        onEdit={onEdit}
                        onDone={onDone}
                    />
                ))
            ) : (
                <div className="alert alert-secondary d-flex align-items-center gap-2 mb-0">
                    <i className="bi bi-inbox fs-5"></i>
                    <span>No Todo to Display</span>
                </div>
            )}
        </div>
    )
}