import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

    const closeMenu = () => {

        const checkbox =
        document.getElementById("menu-toggle");

        if (checkbox) {

            checkbox.checked = false;

        }

    };

    return (

        <nav className="custom-navbar">

            <div className="nav-container">

                {/* Logo */}
                <Link
                    className="nav-logo"
                    to="/"
                    onClick={closeMenu}
                >

                    <i
                        id="tree"
                        className="bi bi-tree-fill"
                    ></i>

                    <span>
                        IOT Plant Watering
                    </span>

                </Link>

                {/* Toggle */}
                <input
                    type="checkbox"
                    id="menu-toggle"
                />

                {/* Hamburger */}
                <label
                    htmlFor="menu-toggle"
                    className="hamburger"
                >

                    <span></span>
                    <span></span>
                    <span></span>

                </label>

                {/* Nav Links */}
                <ul className="nav-links">

                    <li>

                        <Link
                            to="/"
                            onClick={closeMenu}
                        >
                            Home
                        </Link>

                    </li>

                    <li>

                        <Link
                            to="/Demonstration"
                            onClick={closeMenu}
                        >
                            Demonstration
                        </Link>

                    </li>

                    <li>

                        <Link
                            to="/DetailsPlant"
                            onClick={closeMenu}
                        >
                            Plant Care
                        </Link>

                    </li>

                    <li>

                        <Link
                            to="/Circuit"
                            onClick={closeMenu}
                        >
                            Circuit
                        </Link>

                    </li>

                    <li>

                        <Link
                            to="/TreeData"
                            onClick={closeMenu}
                        >
                            Tree Data
                        </Link>

                    </li>

                </ul>

            </div>

        </nav>

    );
}

export default Navbar;