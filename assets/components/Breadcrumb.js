import React from 'react';

const Breadcrumb = () => {
    return (
        <nav className="mt-2" aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><i className="bi bi-house-door"/>Home</li>
                <li className="breadcrumb-item">Category</li>
                <li className="breadcrumb-item active" aria-current="page">Data</li>
            </ol>
        </nav>
    );
};

export default Breadcrumb;
