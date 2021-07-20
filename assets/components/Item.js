import React, {useState} from 'react';
import {Col} from "reactstrap";
import {useCartContext} from "../context/cart_context";
import {useFavoriteContext} from "../context/favorite_context";

const Item = ({grid, item}) => {
    const [selectImage, setSelectImage] = useState(0);
    const {addToCart, cart} = useCartContext();
    const {handleFavorite, favorite} = useFavoriteContext();

    return (
        <Col lg={grid}>
            <div className={item.stock === 0 ? "items__card outofstock" : "items__card"}>
                {item.stock === 0 && <h3>Out of stock</h3>}
                <img className="items__card-image" src={item.img[selectImage]} alt={item.title}/>
                <div className="items__card-images">
                    {
                        item.img.map((images, index) => {
                            // console.log("render images")
                            return (
                                <div onMouseEnter={() => setSelectImage(index)} key={index}>
                                    <img src={images} alt=""/>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="items__card-info">
                    <h6>{item.title}</h6>
                    {
                        item.discount
                            ?
                            <div className="items__card-info-discount">
                                <p>${item.price}</p>
                                <span>${item.discount}</span>
                            </div>
                            :
                            <p>${item.price}</p>
                    }
                </div>
                <div className="items__card-add">
                    <i
                        onClick={() => addToCart(item.id, item)}
                        className={cart.some((cartItem) => cartItem.id === item.id) ? "bi bi-cart-check" : "bi bi-cart-plus"}
                    />
                    <p>In stock: {item.stock}</p>
                </div>
                <i
                    id="heart"
                    onClick={() => handleFavorite(item.id, item)}
                    className={favorite.some((favorite) => favorite.id === item.id) ? "bi bi-heart-fill" : "bi bi-heart"}
                />
            </div>
        </Col>
    )
};

export default Item;
