import React from "react";
import "./Header.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/store";

const Header = () => {
    const cartItems = useSelector((state) => state.cart.cartItem)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLoggedIn = localStorage.getItem("emailId")

    const handleLogout = () => {
        dispatch(logout())
        navigate("/signup")
    }
    return (
        <>
            <div className="nav">
                <div className="navlogo">
                    <Link to="/">MyShop</Link>
                </div>
                <div className="navlink">
                    <Link className="navlinks" to="/">
                        Home
                    </Link>
                    <Link className="navlinks" to="/product">
                        Products
                    </Link>

                    {isLoggedIn && <Link className="navlinks" to="/cart">
                        <ShoppingCartIcon />
                        {cartItems.length > 0 && <span>{cartItems.length}</span>}
                    </Link>
                    }
                    <Link className="navlinks" to="/signup">
                        Signup
                    </Link>

                    {isLoggedIn && <button onClick={handleLogout} className="logoutBtn">Logout</button>}

                </div>
            </div>
        </>
    );
};

export default Header;
