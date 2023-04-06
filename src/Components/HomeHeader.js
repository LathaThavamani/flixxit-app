import React, { useState } from 'react'
import '../Styles/Home.css'
import { Button, TextField } from '@mui/material'
//import validator from 'email-validator'
import { useHistory } from 'react-router-dom';

const HomeHeader = () => {
    const [email, setEmail] = useState('')
    const [errorMsg, setErrorMsg] = useState("");
    const [emailValidate, setEmailValidate] = useState(false);

    //const history = useHistory()

    const handleSubmit = () => {
    }


    const handleClick = () => {
    }

    return (
        <div className="cover_container">
            <img src="/images/bg_main.jpg" alt="cover" className="cover_image" />
            <div className="cover_content">
                <div className="cover_content_header">
                    <img src="/Images/flixxit-logo.png" alt="logo" />
                    <button onClick={handleClick} className="sign_in_btn" >Sign In</button>
                </div>
                <div className="cover_content_register">
                    <h1>Unlimited movies, TV <br /> shows and more</h1>
                    <h3>Watch anywhere. Cancel anytime</h3>
                    <h4>Ready to watch? Enter your email to create or restart your membership.</h4>
                </div>
                <div className="cover_content_get_started">
                    <div>
                        <TextField
                            variant="filled"
                            label="Email address"
                            className="input"
                            color='secondary'
                            type='email'
                            value={email}
                            onChange={(e) => {

                                setEmail(e.target.value)
                                setErrorMsg("")
                            }}

                        />
                    </div>
                    <button onClick={() => handleSubmit()}>Get Started</button>
                </div>
                {errorMsg &&

                    <div className="error">{errorMsg}</div>

                }
                {emailValidate && <div className="error">Please enter a valid email address.</div>}
            </div>
        </div>
    )
}

export default HomeHeader