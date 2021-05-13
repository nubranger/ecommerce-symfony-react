import React from 'react';
import {Container} from "reactstrap";

const Hero = () => {

    return (
        <div className="hero">
            <Container>

                <div id="carouselExampleIndicators" className="carousel slide carousel-fade" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                                className="active" aria-current="true" aria-label="Slide 1"/>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                                aria-label="Slide 2"/>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                                aria-label="Slide 3"/>
                    </div>
                    <div className="carousel-inner">

                        <div className="carousel-item active" data-bs-interval="5000">
                            <img src={require("../img/hero/img1.jpg")} className="d-block w-100" alt="img1"/>
                            <div className="carousel-caption">
                                <h1>First slide label</h1>
                                <p>Some representative placeholder content for the first slide.</p>
                                <button className="btn-shop">SHOP NOW</button>
                            </div>
                        </div>
                        <div className="carousel-item" data-bs-interval="5000">
                            <img src={require("../img/hero/img2.jpg")} className="d-block w-100" alt="img2"/>
                            <div className="carousel-caption">
                                <h1>Second slide label</h1>
                                <p>Some representative placeholder content for the first slide.</p>
                                <button className="btn-shop">SHOP NOW</button>
                            </div>
                        </div>
                        <div className="carousel-item" data-bs-interval="5000">
                            <img src={require("../img/hero/img3.jpg")} className="d-block w-100" alt="img3"/>
                            <div className="carousel-caption">
                                <h1>Third slide label</h1>
                                <p>Some representative placeholder content for the first slide.</p>
                                <button className="btn-shop">SHOP NOW</button>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                            data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"/>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                            data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"/>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </Container>
        </div>
    );
};

export default Hero;
