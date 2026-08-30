import React from 'react'

export default function Header({ onAdd, search, setSearch }) {

    const handleSearchSubmit = (e) => {
        e.preventDefault();

        if (!search.trim()) {
            alert("Search input cannot be Empty")
        } else {
            setSearch("");
        }
    }

    return (
        <div className="container-fluid py-3 px-3">
            <div className="d-flex align-items-center justify-content-between gap-3">

                <form
                    className="d-flex flex-grow-1"
                    role="search"
                    onSubmit={handleSearchSubmit}
                >
                    <div className="input-group">
                        <span className="input-group-text bg-light">
                            <i className="bi bi-search text-secondary"></i>
                        </span>

                        <input
                            className="form-control"
                            type="search"
                            value={search}
                            placeholder="Search todos..."
                            aria-label="Search"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </form>

                <button
                    type="button"
                    className="btn btn-primary text-nowrap d-flex align-items-center gap-1 px-3"
                    onClick={onAdd}
                >
                    <i className="bi bi-plus-lg"></i>
                    Add Todo
                </button>

            </div>
            
        </div>
    )
}