import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import { toast } from 'react-hot-toast';
import SearchInput from '../form/searchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';


const Header = () => {
    const [auth, setAuth] = useAuth()
    const [cart] = useCart();
    const categories = useCategory()
    const handleLogout = () => {
        setAuth({
            ...auth, user: null, token: ""
        })
        localStorage.removeItem("auth")
        toast.success("Logout Successfully")
    }
    return (
        <>
            <nav className="navbar nav-btm navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <img
                            className="navbar-brand me-2"
                            src={require('../../wood.png')}
                            style={{ width: '15%', height: '40px' }}
                            alt="Logo"
                        />


                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0"> {/* Add ms-auto class to align the <ul> to the right */}
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link">
                                    Home
                                </NavLink>
                            </li>
                            <div className="me-2">
                            <NavLink to="/products" className="nav-link">
                                    Products
                                </NavLink>
                            </div>
                            {!auth.user ? (
                                <>
                                    <li className="nav-item">
                                        <NavLink to="/register" className="nav-link">
                                            Register
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/login" className="nav-link">
                                            Login
                                        </NavLink>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item dropdown">
                                        <Link
                                            className="nav-link dropdown-toggle"
                                            href="#"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            {auth?.user?.name}
                                        </Link>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <NavLink
                                                    to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'
                                                        }`}
                                                    className="dropdown-item"
                                                >
                                                    Dashboard
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    onClick={handleLogout}
                                                    to="/login"
                                                    className="dropdown-item"
                                                >
                                                    Logout
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                </>
                            )}
                            <li className="nav-item">
                                <NavLink to="/cart" className="nav-link">
                                    <i class="fa fa-shopping-cart cart" ></i>({cart?.length})
                                </NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link dropdown-toggle"
                                    to={'/categories'}
                                    data-bs-toggle="dropdown"
                                >
                                    Categories
                                </Link>
                                <ul className="dropdown-menu">
                                    <Link className="dropdown-item" to={'/categories'}>
                                        All Categories
                                    </Link>
                                    {categories?.map((c) => (
                                        <li key={c.slug}> {/* Added key prop to resolve React warning */}
                                            <Link
                                                className="dropdown-item"
                                                to={`/category/${c.slug}`}
                                            >
                                                {c.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>



        </>
    )
}

export default Header