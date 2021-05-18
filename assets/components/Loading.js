import React from 'react';

const Loading = () => {
    return (
        <div className="loading">
            <button className="btn btn-secondary" type="button" disabled>
                <span className="spinner-border spinner-border-lg" role="status" aria-hidden="true"/>
                <span className="visually-hidden">Loading...</span>
            </button>
        </div>
    );
};

export default Loading;
