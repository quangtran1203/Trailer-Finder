import React, { useState } from 'react';
import "./Signup.css";
import signupimg from "./signupimg.jpg";
import mylogo from "./mylogo.png";
import { Link, useHistory } from "react-router-dom";
import { auth } from './firebase';
import Footer from './Footer';

function Signup() {
    
    const history = useHistory();
    const toSignIn = () => {
        history.push("/login");
    };
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const register = event => {
        event.preventDefault();
        auth.createUserWithEmailAndPassword(email, password).then(auth => {
            if (auth) {
                alert("Registered successfully!!!");
                history.push("/");
            }
        }).catch(err => alert(err.message))
    };

    return (
        <div className="signup">
            <img className="loginImg" src={signupimg} alt="signupImg"/>
            
            <div className="login_container">
                <Link to="/">
                    <img className="login_logo" src={mylogo} alt="myLogo"/>
                </Link>

                <div className="login_content">
                    <p className="login_note">Click on the logo to go back to the Homepage</p>
                    <h1>Sign-Up</h1>
                    <form>
                        <h4>Email</h4>
                        <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                        <h4>Password</h4>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    </form> 
                    <button type="submit" className="signinbutton" onClick={register}>Sign Up</button>
                    <button className="createbutton" onClick={toSignIn}>Back to Sign-In Page</button>
                </div>

                <Footer/>
            </div>
        </div>
    )
}

export default Signup
