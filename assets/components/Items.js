import React from 'react';
import {Col, Row} from "reactstrap";
import data from "../data";

const Items = () => {
    return (
        <div className="items">
            <div>ACTIVE FILTERS</div>
            <div>SORT</div>
            <Row>

                {
                    data.map((item) =>
                        (
                            <Col key={item.id} lg="3">
                                <img src={item.img} alt={item.title}/>
                                <h6>{item.title}</h6>
                                <p>$ {item.price}</p>
                            </Col>
                        )
                    )
                }
            </Row>
        </div>
    );
};

export default Items;
