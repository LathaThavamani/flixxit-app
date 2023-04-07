import React, { useState } from 'react';
import '../../styles/Signin.css'
import { Link, useLocation, useNavigate } from "react-router-dom"
import validator from 'email-validator'

const Signin = () => {

    const navigate = useNavigate();
    const location = useLocation();
    let emailHistory = location.state?.email || ""

    const [email, setEmail] = useState(emailHistory)

    const [password, setPassword] = useState("")
    const [emailErr, setEmailErr] = useState(false)
    const [passErr, setPassErr] = useState(false)
    const [err, setErr] = useState("")

    const handleEmail = (e) => {
        e.preventDefault()

        if (email.length > 6) {
            setEmailErr(false)
        }
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        e.preventDefault()

        if (password.length > 4) {
            setPassErr(false)
        }
        setPassword(e.target.value)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        setErr("")
        const valid = validator.validate(email)

        if (!valid) {
            setEmailErr(true)
        }

        if (password.length < 4) {
            setPassErr(true)
        }

        else {
            navigate("/dashboard")
        }
    }


    return (
        <div className="full">
            <div className="layer" >

                <img className="logo" src="/images/flixxit-logo.png" alt="logo" />
                <div className="box">
                    <div>
                        <h2>Sign in</h2>
                    </div>
                    {err && <div className="error1">  {err} <Link to="/login" > create a new account. </Link> </div>}
                    <div>
                        <input placeholder="Email" className={email.length > 0 ? "inputbox" : "floating"} type="text" value={email} onChange={handleEmail} />
                        {emailErr && <div className="error"> <div className="line"></div> <div className="errtext">Please enter a valid email address or phone number.</div> </div>}
                    </div>
                    <div>
                        <input placeholder="Password" className={password.length > 0 ? "inputbox" : "floating"} type="password" value={password} onChange={handlePassword} />
                        {passErr && <div className="error"> <div className="line"></div> <div className="errtext">Your password must contain between 4 and 60 characters.</div> </div>}
                    </div>
                    <div>
                        <button onClick={handleLogin} className="signin">Sign In</button>
                    </div>
                    <div className="bottom">
                        <div className="forgot">
                            <input className="check" type="checkbox" />
                            <div> Remember Me </div>
                            <div className="help" >  Need Help? </div>
                        </div>
                    </div>
                    <div className="fb">

                        <img src="https://i.pinimg.com/originals/30/99/af/3099aff4115ee20f43e3cdad04f59c48.png" alt="fb" className="fbimg" />
                        <div> Login with Facebook </div>
                    </div>
                    <div className="new" >
                        <div className="new1">New To Flixxit?</div>
                        <div onClick={() => navigate("/signup")} className="new2">Sign up now.</div>
                    </div>
                    <div className="secure">
                        <div>This page is protected by Google reCAPTCHA to ensure you're not a bot. <div className="blue">Learn more.</div> </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Signin;