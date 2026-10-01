import React, { useState } from 'react'
import { TodoItemOperations } from './Popups';
import { scheduleTime } from './Calculation';

export default function TodoItem({ index, todo, onDone, onEdit, onDelete, onConfirm, operation, onOperation }) {
    return (
        <div className="card mb-3 shadow-sm d-flex flex-column">
            <div className="card-body d-flex flex-row justify-content-between align-items-center border-bottom p-3">
                <div className="d-flex align-items-center gap-3 flex-grow-1 overflow-hidden">
                    <div className="border rounded-2 fs-6 text-secondary d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: "24px", height: "24px" }}>
                        {index + 1}
                    </div>
                    <div className="overflow-hidden">
                        <p className={`card-title mb-1  fw-semibold text-truncate text-capitalize ${todo.completed ? "text-decoration-line-through text-muted" : ""}`} style={{ fontSize: "16px" }}>
                            {todo.title}
                        </p>
                        <p className={`card-text mb-0 text-truncate fst-italic ${todo.completed ? "text-decoration-line-through text-muted" : "text-secondary"}`}>
                            {todo.desc}
                        </p>
                    </div>
                </div>
                <button
                    className='btn  fs-5'
                    onClick={(e) => {
                        e.stopPropagation();
                        onOperation(prev => prev === todo.sno ? false : todo.sno)
                    }}
                ><i className="bi bi-three-dots-vertical"></i>
                </button>

            </div>
            {!todo.completed && <div className="d-flex align-items-center justify-content-between py-2 px-3" >
                <div className=" hstack gap-2 fs-6 text-secondary">
                    <i className="bi bi-calendar-event "></i>
                    {todo.schedule.date}
                    <span className="vr"></span>
                    <span>
                        {todo.schedule.time}
                    </span>
                </div>
                <div className="text-secondary small text-nowrap">
                    <i className="bi bi-clock-history me-2"></i>
                    {scheduleTime(todo.added_at)}
                </div>
            </div>}
            {operation === todo.sno &&
                <TodoItemOperations
                    todo={todo}
                    onDone={onDone}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onConfirm={onConfirm}
                    onOperation={onOperation} />
            }
        </div>
    );
}