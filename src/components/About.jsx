import React from 'react'

export default function About() {
    return (
        <div className="container my-5">
            <div className="card shadow-sm border-0">
                <div className="card-body p-4 p-md-5">
                    <div className="text-center mb-4">
                        <div className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 text-primary rounded-3 p-3 mb-3">
                            <i className="bi bi-check2-square fs-1"></i>
                        </div>
                        <h2 className="fw-bold mb-2">About My Todos</h2>
                        <p className="text-secondary mb-0">
                            A simple and easy-to-use todo management application.
                        </p>
                    </div>

                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="h-100 border rounded-3 p-4 text-center">
                                <i className="bi bi-plus-circle text-primary fs-2"></i>
                                <h5 className="mt-3 fw-semibold">Create Todos</h5>
                                <p className="text-secondary small mb-0">
                                    Add tasks with a title, description, date and time.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="h-100 border rounded-3 p-4 text-center">
                                <i className="bi bi-pencil-square text-primary fs-2"></i>
                                <h5 className="mt-3 fw-semibold">Manage Todos</h5>
                                <p className="text-secondary small mb-0">
                                    Edit, complete or delete your tasks whenever needed.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="h-100 border rounded-3 p-4 text-center">
                                <i className="bi bi-calendar-check text-primary fs-2"></i>
                                <h5 className="mt-3 fw-semibold">Schedule Tasks</h5>
                                <p className="text-secondary small mb-0">
                                    Set a date and time to keep track of your scheduled tasks.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="border-top mt-5 pt-4 text-center">
                        <p className="text-secondary small mb-0">
                            Built with React, React Router and Bootstrap.
                        </p>
                        <p className="text-primary fw-semibold mb-2 ">
                            Created by Anshul Vishwakarma
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}
