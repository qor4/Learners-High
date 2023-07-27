// 로그인 페이지 후보(신동민 단독)
import styles from "./LogInSignUpPage.scss";

import React, { useState } from "react";

const FormStructor = () => {
    const [isLoginShown, setLoginShown] = useState(true);
    const [isSignupShown, setSignupShown] = useState(false);

    const handleLoginClick = () => {
        setLoginShown(true);
        setSignupShown(false);
    };

    const handleSignupClick = () => {
        setLoginShown(false);
        setSignupShown(true);
    };

    return (
        <div className="form-structor">
            <div className={`signup ${isLoginShown ? "slide-up" : ""}`}>
                <h2
                    className="form-title"
                    id="signup"
                    onClick={handleSignupClick}
                >
                    <span>or</span>Sign up
                </h2>
                <div className="form-holder">
                    <input type="text" className="input" placeholder="Name" />
                    <input type="email" className="input" placeholder="Email" />
                    <input
                        type="password"
                        className="input"
                        placeholder="Password"
                    />
                </div>
                <button className="submit-btn">Sign up</button>
            </div>

            <div className={`login ${isSignupShown ? "slide-up" : ""}`}>
                <div className="center" onClick={handleLoginClick}>
                    <h2 className="form-title" id="login">
                        <span>or</span>Log in
                    </h2>
                    <div className="form-holder">
                        <input
                            type="email"
                            className="input"
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            className="input"
                            placeholder="Password"
                        />
                    </div>
                    <button className="submit-btn">Log in</button>
                </div>
            </div>
        </div>
    );
};

export default FormStructor;
