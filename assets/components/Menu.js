import React, {useEffect, useRef, useState} from 'react';
import HeaderCart from "./HeaderCart";

const Menu = () => {

    const [showCart, setShowCart] = useState(false);
    const menuRef = useRef(null);
    const [menuPosition, setMenuPosition] = useState(null);
    const [showMenuCart, setShowMenuCart] = useState(false);

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
                        <button className="nav-link active" aria-current="page">HOME</button>
                        <button className="nav-link">SHOP</button>
                        <button className="nav-link">CONTACT</button>
                    </div>


                    <ul className={showMenuCart ? "menu__info" : "fade menu__info"}>
                        <li className="menu__info-cart-price">
                            $ 777.00
                        </li>
                        <li className="menu__info-bag">

                            <div
                                // onMouseEnter={() => setShowCart(true)}
                                className="menu__info-bag-cart">
                                <i className="bi bi-bag">
                                    <span>77</span>
                                </i>
                            </div>
                            {
                                showCart && (
                                    <div
                                        // onMouseLeave={() => setShowCart(false)}
                                        className="menu__info-bag-dropdown"
                                    >
                                        <HeaderCart/>
                                        <div className="menu__info-bag-dropdown-buttons">
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
                        <li className="menu__info-heart">
                            <i className="bi bi-heart">
                                <span>2</span>
                            </i>
                        </li>
                    </ul>


                </div>
            </div>
        </div>
    );
};

export default Menu;
