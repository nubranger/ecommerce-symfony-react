import React from 'react';
import Advertisement from "./Advertisement";
import Account from "./Account";
import Header from "./Header";
import Menu from "./Menu";
import Footer from "./Footer";

const Layout = (props) => {
    return (
        <>
            <Advertisement/>
            <Account/>
            <Header/>
            <Menu/>
            {props.children}
            <Footer/>
        </>
    );
};

export default Layout;
