import React from 'react'
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/scss/main.scss";
import {ProfileProvider} from './context/profile_context'
import {ProductsProvider} from "./context/products_context";
import {CartProvider} from "./context/cart_context";
import {FavoriteProvider} from "./context/favorite_context";
import {SortProvider} from "./context/sort_context";
import {FilterProvider} from "./context/filter_context";


ReactDOM.render(
    <ProductsProvider>
        <ProfileProvider>
            <CartProvider>
                <FavoriteProvider>
                    <SortProvider>
                        <FilterProvider>
                            <App/>
                        </FilterProvider>
                    </SortProvider>
                </FavoriteProvider>
            </CartProvider>
        </ProfileProvider>
    </ProductsProvider>
    ,
    document.getElementById('root')
);
