import { NavLink } from 'react-router'

function Navbar() {
  const navlinks = [
    {
      name: "Home",
      path: "/"
    },
    {
      name: "About",
      path: "/about"
    }]
  return (
    <nav className="navbar navbar-expand-md bg-primary" data-bs-theme="dark">
      <div className="container-fluid px-md-5">
        <NavLink to="/" className="navbar-brand fw-bold align-middle" >
          <span> Todos App</span></NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#navbarOffcanvas"
          aria-controls="navbarOffcanvas"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="offcanvas-md offcanvas-end"
          tabIndex="-1"
          id="navbarOffcanvas"
          aria-labelledby="navbarOffcanvasLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="navbarOffcanvasLabel">
              Menu
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              data-bs-target="#navbarOffcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav ms-auto ">
              {navlinks.map((navlink, index) => (
                <li key={index} className="nav-item px-2" >
                  <NavLink
                    to={navlink.path}
                    onClick={() => {
                      const offcanvas = document.getElementById("navbarOffcanvas");
                      const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
                      bsOffcanvas?.hide();
                    }}
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active" : ""}`}>
                    {navlink.name}
                  </NavLink>
                </li>
              ))}
            </ul >
          </div >
        </div >
      </div >
    </nav >
  )
}

function Footer() {
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

export { Navbar, Footer }