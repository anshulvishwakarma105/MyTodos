import React from 'react'

export default function Header({search, onSearch, onAlert, onAdd}) {

    const handleSearchSubmit = (e) => {
        e.preventDefault();

        if (!search.trim()) {
            onAlert({
                type: 'warning',
                message: "Search input cannot be Empty",
                icon: 'exclamation-triangle-fill'
            });
        } else {
            onSearch("");
        }
    }

    return (
            <div 
            className="container-fluid py-3 px-3 d-flex align-items-center justify-content-between gap-3"
            style={{
                maxWidth:"1000px"
            }}>
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
                            className="form-control py-2"
                            type="search"
                            value={search}
                            placeholder="Search todos..."
                            aria-label="Search"
                            onChange={(e) => onSearch(e.target.value)}
                        />
                    </div>
                </form>

                <button
                    type="button"
                    className="btn btn-primary text-nowrap d-flex align-items-center gap-1 px-3"
                    onClick={()=>{onAdd(true)}}
                >
                    <i className="bi bi-plus-lg"></i>
                    Add Todo
                </button>

            </div>
    )
}