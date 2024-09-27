"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Products from "../components/Products";
import Sidebar from "../components/Sidebar";

const Store = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Fetch products and categories
    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsResponse = await axios.get(
                    "https://localhost:44344/api/Products"
                );
                setProducts(productsResponse.data);

                const categoriesResponse = await axios.get(
                    "https://localhost:44344/api/Categories"
                );
                setCategories(categoriesResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="h-[1444px] bg-white px-[120px] flex py-[40px]">
            <div className="w-auto">
                <Sidebar
                    categories={categories}
                    onSelectCategory={setSelectedCategory}
                />{" "}
                {/* Pass the handler */}
            </div>
            <div className="w-full">
                <Products
                    products={products}
                    selectedCategory={selectedCategory}
                />{" "}
                {/* Pass the selected category */}
            </div>
        </div>
    );
};

export default Store;
