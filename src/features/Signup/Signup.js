import React, { useState } from 'react'
import '../../styles/Home.css'
import '../../styles/Signup.css'
import { TextField } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Signup = () => {
    const location = useLocation();
    const [email, setEmail] = useState(location.state?.email || "")
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const navigate = useNavigate();


    const returnToHome = () => {
        navigate("/");
    }

    const handleSubmit = () => {
        if (email && password) {
            navigate('/dashboard')
        } else {
            setError(true)
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <img src="/images/bg_main.jpg" alt="cover" className="cover_image" />
            <div className="cover_content">
                <header className="register_header">
                    <div className="register_logo" onClick={returnToHome}>
                        <img src="/images/flixxit-logo.png" alt="logo" />
                    </div>
                    <Link to="/signin" className="sign_in_btn">Sign In</Link>
                </header>
                <div style={{ flex: 1 }} className="register_form_container">
                    <div className="register_form">
                        <div className="register_form_input">
                            <TextField
                                variant="filled"
                                label="Email"
                                fullWidth
                                color='warning'
                                type='email'
                                defaultValue={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="register_form_input">
                            <TextField
                                variant="filled"
                                label="Password"
                                fullWidth
                                color='warning'
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {error && <div style={{ color: 'red', fontSize: 'small' }}>Please fill email and password fields</div>}
                        <div>
                            <button onClick={() => handleSubmit()}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup



