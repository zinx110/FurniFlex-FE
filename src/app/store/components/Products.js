"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ProductCard from "./ProductCard";

// Update Products to accept products and a selected category
const Products = ({ products, selectedCategory }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Function to calculate the main price based on discounted price and discount percentage
    const calculateMainPrice = (discountedPrice, discountPercentage) => {
        return (discountedPrice / (1 - discountPercentage / 100)).toFixed(2);
    };

    // Filter products based on the selected category
    const filteredProducts = selectedCategory
        ? products.filter((product) => product.CategoryId === selectedCategory)
        : products;

    // Map through filtered products to include main price calculation
    const updatedProductList = filteredProducts.map((product) => {
        const mainPrice = calculateMainPrice(
            product.DiscountedPrice,
            product.Discount
        );
        return {
            ...product,
            mainPrice: parseFloat(mainPrice), // Ensure mainPrice is a number
        };
    });

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = updatedProductList.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    const handlePageChange = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePageBack = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); // Prevent going below page 1
    };

    return (
        <div className="main w-full h-[1128px]">
            <div className="sub-main max-h-[1032px] grid grid-cols-4 gap-y-12 justify-items-center">
                {currentItems.map((item) => (
                    <ProductCard key={item.ProductId} item={item} />
                ))}
            </div>
            <div className="flex items-end justify-center h-[96px] gap-3">
                <button
                    onClick={handlePageBack}
                    className="bg-blue-500 text-white rounded p-2"
                    disabled={currentPage === 1} // Disable if on first page
                >
                    Back
                </button>
                <button
                    onClick={handlePageChange}
                    className="bg-blue-500 text-white rounded p-2"
                    disabled={currentItems.length < itemsPerPage} // Disable if no more items
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Products;
