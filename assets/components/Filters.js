import React from 'react';
import {FormGroup, Input, Label} from "reactstrap";
import {useFilterContext} from "../context/filter_context";

const Filters = () => {
    const {
        filters: {
            text,
            category,
            company,
            color,
            min_price,
            price,
            max_price,
            shipping,
        },
        updateFilters,
        clearFilters,
        filtered_products,
        products
    } = useFilterContext();

    const categories = products.map(item => {
        return item.category;
    });
    const sortedCategories = [...new Set(categories)];

    return (
        <div className="filters">
            <h4>Filters</h4>
            <div className="filters__categories">
                <h6>Category</h6>
                {
                    sortedCategories.map((item, index) => {

                        return (<button
                            key={index}
                            onClick={updateFilters}
                            type='button'
                            name='category'
                            className={`${category === item.toLowerCase() ? 'active' : null}`}
                        >
                            {item}
                        </button>)
                    })
                }
            </div>
            <div className="filters__priceRange">
                <h6>Price</h6>
                <p className='price'>${price}</p>
                <input
                    type='range'
                    name='price'
                    min={min_price}
                    max={max_price}
                    onChange={updateFilters}
                    value={price}
                />
            </div>
        </div>
    );
};

export default Filters;
