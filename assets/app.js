import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Shop from "./components/Shop";
import "./styles/scss/main.scss";

const App = () => {
    return (
        <>
            <Header/>
            <Hero/>
            <Shop/>
            <Footer/>
        </>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'));