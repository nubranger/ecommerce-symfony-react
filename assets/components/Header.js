import React from 'react';
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
import {Link} from "react-router-dom";
import {useCartContext} from "../context/cart_context";
import {useFavoriteContext} from "../context/favorite_context";
import HeaderTop from "./HeaderTop";

const Header = () => {

    const {total_amount_discount, cart, isCartBarOpen, openCartBar, closeCartBar, clearCart} = useCartContext();
    const {favorite, isFavoriteBarOpen, openFavoriteBar, closeFavoriteBar, clearFavorite} = useFavoriteContext();

    return (
        <div className="header">
            <HeaderTop/>
            <Container>
                <div className="header__middle">
                    <Row>
                        <Col lg="3" md="3">
                            <Link to="/">
                                <img src={require("../assets/img/logo.png")} alt="logo"/>
                            </Link>
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
                                        onMouseEnter={() => {
                                            openFavoriteBar();
                                            closeCartBar()
                                        }}
                                        className="header__middle-heart-list"
                                    >
                                        <i className="bi bi-heart">
                                            <span>{favorite.length}</span>
                                        </i>
                                    </div>
                                    {
                                        isFavoriteBarOpen && (
                                            <div
                                                className="header__middle-heart-dropdown"
                                                onMouseLeave={closeFavoriteBar}
                                            >
                                                <div className="header__middle-heart-dropdown-top">
                                                    <h4>Favorite items</h4>
                                                    <i onClick={closeFavoriteBar} className="bi bi-x"/>
                                                </div>
                                                <div>
                                                    <HeaderHeart/>
                                                    <div className="header__middle-bag-dropdown-buttons">
                                                        <Button onClick={clearFavorite}>CLEAR
                                                            LIST</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </li>
                                <li className="header__middle-bag">

                                    <div
                                        onMouseEnter={() => {
                                            openCartBar();
                                            closeFavoriteBar()
                                        }}
                                        className="header__middle-bag-cart"
                                    >
                                        <Link to="/cart">
                                            <i className="bi bi-bag">
                                                <span>{cart.length}</span>
                                            </i>
                                        </Link>
                                    </div>
                                    {
                                        isCartBarOpen && (
                                            <div
                                                className="header__middle-bag-dropdown"
                                                onMouseLeave={closeCartBar}
                                            >
                                                <div className="header__middle-bag-dropdown-top">
                                                    <h4>Shopping bag</h4>
                                                    <i onClick={closeCartBar} className="bi bi-x"/>
                                                </div>
                                                <div>
                                                    <HeaderCart/>
                                                    <div className="header__middle-bag-dropdown-buttons">
                                                        <div>
                                                            <h6>TOTAL:</h6>
                                                            <p>${total_amount_discount}</p>
                                                        </div>
                                                        <Button onClick={clearCart}>CLEAR LIST</Button>
                                                        <Link to="/cart">
                                                            <Button className="mt-2 btn-dark">VIEW BAG</Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </li>
                                <li className="header__middle-cart-price">
                                    <p>${total_amount_discount}</p>
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
