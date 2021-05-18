import React, {useState, useEffect, useContext, createContext} from 'react';
import axios from 'axios';
import {getProducts, deleteProducts, createProducts} from '../api/products_api';

const EshopContext = React.createContext();

const EshopProvider = ({children}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [account, setAccount] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);

    const handleAccount = (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            setError("Enter all fields");
        } else {

            setIsLoading(true);
            setError("");
            axios.post('/login', {
                    username: email,
                    password: password
                },
                {
                    headers: {
                        'content-type': 'application/json',
                        'Accept': 'application/json'
                    }
                })
                .then(response => {
                    // console.log(response.headers);

                    setAccount({username: response.headers.username, roles: response.headers.roles});
                }).catch(error => {
                if (error.response.data.error) {
                    setError(error.response.data.error);
                } else {
                    setError("Unknown error");
                }

            }).finally(() => {
                setIsLoading(false);
            })

        }

    }

    useEffect(() => {
        setIsLoading(true);
        getProducts().then(data => {
            setProducts(data);
        })
            .catch((error)=> {console.error(error)})
            .finally(() => {setIsLoading(false);
        });

    }, []);

    useEffect(() => {
        handleAccount;
    }, []);


    useEffect(() => {

        if (window.user) {
            let user = window.user;
            console.log(user);
            setAccount({username: user.username, roles: user.roles});
        }
    }, []);

    return (
        <EshopContext.Provider
            value={{
                error,
                isLoading,
                setPassword,
                setEmail,
                handleAccount,
                account,
                products,
                setProducts
            }}
        >
            {children}
        </EshopContext.Provider>
    );
};

export {EshopProvider, EshopContext};
