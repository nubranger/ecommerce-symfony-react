import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Shop from "./components/Shop";
import Advertisement from "./components/Advertisement";
import Menu from "./components/Menu";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/scss/main.scss";

const App = () => {
    return (
        <>
            <Advertisement/>
            <Header/>
            <Menu/>
            <Hero/>
            <Shop/>
            <Footer/>
        </>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'));