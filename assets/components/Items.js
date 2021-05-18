import React, {useContext} from 'react';
import {Col, Row} from "reactstrap";
import data from "../data";
import {EshopContext} from "../context/context";

const Items = () => {
    const { products } = useContext(EshopContext);

    return (
        <div className="items">
            <div>ACTIVE FILTERS</div>
            <div>SORT</div>
            <Row>

                {
                    products.map((item) =>
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
