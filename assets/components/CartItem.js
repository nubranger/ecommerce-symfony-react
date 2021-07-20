import React from 'react';
import {useCartContext} from "../context/cart_context";

const CartItem = ({item}) => {
    const {toggleAmount} = useCartContext();

    console.log(item)

    let quantity = () => {
        let amount = []

        for (let i = 1; i <= 5; i++) {
            if (item.stock >= i) {
                amount.push(<option key={i} value={i}>{i}</option>)
            }
        }

        return amount;
    }


    return (
        <div className="cart__bottom--product">
            <div className="cart__bottom--product-item">
                <img src={item.img[0]} alt=""/>
                <p>{item.title}</p>
            </div>
            <div className="cart__bottom--product-status">
                {item.discount ? <div className="cart__bottom--product-status-discount"><p>${item.price}</p>
                    <span>${item.discount}</span></div> : <h6>${item.price}</h6>}

                <select onChange={(e) => toggleAmount(item.id, e.target.value)} className="form-select"
                        aria-label="Select quantity">
                    {
                        quantity()
                    }
                </select>
                {item.discount ? <h6>${(item.discount).toFixed(2)}</h6> : <h6>${(item.price).toFixed(2)}</h6>}
            </div>
        </div>
    );
};

export default CartItem;
