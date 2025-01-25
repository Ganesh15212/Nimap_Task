import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                {/* Navbar Links always visible without the toggle button */}
                <div className="navbar-collapse show" id="navbarNav">
                    <ul className="navbar-nav d-flex justify-content-center w-100 ">
                        <li className="nav-item mx-3">
                            <Link className="nav-link" to="/categories">
                                <h2 className='text-info'>Category Master</h2>
                            </Link>
                        </li>
                        <li className="nav-item mx-3">
                            <Link className="nav-link" to="/products">
                                <h2 className='text-warning'>Product Master</h2>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
