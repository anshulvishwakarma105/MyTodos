import React from 'react'

export default function Footer() {
    return (
        <footer className="bg-primary text-light py-2 fixed-bottom text-center shadow-sm">
            <p className="mb-0 small d-flex align-items-center justify-content-center gap-1">
                <i className="bi bi-check2-square"></i>
                <span>
                    Copyright &copy; MyTodos.com
                </span>
            </p>
        </footer>
    )
}