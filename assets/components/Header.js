import React, {useState} from 'react';
import {
    Col,
    Container, Row
} from "reactstrap";

const Header = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="header">
            <div className="header__top">
                <Container>
                    <div className="header__top-contact">
                        <div className="header__top-contact-email">
                            <i className="bi bi-envelope-fill"/>
                            <span>mymail@email.com</span>
                        </div>
                        <div className="header__top-contact-phone">
                            <i className="bi bi-telephone-fill"/>
                            <span>+370 697 7777777</span>
                        </div>
                    </div>
                    <div className="header__top-profile">
                        <i className="bi bi-file-person-fill"/>
                        <span>Login</span>
                    </div>
                    <div className="header__top-social">
                        <i className="bi bi-facebook"/>
                        <i className="bi bi-twitter"></i>
                    </div>
                </Container>
            </div>
            <Container>
                <div className="header__middle">
                    <Row>
                        <Col lg="2" md="2">Logo</Col>
                        <Col lg="7" md="7">Search</Col>
                        <Col lg="3" md="3">
                            <ul className="header__middle-cart">
                                <li className="header__middle-cart-heart">
                                    <i className="bi bi-heart">
                                        <span>2</span>
                                    </i>
                                </li>
                                <li className="header__middle-bag">
                                    <i className="bi bi-bag">
                                        <span>77</span>
                                    </i>
                                </li>
                                <li className="header__middle-cart-price">
                                    $ 777.00
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </div>
                <div className="header__menu">
                    menu
                </div>
            </Container>
        </div>
    );
};

export default Header;
