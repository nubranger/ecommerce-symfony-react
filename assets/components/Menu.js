import React, {useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {useFavoriteContext} from "../context/favorite_context";
import {useCartContext} from "../context/cart_context";

const Menu = () => {

    const menuRef = useRef(null);
    const [menuPosition, setMenuPosition] = useState(null);
    const [showMenuCart, setShowMenuCart] = useState(false);
    const {favorite} = useFavoriteContext();
    const {total_amount_discount, cart} = useCartContext();

    useEffect(() => {

        setMenuPosition(menuRef.current.offsetTop);
        const menuCart = () => {
            if (window.pageYOffset > menuPosition) {
                setShowMenuCart(true);
            } else {
                setShowMenuCart(false);
            }
        }

        const watchScroll = () => {
            window.addEventListener("scroll", menuCart);
        }

        watchScroll();
        return () => {
            window.removeEventListener("scroll", menuCart);
        };

    }, [menuPosition]);

    return (
        <div ref={menuRef} className="sticky-top menu">
            <div className="container">
                <div className="navbar navbar-expand-md navbar-light bg-dark">
                    <div className="navbar-brand">
                        <div className="dropdown">
                            <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton1"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <i className="bi bi-card-list"/>
                                CATEGORIES
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li>
                                    <button className="dropdown-item">category1</button>
                                </li>
                                <li>
                                    <button className="dropdown-item">category2</button>
                                </li>
                                <li>
                                    <button className="dropdown-item">category3</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="navbar-nav nav-pills">
                        <Link to="/">
                            <button className="nav-link active" aria-current="page">HOME</button>
                        </Link>
                        <Link to="/shop">
                            <button className="nav-link">SHOP</button>
                        </Link>
                        <Link to="/contact">
                            <button className="nav-link">CONTACT</button>
                        </Link>
                    </div>
                    <ul className={showMenuCart ? "menu__info" : "fade menu__info"}>
                        <li className="menu__info-cart-price">
                            ${total_amount_discount}
                        </li>
                        <li className="menu__info-bag">
                            <div
                                className="menu__info-bag-cart">
                                <i className="bi bi-bag">
                                    <span>{cart.length}</span>
                                </i>
                            </div>
                        </li>
                        <li className="menu__info-heart">
                            <i className="bi bi-heart">
                                <span>{favorite.length}</span>
                            </i>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Menu;
