"use client";
import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const PostCategory = () => {
    const { user } = useAuth();
    // State to hold form inputs and messages
    const [categoryName, setCategoryName] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if the category name is provided and less than 100 characters
        if (categoryName.length === 0 || categoryName.length > 100) {
            setErrorMessage(
                "Category name is required and should not exceed 100 characters."
            );
            return;
        }

        const categoryData = {
            Name: categoryName,
        };

        try {
            // Make POST request to the API
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/Categories`,
                categoryData,
                {
                    headers: {
                        Authorization: `Bearer ${user?.AuthToken}`, // Send JWT token for authentication
                    },
                }
            );

            // Clear form on success
            setCategoryName("");
            setSuccessMessage("Category created successfully!");
            setErrorMessage("");
        } catch (error) {
            // Check if the error is a conflict (409)
            if (error.response && error.response.status === 409) {
                setErrorMessage("Category already exists.");
            } else {
                setErrorMessage("Failed to create category. Please try again.");
            }
            setSuccessMessage("");
        }
    };

    return (
        <div className="container mx-auto mt-8 p-4 max-w-md">
            <h1 className="text-2xl font-bold mb-4">Create New Category</h1>
            {successMessage && (
                <p className="text-green-500 mb-4">{successMessage}</p>
            )}
            {errorMessage && (
                <p className="text-red-500 mb-4">{errorMessage}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="categoryName"
                        className="block text-lg font-medium"
                    >
                        Category Name
                    </label>
                    <input
                        type="text"
                        id="categoryName"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="mt-1 p-2 w-full border border-gray-300 rounded"
                        placeholder="Enter category name"
                        maxLength={100}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Create Category
                </button>
            </form>
        </div>
    );
};

export default PostCategory;
