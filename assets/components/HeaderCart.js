import React from 'react';
import data from "../data"

const HeaderCart = () => {
    return (
        <div className="header__middle-bag-dropdown-items">
            <ul>
                {
                    data.map((item) => (
                        <li key={item.id}>
                            <img src={item.img} alt={item.title}/>
                            <div>
                                <h6>{item.title}</h6>
                                <p>$ {item.price}</p>
                            </div>
                            <i className="bi bi-x"/>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
};

export default HeaderCart;
