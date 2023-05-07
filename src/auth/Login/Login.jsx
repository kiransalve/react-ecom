import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/store";

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url =
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDO380q2-0uvgRBOag7GFTg0Apxav3acmM"
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
            dispatch(login(response))
            navigate("/product")
        }
    }

    return (
        <>
            <div className="login-container">
                <div className="login">
                    <div className="login-heading"> Login</div>
                    <form onSubmit={handleSubmit} className="login-form">

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
                        <button type="submit" className="signup-submit">Sign In</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
