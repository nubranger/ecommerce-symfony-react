import React from 'react';
import {useFavoriteContext} from "../context/favorite_context";

const HeaderHeart = () => {
    const {favorite, handleFavorite} = useFavoriteContext();

    return (
        <div className="header__middle-heart-dropdown-items">
            <ul>
                {
                    !favorite.length
                        ?
                        <h5>List is empty</h5>
                        :
                        favorite.map((item) => (
                            <li key={item.id}>
                                <img src={item.img} alt={item.title}/>
                                <div>
                                    <h6>{item.title}</h6>
                                    {item.discount ? <div className="items__card-info-discount"><p>${item.price}</p>
                                        <span>${item.discount}</span></div> : <p>${item.price}</p>}
                                </div>
                                <i onClick={() => handleFavorite(item.id, item)} className="bi bi-heart-fill"/>
                            </li>
                        ))
                }
            </ul>
        </div>
    )
};

export default HeaderHeart;
