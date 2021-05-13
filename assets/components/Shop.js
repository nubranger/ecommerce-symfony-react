import React from 'react';
import {Col, Container, Row} from "reactstrap";
import Breadcrumb from "./Breadcrumb";
import Items from "./Items";

const Shop = () => {
    return (
        <div className="shop">
            <Container>
                <Breadcrumb/>
                <Row>
                    <Col lg="3">
                        FILTER
                    </Col>
                    <Col lg="9">
                        <Items/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Shop;
