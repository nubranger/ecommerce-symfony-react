import React, {useState} from 'react';
import {Button, Form, Input} from "reactstrap";
import {useProfileContext} from "../context/profile_context";

const Account = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {isProfileBarOpen, closeProfileBar, handleProfile} = useProfileContext();

    return (
        isProfileBarOpen && (
            <div className="account">
                <div className="account__top">
                    <h4>Profile</h4>
                    <i onClick={closeProfileBar} className="bi bi-x"/>
                </div>
                <div className="account__form">
                    <Form onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="validationEmail" className="form-label">Email</label>
                        <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPrepend"><i className="bi bi-at"/></span>
                            <input onChange={(e) => setEmail(e.target.value)}
                                   type="email"
                                   className="form-control"
                                   id="validationEmail"
                                   aria-describedby="inputGroupPrepend" required/>
                        </div>
                        <label htmlFor="validationPassword" className="mt-2 form-label">Password</label>
                        <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPrepend"><i className="bi bi-shield-lock"/></span>
                            <input onChange={(e) => setPassword(e.target.value)} type="password"
                                   className="form-control"
                                   id="validationPassword"
                                   aria-describedby="inputGroupPrepend" required/>
                        </div>
                        <div className="mt-2">
                            <span className="me-1">Stay signed in </span>
                            <Input type="checkbox" name="remember" id="Remember"/>
                            <a className="float-end" href="/forgot-password">Forgot password?</a>
                        </div>
                        <Button onClick={() => handleProfile(email, password)} className="mt-2">Sign in</Button>
                    </Form>
                </div>


                <div>
                    <div className="account__register">
                        <i className="bi bi-person-dash"/>
                        <h5>Don't have account?</h5>
                        <Button className="mt-2">Register</Button>
                    </div>
                </div>
            </div>
        )
    );
};

export default Account;
