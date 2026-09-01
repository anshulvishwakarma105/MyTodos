import React, { useState } from 'react'

export default function TodoItem(props) {
    const [showSchedule, setShowSchedule] = useState(false);

    const scheduleTime = (todo) => {
        const Added_at = new Date(todo.added_at);
        const current = new Date();
        const diffMs = current - Added_at;
        let seconds = Math.floor(Math.abs(diffMs / 1000));

        const year = Math.floor(seconds / (365 * 24 * 60 * 60));
        seconds %= 365 * 24 * 60 * 60;
        const month = Math.floor(seconds / (30 * 24 * 60 * 60));
        seconds %= 30 * 24 * 60 * 60;
        const day = Math.floor(seconds / (24 * 60 * 60));
        seconds %= 24 * 60 * 60;
        const hour = Math.floor(seconds / (60 * 60));
        seconds %= 60 * 60;
        const minute = Math.floor(seconds / 60);
        seconds %= 60;

        let value;
        let unit;

        if (year > 0) {
            value = year;
            unit = "year";
        } else if (month > 0) {
            value = month;
            unit = "month";
        } else if (day > 0) {
            value = day;
            unit = "day";
        } else if (hour > 0) {
            value = hour;
            unit = "hr";
        } else if (minute > 0) {
            value = minute;
            unit = "min";
        } else {
            value = seconds;
            unit = "sec";
        }

        return `${value} ${unit}${value !== 1 ? "s" : ""} ago`;
    };

    return (
        <div className="card mb-3 shadow-sm">
            <div className="d-flex flex-column">
                <div className="card-body d-flex flex-row justify-content-between align-items-center border-bottom p-3">
                    <div className="d-flex align-items-center gap-3 flex-grow-1 overflow-hidden">
                        <div className="border rounded-2 fs-5 text-secondary d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: "40px", height: "40px" }}>
                            {props.index + 1}
                        </div>
                        <div className="overflow-hidden">
                            <p className={`card-title mb-1 fw-bold text-truncate ${props.todo.completed ? "text-decoration-line-through text-muted" : ""}`} style={{ fontSize: "16px" }} title={props.todo.title}>
                                {props.todo.title}
                            </p>
                            <p className={`card-text mb-0 text-truncate ${props.todo.completed ? "text-decoration-line-through text-muted" : "text-secondary"}`} title={props.todo.desc}>
                                {props.todo.desc}
                            </p>
                        </div>
                    </div>
                    <div className="d-flex flex-column gap-2 align-items-center justify-content-sm-end flex-shrink-0 ms-2">
                        <div className="d-flex gap-2 align-items-center">
                            <input
                                type="checkbox"
                                className="form-check-input m-0"
                                checked={props.todo.completed}
                                onChange={() => props.onDone(props.todo)}
                                style={{ padding: "12px", cursor: "pointer" }}
                                title="Mark as completed"
                            />
                            <button type="button" className="btn btn-sm btn-primary px-2" onClick={() => props.onEdit(props.todo)} title="Edit Todo">
                                <i className="bi bi-pencil"></i>
                                <span className="d-none d-lg-inline px-2 ms-1">Edit</span>
                            </button>
                            <button type="button" className="btn btn-sm btn-danger px-2" onClick={props.onDelete} title="Delete Todo">
                                <i className="bi bi-trash"></i>
                                <span className="d-none d-lg-inline px-2 ms-1">Delete</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="d-flex align-items-center justify-content-between py-2 px-3" style={{ minHeight: "63px" }}>
                    <div
                        className="pe-3 d-flex flex-column flex-md-row justify-content-center align-items-center mb-auto mb-md-0"
                        style={{ fontSize: "14px" }}
                    >
                        <button type="button" className="btn btn-info btn-sm border-0 text-light px-2  me-lg-2 " onClick={() => setShowSchedule(prev => !prev)}>
                            <i className="bi bi-calendar3 me-2"></i>
                            {showSchedule ? "Hide" : "Show"} Schedule
                            <i className={`bi ms-2 ${showSchedule ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
                        </button>
                        {showSchedule && (
                            <div className="ps-lg-3 mt-2 mt-lg-0 text-secondary">
                                <span className="me-2">
                                    <i className="bi bi-calendar-event me-1"></i>
                                    {props.todo.schedule.date}
                                </span>
                                <span className="me-2 text-muted">|</span>
                                <span>
                                    <i className="bi bi-clock me-1"></i>
                                    {props.todo.schedule.time}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="d-flex flex-column flex-lg-row align-items-center gap-1 gap-lg-2">
                        <div className="text-dark fw-bold">
                            Added At<span className="d-none d-lg-inline ms-1">:</span>
                        </div>
                        <div className="text-secondary small text-nowrap">
                            <i className="bi bi-clock-history me-2"></i>
                            {scheduleTime(props.todo)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}