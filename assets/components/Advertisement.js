import React, {useState} from 'react';
import {Container} from "reactstrap";

const Advertisement = () => {
    const [showAd, setShowAd] = useState(true);

    return (
        showAd && (
            <div className="advertisement">
                <Container>
                    <div className="advertisement__info">
                        <div id="carouselAdv" className="carousel slide " data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active" data-bs-interval="5000">
                                    <h5>Some kind of advertising</h5>
                                </div>
                                <div className="carousel-item" data-bs-interval="5000">
                                    <h5>Some kind of advertising</h5>
                                </div>
                                <div className="carousel-item" data-bs-interval="5000">
                                    <h5>Some kind of advertising</h5>
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselAdv"
                                    data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"/>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselAdv"
                                    data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"/>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                        <i onClick={() => setShowAd(false)} className="bi bi-x"/>
                    </div>
                </Container>
            </div>
        )
    )
};

export default Advertisement;
