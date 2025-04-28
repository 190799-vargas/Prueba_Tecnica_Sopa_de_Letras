// Barra de navegación
import { Link } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="/">Inicio</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </nav>
    );
};