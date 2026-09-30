import React, { useEffect } from 'react'

function TodoItemOperations({ todo, onDone, onEdit, onConfirm, onOperation }) {
    return (
        <div
            className="position-absolute position-up-right d-flex flex-column gap-2
                           align-items-center flex-shrink-0
                           border rounded bg-dark py-3 px-3  w-auto
                           "
            style={{
                zIndex: "3000"
            }}>
            <div
                className={`btn btn-outline-${todo.completed ? "success" : "warning"} d-flex justify-content-evenly gap-2`}
                onClick={() => {
                    onDone(todo)
                    // onOperation(false)
                }}
            >
                {todo.completed ?
                    <i className="bi bi-check-lg "></i> :
                    <i className="bi bi-exclamation-triangle"></i>
                }

                <span>Check</span>
            </div>

            <button type="button" className=" w-100 btn btn-primary px-2 d-flex gap-2 justify-content-evenly"
                onClick={() => {
                    onEdit(todo)
                    onOperation(false)
                }}
                title="Edit Todo">
                <i className="bi bi-pencil"></i>
                <span>Edit</span>
            </button>
            <button type="button" className=" w-100 btn btn-danger px-2 d-flex gap-2 justify-content-evenly"
                onClick={() => {
                    onOperation(false);
                    onConfirm(todo);
                }}
                title="Delete Todo">
                <i className="bi bi-trash"></i>
                <span>Delete</span>
            </button>
        </div>
    )
}
function Alert({ alert, onAlert }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onAlert(null)
        }, 3000);

        return () => clearTimeout(timer);
    }, [alert])

    return (
        <div className='position-absolute top-0 start-50 translate-middle-x '
            style={{
                marginTop: "48px",
                zIndex: "3000"
            }}>
            <div className={`alert alert-${alert.type} d-flex align-items-center justify-content-center `} role="alert"
            style={{
                minWidth:"300px"
            }}>
                <i className={`bi bi-${alert.icon} me-2`}></i>
                <div>
                    {alert.message}
                </div>
            </div>
        </div>
    )
}
function Confirm({ confirmTodo, onDelete, onConfirm }) {
    return (
        <>
            <div className='position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 
                 d-flex align-items-center justify-content-center'
                style={{
                    zIndex: "2000"
                }}>

                <div className=' rounded bg-dark text-light py-3 px-4'
                    style={{
                        maxWidth: "350px"
                    }}>
                    <p>Are You Sure You Want to Delete this Todo: </p>
                    <div className='d-flex justify-content-between gap-2'>
                        <button
                            className='btn btn-danger w-100'
                            onClick={() => onDelete(confirmTodo)}
                        >Delete</button>
                        <button
                            className='btn btn-outline-secondary w-100'
                            onClick={() => onConfirm(null)}
                        >Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export { TodoItemOperations, Alert, Confirm }