// Search.js
"use client";
import React from "react";

const Search = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="flex justify-center mb-4 ">
            <input
                type="text"
                className="border p-2 w-1/2"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
};

export default Search;
