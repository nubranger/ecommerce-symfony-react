import React from 'react';
import {Pagination, PaginationItem, PaginationLink} from "reactstrap";
import {useSortContext} from "../context/sort_context";

const Sort = ({handleGrid}) => {
    const {updateSort} = useSortContext();

    return (
        <div className="sort">
            <div className="sort__grid">
                <i className="bi bi-grid"/>
                <span>View:</span>
                <Pagination size="sm" aria-label="Grid">
                    <PaginationItem onClick={() => handleGrid(6)}>
                        <PaginationLink>
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem onClick={() => handleGrid(4)}>
                        <PaginationLink>
                            3
                        </PaginationLink>
                    </PaginationItem>
                </Pagination>
            </div>
            <div className="sort__price">
                <i className="bi bi-cash"/>
                <span>Sort by price:</span>
                <Pagination size="sm" aria-label="Price">
                    <PaginationItem onClick={() => updateSort("priceUp")}>
                        <PaginationLink>
                            <i className="bi bi-sort-down-alt"/>
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem onClick={() => updateSort("priceDown")}>
                        <PaginationLink>
                            <i className="bi bi-sort-down"/>
                        </PaginationLink>
                    </PaginationItem>
                </Pagination>
            </div>
            <div className="sort__name">
                <i className="bi bi-filter"/>
                <span>Sort by name:</span>
                <Pagination size="sm" aria-label="Name">
                    <PaginationItem onClick={() => updateSort("az")}>
                        <PaginationLink>
                            <i className="bi bi-sort-alpha-down"/>
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem onClick={() => updateSort("za")}>
                        <PaginationLink>
                            <i className="bi bi-sort-alpha-down-alt"/>
                        </PaginationLink>
                    </PaginationItem>
                </Pagination>
            </div>
        </div>
    );
};

export default Sort;
