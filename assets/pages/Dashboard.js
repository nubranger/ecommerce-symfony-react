import React from 'react';
import Advertisement from "../components/Advertisement";
import Account from "../components/Account";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Hero from "../components/Hero";
import Shop from "../components/Shop";
import Footer from "../components/Footer";

const Dashboard = () => {
    return (
        <>
            <Advertisement/>
            <Account/>
            <Header/>
            <Menu/>
            <Hero/>
            <Shop/>
            <Footer/>
        </>
    );
};

export default Dashboard;
