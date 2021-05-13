import React from 'react';

const Breadcrumb = () => {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#"><i className="bi bi-house-door" />Home</a></li>
                <li className="breadcrumb-item"><a href="#">Category</a></li>
                <li className="breadcrumb-item active" aria-current="page">Data</li>
            </ol>
        </nav>
    );
};

export default Breadcrumb;
