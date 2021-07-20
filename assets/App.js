import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Error from "./pages/Error";
import Shop from "./pages/Shop";
import Layout from "./components/Layout";
import Hero from "./pages/Hero";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
// import {useContext} from "react";
// import {EshopContext} from "./context/context";

const App = () => {
    // const { isLoading } = useContext(EshopContext);

    return (
        <>
            <Router>
                <Layout>
                    <Switch>
                        <Route path="/" exact>
                            <Hero/>
                        </Route>
                        <Route path="/shop" exact>
                            {/*{isLoading ? <Loading/> : <Shop/>}*/}
                            <Shop/>
                        </Route>
                        <Route path="/cart" exact>
                            <Cart/>
                        </Route>
                        <Route exact path='/products/:id' children={<SingleProduct/>}/>
                        <Route path='*'>
                            <Error/>
                        </Route>
                    </Switch>
                </Layout>
            </Router>
        </>
    );
}

export default App;
