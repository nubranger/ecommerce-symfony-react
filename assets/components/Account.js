import React, {useContext, useEffect, useState} from 'react';
import {EshopContext} from "../context/context";
import {Container} from "reactstrap";

const Account = () => {
const { setPassword, setEmail, handleAccount, error } = useContext(EshopContext);

    return (
        <>
            <Container>
                <form onSubmit={handleAccount}>
                    <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="e-mail"/>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password"/>
                    <button>login</button>
                </form>
                <div>{error}</div>
            </Container>
        </>
    );
};

export default Account;
