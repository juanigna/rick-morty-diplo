import { Link } from "react-router-dom"
import "./Navbar.css"
import { Outlet } from "react-router-dom"

export default function Navbar() {
    return (
        <div>
            <nav className="navbar">
                <div className="nav-buttons">
                    <Link to={'/characters'}>
                        Characters
                    </Link>
                    <Link to={'/contact'}>
                        Contact
                    </Link>
                </div>
            </nav>
            <Outlet />
        </div>
    )
}