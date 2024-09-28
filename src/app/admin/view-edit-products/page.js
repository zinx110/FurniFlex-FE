"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export const ViewEditProducts = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        imgUrl: "",
        categoryId: "",
        discountedPrice: "",
        discount: "",
        description: "",
        quantity: "",
        imageFile: null,
    });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [searchTerm, setSearchTerm] = useState(""); // Add state for search term

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const productsResponse = await axios.get(
                "https://localhost:44344/api/products",
                {
                    headers: {
                        Authorization: `Bearer ${user?.AuthToken}`, // Send JWT token for authentication
                    },
                }
            );
            setProducts(productsResponse.data);
            const categoriesResponse = await axios.get(
                "https://localhost:44344/api/categories",
                {
                    headers: {
                        Authorization: `Bearer ${user?.AuthToken}`, // Send JWT token for authentication
                    },
                }
            );
            setCategories(categoriesResponse.data);
        } catch (error) {
            setMessage("Error fetching data. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (product) => {
        setEditingProduct(product.ProductId);
        setFormData({
            name: product.Name,
            imgUrl: product.ImgUrl,
            categoryId: product.CategoryId,
            discountedPrice: product.DiscountedPrice,
            discount: product.Discount,
            description: product.Description,
            quantity: product.Quantity,
            imageFile: null,
        });
        setErrors({});
        setMessage("");
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                imageFile: file,
                imgUrl: URL.createObjectURL(file),
            });
        }
    };

    // Validation Logic
    const validateForm = () => {
        let isValid = true;
        const validationErrors = {};

        if (formData.name.length > 255) {
            validationErrors.name =
                "Product name cannot exceed 255 characters.";
            isValid = false;
        }

        if (formData.description.length > 1000) {
            validationErrors.description =
                "Description cannot exceed 1000 characters.";
            isValid = false;
        }

        if (formData.discount < 0 || formData.discount > 100) {
            validationErrors.discount = "Discount must be between 0 and 100.";
            isValid = false;
        }

        if (formData.discountedPrice <= 0) {
            validationErrors.discountedPrice =
                "Discounted price must be a positive number.";
            isValid = false;
        }

        if (formData.quantity < 0) {
            validationErrors.quantity =
                "Quantity must be a non-negative number.";
            isValid = false;
        }

        // Validate image file if it is provided
        if (formData.imageFile) {
            const fileSize = formData.imageFile.size / 1024 / 1024; // Size in MB
            const validExtensions = ["jpg", "jpeg", "png", "gif"];
            const fileExtension = formData.imageFile.name
                .split(".")
                .pop()
                .toLowerCase();

            if (fileSize > 2) {
                validationErrors.imageFile = "Image size must not exceed 2MB.";
                isValid = false;
            }

            if (!validExtensions.includes(fileExtension)) {
                validationErrors.imageFile =
                    "Image must be a valid file type (jpg, jpeg, png, gif).";
                isValid = false;
            }
        }

        setErrors(validationErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        // Validate form
        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            const updateFormData = new FormData();
            updateFormData.append("name", formData.name);
            updateFormData.append("categoryId", formData.categoryId);
            updateFormData.append("discountedPrice", formData.discountedPrice);
            updateFormData.append("discount", formData.discount);
            updateFormData.append("description", formData.description);
            updateFormData.append("quantity", formData.quantity);

            if (formData.imageFile) {
                updateFormData.append("imgUrl", formData.imageFile);
            } else {
                updateFormData.append("imgUrl", formData.imgUrl);
            }

            const response = await axios.put(
                `https://localhost:44344/api/products/${editingProduct}`,
                updateFormData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",

                        Authorization: `Bearer ${user?.AuthToken}`, // Send JWT token for authentication
                    },
                }
            );

            if (response.status === 200) {
                setMessage(response.data); // Show success message from the server
                fetchData(); // Refresh product list
                setEditingProduct(null);
                setFormData({
                    name: "",
                    imgUrl: "",
                    categoryId: "",
                    discountedPrice: "",
                    discount: "",
                    description: "",
                    quantity: "",
                    imageFile: null,
                });
            }
        } catch (error) {
            setMessage("Error updating product: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = async (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const response = await axios.delete(
                    `https://localhost:44344/api/products/${productId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${user?.AuthToken}`, // Send JWT token for authentication
                        },
                    }
                );
                if (response.status === 200) {
                    setMessage(response.data);
                    fetchData();
                }
            } catch (error) {
                setMessage("Error deleting product: " + error.message);
            }
        }
    };

    const getCategoryNameById = (id) => {
        const category = categories.find((cat) => cat.CategoryId === id);
        return category ? category.Name : "Unknown Category";
    };

    // Filter products based on search term
    const filteredProducts = products.filter((product) =>
        product.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-full h-auto mx-auto py-10 px-10 bg-white text-black">
            <h1 className="text-2xl font-bold mb-6">View & Edit Products</h1>

            {loading && <p className="text-blue-500">Loading...</p>}

            {message && <p className="text-green-500">{message}</p>}

            {/* Search Input */}
            <div className="mb-6 w-full flex justify-center">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 w-[320px]"
                />
            </div>

            <table className="table-auto w-full mb-10">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">Discount</th>
                        <th className="px-4 py-2">Category</th>
                        <th className="px-4 py-2">Quantity</th>
                        <th className="px-4 py-2">Image</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map((product) => (
                        <tr key={product.ProductId}>
                            <td className="border px-4 py-2">{product.Name}</td>
                            <td className="border px-4 py-2">
                                ${product.DiscountedPrice.toFixed(2)}
                            </td>
                            <td className="border px-4 py-2">
                                {product.Discount}%
                            </td>
                            <td className="border px-4 py-2">
                                {getCategoryNameById(product.CategoryId)}
                            </td>
                            <td className="border px-4 py-2">
                                {product.Quantity}
                            </td>
                            <td className="border px-4 py-2">
                                <img
                                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/Products/${product.ProductId}/image`}
                                    alt={product.Name}
                                    className="h-16 w-16 object-cover"
                                />
                            </td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => handleEditClick(product)}
                                    className="bg-blue-500 text-white px-4 py-2 mr-2 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() =>
                                        handleDeleteClick(product.ProductId)
                                    }
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editingProduct && (
                <form onSubmit={handleSubmit} className="mb-10">
                    <h2 className="text-xl font-bold mb-4">Edit Product</h2>

                    {/* Display validation errors */}
                    {Object.keys(errors).map((key) => (
                        <p key={key} className="text-red-500">
                            {errors[key]}
                        </p>
                    ))}

                    <label className="block mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="block border rounded w-full py-2 px-3 mb-4"
                    />

                    <label className="block mb-2">Category</label>
                    <select
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        className="block border rounded w-full py-2 px-3 mb-4"
                    >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option
                                key={category.CategoryId}
                                value={category.CategoryId}
                            >
                                {category.Name}
                            </option>
                        ))}
                    </select>

                    <label className="block mb-2">Discounted Price</label>
                    <input
                        type="number"
                        name="discountedPrice"
                        value={formData.discountedPrice}
                        onChange={handleChange}
                        className="block border rounded w-full py-2 px-3 mb-4"
                    />

                    <label className="block mb-2">Discount</label>
                    <input
                        type="number"
                        name="discount"
                        value={formData.discount}
                        onChange={handleChange}
                        className="block border rounded w-full py-2 px-3 mb-4"
                    />

                    <label className="block mb-2">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="block border rounded w-full py-2 px-3 mb-4"
                    />

                    <label className="block mb-2">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="block border rounded w-full py-2 px-3 mb-4"
                    />

                    <label className="block mb-2">Image</label>
                    <input
                        type="file"
                        name="imageFile"
                        onChange={handleFileChange}
                        className="block mb-4"
                    />

                    {formData.imgUrl && (
                        <img
                            src={formData.imgUrl}
                            alt="Preview"
                            className="h-32 w-32 object-cover mb-4"
                        />
                    )}

                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Save Changes
                    </button>
                </form>
            )}
        </div>
    );
};

export default ViewEditProducts;
