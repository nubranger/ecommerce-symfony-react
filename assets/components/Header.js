import React, {useState} from 'react';
import {
    Button,
    Col,
    Container,
    Input,
    InputGroup,
    InputGroupAddon,
    Row,
} from "reactstrap";
import HeaderCart from "./HeaderCart";
import HeaderHeart from "./HeaderHeart";

const Header = () => {

    const [showCart, setShowCart] = useState(false);
    const [showHeart, setShowHeart] = useState(false);

    const handleDropdowns =(props)=> {
        if (props === "heart") {
            setShowHeart(true);
            setShowCart(false);
        }
        if (props === "cart") {
            setShowHeart(false);
            setShowCart(true);
        }
    }

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
                        <i className="bi bi-twitter"/>
                    </div>
                </Container>
            </div>
            <Container>
                <div className="header__middle">
                    <Row>
                        <Col lg="3" md="3">
                            <img src={require("../img/logo.png")} alt="logo"/>
                        </Col>
                        <Col lg="6" md="6">
                            <InputGroup>
                                <Input type="text" name="search" id="search" placeholder="What do you need?"/>
                                <InputGroupAddon addonType="prepend">
                                    <Button aria-label="search">
                                        <i className="bi bi-search"/>
                                    </Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </Col>
                        <Col lg="3" md="3">
                            <ul className="header__middle-cart">
                                <li className="header__middle-heart">
                                    <div
                                        // onMouseEnter={() => setShowHeart(true)}
                                        onMouseEnter={() => handleDropdowns("heart")}
                                        className="header__middle-heart-list"
                                    >
                                        <i className="bi bi-heart">
                                            <span>2</span>
                                        </i>
                                    </div>

                                    {
                                        showHeart && (
                                            <div
                                                onMouseLeave={() => setShowHeart(false)}
                                                className="header__middle-heart-dropdown"
                                            >
                                                <HeaderHeart/>
                                            </div>
                                        )
                                    }
                                </li>
                                <li className="header__middle-bag">

                                    <div
                                        onMouseEnter={() => handleDropdowns("cart")}
                                        // onMouseEnter={() => setShowCart(true)}
                                         className="header__middle-bag-cart"
                                    >
                                        <i className="bi bi-bag">
                                            <span>77</span>
                                        </i>
                                    </div>
                                    {
                                        showCart && (
                                            <div
                                                onMouseLeave={() => setShowCart(false)}
                                                className="header__middle-bag-dropdown"
                                            >
                                                <HeaderCart/>
                                                <div className="header__middle-bag-dropdown-buttons">
                                                    <div>
                                                        <h6>TOTAL:</h6>
                                                        <p>$ 777.00</p>
                                                    </div>
                                                    <div>VIEW CART</div>
                                                    <div>BUY NOW</div>
                                                </div>
                                            </div>
                                        )
                                    }

                                </li>
                                <li className="header__middle-cart-price">
                                    $ 777.00
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </div>
            </Container>

        </div>
    );
};

export default Header;
