"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

// Define a type for the category
interface Category {
    CategoryId: number;
    Name: string;
}

const ViewEditCategories = () => {
    const { user } = useAuth();
    const [categories, setCategories] = useState<Category[]>([]);
    const [editedCategory, setEditedCategory] = useState<{
        id: number | null;
        name: string;
    }>({ id: null, name: "" });
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true); // Set loading state
        try {
            const response = await axios.get<Category[]>( // Specify the response type
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/Categories`,
                {
                    headers: {
                        Authorization: `Bearer ${user?.AuthToken}`, // Send JWT token for authentication
                    },
                }
            );
            setCategories(response.data);
            setSuccess(""); // Reset success message on new fetch
        } catch (err) {
            setError("Error fetching categories");
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const handleEdit = (category: Category) => {
        setEditedCategory({ id: category.CategoryId, name: category.Name });
        setError(""); // Reset error message
        setSuccess(""); // Reset success message
    };

    const handleSaveEdit = async () => {
        if (!editedCategory.name) {
            setError("Category name is required.");
            return;
        }

        try {
            const response = await axios.put<Category>(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/Categories/${editedCategory.id}`,
                { CategoryId: editedCategory.id, Name: editedCategory.name },
                {
                    headers: {
                        Authorization: `Bearer ${user?.AuthToken}`, // Send JWT token for authentication
                    },
                }
            );

            setCategories((prevCategories) =>
                prevCategories.map((cat) =>
                    cat.CategoryId === editedCategory.id ? response.data : cat
                )
            );

            setEditedCategory({ id: null, name: "" });
            setSuccess("Category updated successfully!"); // Success message
            fetchCategories();
            setError(""); // Clear any previous errors
        } catch (err) {
            setError("Error updating category.");
            setSuccess(""); // Clear any success messages on error
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Categories</h1>

            {/* Display success or error message if any */}
            {success && <div className="text-green-500 mb-4">{success}</div>}
            {error && <div className="text-red-500 mb-4">{error}</div>}

            {/* Loading state */}
            {loading ? (
                <div className="text-blue-500 mb-4">Loading categories...</div>
            ) : (
                <div>
                    {categories.map((category) => (
                        <div
                            key={category.CategoryId}
                            className="flex items-center justify-between mb-2"
                        >
                            {/* Display the category name or the input field if editing */}
                            {editedCategory.id === category.CategoryId ? (
                                <input
                                    type="text"
                                    className="border p-2 w-full"
                                    value={editedCategory.name}
                                    onChange={(e) =>
                                        setEditedCategory({
                                            ...editedCategory,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            ) : (
                                <span>{category.Name}</span>
                            )}

                            {/* Buttons for editing or saving */}
                            {editedCategory.id === category.CategoryId ? (
                                <button
                                    className="bg-green-500 text-white p-2 rounded ml-2"
                                    onClick={handleSaveEdit} // Call handleSaveEdit
                                >
                                    Save
                                </button>
                            ) : (
                                <button
                                    className="bg-yellow-500 text-white p-2 rounded ml-2"
                                    onClick={() => handleEdit(category)}
                                >
                                    Edit
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewEditCategories;
