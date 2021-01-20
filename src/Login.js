import React, { useState } from 'react';
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import loginImg from "./loginimg.jpg";
import mylogo from "./mylogo.png";
import { auth } from "./firebase";
import Footer from './Footer';

function Login() {

    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const signIn = event => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then(auth => {
            alert("Logged in successfully!");
            history.push("/");
        }).catch(err => alert(err.message))
    }; 

    const toSignUp = () => {
        history.push("/signup");
    };

    return (
        <div className="login">
            <img className="loginImg" src={loginImg} alt="loginImg"/>
            
            <div className="login_container">
                <Link to="/">
                    <img className="login_logo" src={mylogo} alt="myLogo"/>
                </Link>

                <div className="login_content">
                    <p className="login_note">Click on the logo to go back to the Homepage</p>
                    <h1>Sign-In</h1>
                    <form>
                        <h4>Email</h4>
                        <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                        <h4>Password</h4>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    </form> 
                    <button type="submit" className="signinbutton" onClick={signIn}>Sign In</button>
                    <button className="createbutton" onClick={toSignUp}>New user? Create an account here</button>
                </div>

                <Footer/>
            </div>
        </div>
    )
}

export default Login
