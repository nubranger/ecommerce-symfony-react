import React from 'react';
import data from "../data"

const HeaderHeart = () => {
    return (
        <div className="header__middle-heart-dropdown-items">
            <ul>
                {
                    data.map((item) => (
                        <li key={item.id}>
                            <img src={item.img} alt={item.title}/>
                            <div>
                                <h6>{item.title}</h6>
                                <p>$ {item.price}</p>
                            </div>
                            <i className="bi bi-heart-fill"/>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
};

export default HeaderHeart;
