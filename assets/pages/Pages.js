import React, {useContext} from 'react';
import Dashboard from "./Dashboard";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Error from "./Error";
import {EshopContext} from "../context/context";
import Loading from "../components/Loading";


const Pages = () => {
    const { isLoading } = useContext(EshopContext);

    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    {/*{isLoading ? <Loading/> : <Dashboard/>}*/}
                    <Dashboard/>
                </Route>
                <Route path='*'>
                    <Error/>
                </Route>
            </Switch>
        </Router>
    );
};

export default Pages;
