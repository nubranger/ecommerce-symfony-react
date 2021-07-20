import React from 'react';
import {Col, Container, Row} from "reactstrap";
import Breadcrumb from "../components/Breadcrumb";
import Items from "../components/Items";
import Filters from "../components/Filters";

const Shop = () => {
    return (
        <div className="shop">
            <Container>
                <Breadcrumb/>
                <Row>
                    <Col lg="3">
                        <Filters/>
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
