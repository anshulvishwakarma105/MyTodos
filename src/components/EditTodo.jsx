import { useState } from 'react'

export default function EditTodo({ todo, onClose, onSave }) {
    const minDate = new Date().toLocaleDateString("en-CA");
    const minTime = new Date(Date.now() + 5 * 60000).toTimeString().slice(0, 5);

    const [newTitle, setNewTitle] = useState(todo.title)
    const [newDesc, setNewDesc] = useState(todo.desc)
    const [newDate, setNewDate] = useState(todo.schedule.date)
    const [newTime, setNewTime] = useState(todo.schedule.time)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!newTitle || !newDesc) {
            alert("title and desc cannot be empty!");
            return
        }

        if (
            newTitle === todo.title &&
            newDesc === todo.desc &&
            newDate === todo.schedule.date &&
            newTime === todo.schedule.time
        ) {
            alert("Nothing Changed!")
            return;
        }

        onSave(todo.sno, newTitle, newDesc, newTime, newDate)
    }

    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 p-3" style={{ zIndex: 1050, backdropFilter: "blur(5px)" }}>
            <div className="card border-0 rounded-4 shadow-lg w-100" style={{ maxWidth: "24rem" }}>
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <div className="d-flex align-items-center gap-2">
                                <div className="bg-primary bg-opacity-10 text-primary rounded-3 d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
                                    <i className="bi bi-pencil-square fs-5"></i>
                                </div>
                                <div>
                                    <h3 className="mb-0 fw-semibold">Edit Todo</h3>
                                    <small className="text-secondary">Update your task</small>
                                </div>
                            </div>
                            <button type="button" className="btn btn-sm btn-light rounded-circle d-flex align-items-center justify-content-center" onClick={onClose} style={{ width: "32px", height: "32px" }} title="Close">
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="newTitle" className="form-label fw-semibold small">New Title</label>
                            <div className="input-group">
                                <span className="input-group-text bg-light border-end-0">
                                    <i className="bi bi-card-heading text-secondary"></i>
                                </span>
                                <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="form-control border-start-0" id="newTitle" placeholder="Enter new title" />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="newDesc" className="form-label fw-semibold small">New Description</label>
                            <div className="input-group">
                                <span className="input-group-text bg-light border-end-0 align-items-start pt-2">
                                    <i className="bi bi-text-paragraph text-secondary"></i>
                                </span>
                                <textarea value={newDesc} onChange={(e) => setNewDesc(e.target.value)} className="form-control border-start-0" id="newDesc" placeholder="Enter new description" rows="2"></textarea>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="newDate" className="form-label fw-semibold small">New Date</label>
                            <div className="input-group">
                                <span className="input-group-text bg-light border-end-0">
                                    <i className="bi bi-calendar3 text-secondary"></i>
                                </span>
                                <input type="date" value={newDate} min={minDate} onChange={(e) => setNewDate(e.target.value)} className="form-control border-start-0" id="newDate" />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="newTime" className="form-label fw-semibold small">New Time</label>
                            <div className="input-group">
                                <span className="input-group-text bg-light border-end-0">
                                    <i className="bi bi-clock text-secondary"></i>
                                </span>
                                <input type="time" value={newTime} min={newDate === minDate ? minTime : "00:00"} onChange={(e) => setNewTime(e.target.value)} className="form-control border-start-0" id="newTime" />
                            </div>
                        </div>

                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-primary flex-grow-1 d-flex align-items-center justify-content-center gap-2">
                                <i className="bi bi-check-lg"></i>
                                Edit Todo
                            </button>
                            <button type="button" onClick={onClose} className="btn btn-outline-secondary px-3">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}