import React from 'react';
import {useCartContext} from "../context/cart_context";

const HeaderCart = () => {
    const {cart, removeItem, toggleAmount} = useCartContext();

    return (
        <div className="header__middle-bag-dropdown-items">
            <ul>
                {
                    !cart.length
                        ?
                        <h5 style={{textAlign: "center"}}>Shopping bag is empty</h5>
                        :
                        cart.map((item) => (
                            <li key={item.id}>
                                <img src={item.img[0]} alt={item.title}/>
                                <h6>{item.title}</h6>
                                <i onClick={() => removeItem(item.id)} className="bi bi-x"/>
                                {
                                    item.discount
                                        ?
                                        <div className="header__middle-bag-dropdown-items-discount">
                                            <p>${item.price}</p>
                                            <span>${item.discount}</span>
                                        </div>
                                        :
                                        <div className="header__middle-bag-dropdown-items-normal">
                                            <p>${item.price}</p>
                                        </div>
                                }
                                <div className="header__middle-bag-dropdown-items-amount">
                                    <i onClick={() => toggleAmount(item.id, "dec")}
                                       className="bi bi-caret-left"/>
                                    <p>{item.amount}</p>
                                    <i onClick={() => toggleAmount(item.id, "inc")}
                                       className="bi bi-caret-right"/>
                                </div>
                            </li>
                        ))
                }
            </ul>
        </div>
    )
};

export default HeaderCart;
