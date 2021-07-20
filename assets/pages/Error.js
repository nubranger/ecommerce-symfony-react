import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Container} from "reactstrap";

const Error = () => {
    return (
        <Container>
            <h1>404</h1>
            <h3>sorry, the page you tried cannot be found</h3>
            <Link to='/'>
                <Button>Back home</Button>
            </Link>
        </Container>
    );
};

export default Error;
