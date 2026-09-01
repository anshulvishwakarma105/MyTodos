
import React, { useState } from 'react'

export default function AddTodo({ onSave, onClose }) {

    const minTime = new Date().toTimeString().slice(0, 5);
    const defaultDate = new Date().toLocaleDateString("en-CA");
    const defaultTime = new Date(Date.now() + 1 * 60000).toTimeString().slice(0, 5);

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [date, setDate] = useState(defaultDate)
    const [time, setTime] = useState(defaultTime)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!title || !desc) {
            return alert("title and desc cannot be empty")
        }

        onSave(title, desc, date, time)
        setTitle("")
        setDesc("")
    }

    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 p-3"
            style={{
                zIndex: 1050,
                backdropFilter: "blur(5px)"
            }}
        >
            <div
                className="card border-0 rounded-4 shadow-lg w-100"
                style={{ maxWidth: "24rem" }}
            >
                <div className="card-body p-4">

                    <form onSubmit={handleSubmit}>

                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <div className="d-flex align-items-center gap-2">
                                <div
                                    className="bg-primary bg-opacity-10 text-primary rounded-3 d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "40px",
                                        height: "40px"
                                    }}
                                >
                                    <i className="bi bi-plus-lg fs-5"></i>
                                </div>

                                <div>
                                    <h3 className="mb-0 fw-semibold">
                                        Add Todo
                                    </h3>
                                    <small className="text-secondary">
                                        Create a new task
                                    </small>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="btn btn-sm btn-light rounded-circle d-flex align-items-center justify-content-center"
                                onClick={onClose}
                                style={{
                                    width: "32px",
                                    height: "32px"
                                }}
                                title="Close"
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>

                        <div className="mb-3">
                            <label
                                htmlFor="title"
                                className="form-label fw-semibold small"
                            >
                                Todo Title
                            </label>

                            <div className="input-group">
                                <span className="input-group-text bg-light border-end-0">
                                    <i className="bi bi-card-heading text-secondary"></i>
                                </span>

                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="form-control border-start-0"
                                    id="title"
                                    placeholder="Enter todo title"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-3">
                            <label
                                htmlFor="desc"
                                className="form-label fw-semibold small"
                            >
                                Todo Description
                            </label>

                            <div className="input-group">
                                <span className="input-group-text bg-light border-end-0 align-items-start pt-2">
                                    <i className="bi bi-text-paragraph text-secondary"></i>
                                </span>

                                <textarea
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                    className="form-control border-start-0"
                                    id="desc"
                                    placeholder="Enter todo description"
                                    rows="2"
                                ></textarea>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="date"
                                className="form-label fw-semibold small"
                            >
                                Todo Date
                            </label>

                            <div className="input-group">
                                <span className="input-group-text bg-light border-end-0">
                                    <i className="bi bi-calendar3 text-secondary"></i>
                                </span>

                                <input
                                    type="date"
                                    value={date}
                                    min={defaultDate}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="form-control border-start-0"
                                    id="date"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="time"
                                className="form-label fw-semibold small"
                            >
                                Todo Time
                            </label>

                            <div className="input-group">
                                <span className="input-group-text bg-light border-end-0">
                                    <i className="bi bi-clock text-secondary"></i>
                                </span>

                                <input
                                    type="time"
                                    value={time}
                                    min={date === defaultDate ? minTime : "00:00"}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="form-control border-start-0"
                                    id="time"
                                />
                            </div>

                            <div className="form-text small">
                                Select when you want to complete this todo.
                            </div>
                        </div>

                        <div className="d-flex gap-2">

                            <button
                                type="submit"
                                className="btn btn-primary flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                            >
                                <i className="bi bi-plus-lg"></i>
                                Add Todo
                            </button>

                            <button
                                type="button"
                                className="btn btn-outline-secondary px-3"
                                onClick={onClose}
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>
            </div>
        </div>
    )
}
