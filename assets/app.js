import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Shop from "./components/Shop";

const App = () => {
    return (
        <>
            <Navbar/>
            <Hero/>
            <Shop/>
            <Footer/>
        </>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'));