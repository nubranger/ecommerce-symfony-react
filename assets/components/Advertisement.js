import React, {useState} from 'react';
import {Container} from "reactstrap";

const Advertisement = () => {

    const [showAd, setShowAd] = useState(true);


    return (
        showAd &&
        (
            <div className="advertisement">
                <Container>
                    <div className="advertisement__info">
                        <h5>Some kind of advertising</h5>
                        <i onClick={() => setShowAd(false)} className="bi bi-x"/>
                    </div>
                </Container>
            </div>
        )
    )
};

export default Advertisement;
