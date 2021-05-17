import React from 'react';
import Dashboard from "./Dashboard";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Error from "./Error";


const Pages = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
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
