import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url =
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDO380q2-0uvgRBOag7GFTg0Apxav3acmM"
        const request = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        })
        const response = await request.json();
        if (response) {
            navigate("/login")
        }
    }

    return (
        <>
            <div className="singup-container">
                <div className="signup">
                    <div className="signup-heading"> Sign up</div>
                    <form onSubmit={handleSubmit} className="signup-form">

                        <input
                            type="email"
                            placeholder="email"
                            className="signup-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="******"
                            className="signup-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="signup-submit">Sign Up</button>
                        <Link to="/login" className="loginlink">Already signed up, Signin</Link>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Signup;
