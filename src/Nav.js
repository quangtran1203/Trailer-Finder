import React, { useEffect, useState } from 'react';
import "./Nav.css";
import logo from "./mylogo.png";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from './StateProvider';
import { auth } from './firebase';

function Nav() {

    const history = useHistory();
    const [{ user }, dispatch] = useStateValue();
    const [show, handleShow] = useState(false);
    const handleAuth = () => {
        if (user) {
            auth.signOut();
            alert("SIGNED OUT SUCCESSFULLY!");
            history.push("/");
        }
    };
    const handleFavourites = () => {
        if (!user) {
            alert("Please Login first to view favourites!");
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true);
            }
            else {
                handleShow(false);
            }
        });
        
    }, []);

    return (
        <div className={`nav ${show && "nav_dark"}`}>
            <Link to="/">
                <img className="nav_logo" src={logo} alt="Logo" />
            </Link>
            <div className="nav_content">
                <Link to={user!=null && "/favourites"}>
                    <h3 className="favourites" onClick={handleFavourites}>My Favourites</h3>
                </Link>
                <Link to="/search">
                    <button className="search_button">Search</button>
                </Link>
                    <Link to={!user && "/login"}>
                    <button className="login_button" onClick={handleAuth}>{!user ? "Login" : "Sign Out"}</button>
                    </Link>
                    <p className="user_info">{user ? user?.email : "Hello Guest"}</p>
            </div>
        </div>
    )
}

export default Nav
