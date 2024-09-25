'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";

export const PostProducts = () => {
  // Form state for product details
  const [productData, setProductData] = useState({
    Name: "",               
    ImgUrl: null,          
    CategoryId: "",        
    DiscountedPrice: "",  
    Discount: "",          
    Description: "",       
    Quantity: "",          
  });

  const [categories, setCategories] = useState([]); // State for categories
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({}); // State for validation errors

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://localhost:44344/api/categories");
        setCategories(response.data);
      } catch (error) {
        setMessage("Error fetching categories: " + error.message);
      }
    };

    fetchCategories();
  }, []);

  // Handle text input changes
  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setProductData({
      ...productData,
      ImgUrl: e.target.files[0], // Update ImgUrl field
    });
  };

  // Validate form fields
  const validateFields = () => {
    const newErrors = {};
    let valid = true;

    // Name validation
    if (!productData.Name) {
      newErrors.Name = "Product name is required.";
      valid = false;
    } else if (productData.Name.length > 255) {
      newErrors.Name = "Name cannot exceed 255 characters.";
      valid = false;
    }

    // Image URL validation 
    if (productData.ImgUrl && !/\.(jpg|jpeg|png|svg)$/i.test(productData.ImgUrl.name)) {
      newErrors.ImgUrl = "Image must be in JPG or PNG format.";
      valid = false;
    }

    // Category validation
    if (!productData.CategoryId) {
      newErrors.CategoryId = "Category is required.";
      valid = false;
    }

    // Discounted Price validation
    if (!productData.DiscountedPrice) {
      newErrors.DiscountedPrice = "Discounted price is required.";
      valid = false;
    } else if (productData.DiscountedPrice <= 0) {
      newErrors.DiscountedPrice = "Discounted price must be a positive value.";
      valid = false;
    }

    // Discount validation
    if (productData.Discount && (productData.Discount < 0 || productData.Discount > 100)) {
      newErrors.Discount = "Discount must be between 0 and 100.";
      valid = false;
    }

    // Description validation
    if (!productData.Description) {
      newErrors.Description = "Description is required.";
      valid = false;
    } else if (productData.Description.length > 1000) {
      newErrors.Description = "Description cannot exceed 1000 characters.";
      valid = false;
    }

    // Quantity validation
    if (!productData.Quantity) {
      newErrors.Quantity = "Quantity is required.";
      valid = false;
    } else if (productData.Quantity < 0) {
      newErrors.Quantity = "Quantity must be a non-negative number.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields before submission
    if (!validateFields()) {
      return; // Exit if validation fails
    }

    // Create FormData object to send product data and image
    const formData = new FormData();
    formData.append("Name", productData.Name);
    formData.append("CategoryId", productData.CategoryId);
    formData.append("DiscountedPrice", productData.DiscountedPrice);
    formData.append("Discount", productData.Discount);
    formData.append("Description", productData.Description);
    formData.append("Quantity", productData.Quantity);

    // Append image file if selected
    if (productData.ImgUrl) {
      formData.append("ImgUrl", productData.ImgUrl);
    }

    try {
      const response = await axios.post(
        "https://localhost:44344/api/Products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setMessage("Product posted successfully!");
        // Clear the form
        setProductData({
          Name: "",
          ImgUrl: null,
          CategoryId: "",
          DiscountedPrice: "",
          Discount: "",
          Description: "",
          Quantity: "",
        });
        setErrors({}); // Reset errors
      }
    } catch (error) {
      setMessage("Error posting product: " + error.message);
    }
  };

  return (
    <div className="px-10 py-10 text-black bg-white">
      <h1 className="text-2xl font-bold mb-6">Post New Product</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="mb-4">
          <label htmlFor="Name" className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            name="Name"
            value={productData.Name}
            onChange={handleChange}
            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm ${
              errors.Name ? "border-red-500" : ""
            }`}
            required
          />
          {errors.Name && (
            <span className="text-red-500 text-sm">{errors.Name}</span>
          )}
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label htmlFor="ImgUrl" className="block text-sm font-medium text-gray-700">
            Product Image
          </label>
          <input
            type="file"
            name="ImgUrl"
            onChange={handleFileChange}
            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm ${
              errors.ImgUrl ? "border-red-500" : ""
            }`}
          />
          {errors.ImgUrl && (
            <span className="text-red-500 text-sm">{errors.ImgUrl}</span>
          )}
        </div>

        {/* Category Selection */}
        <div className="mb-4">
          <label htmlFor="CategoryId" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="CategoryId"
            value={productData.CategoryId}
            onChange={handleChange}
            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm ${
              errors.CategoryId ? "border-red-500" : ""
            }`}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.CategoryId} value={category.CategoryId}>
                {category.Name}
              </option>
            ))}
          </select>
          {errors.CategoryId && (
            <span className="text-red-500 text-sm">{errors.CategoryId}</span>
          )}
        </div>

        {/* Discounted Price */}
        <div className="mb-4">
          <label htmlFor="DiscountedPrice" className="block text-sm font-medium text-gray-700">
             Price
          </label>
          <input
            type="number"
            name="DiscountedPrice"
            value={productData.DiscountedPrice}
            onChange={handleChange}
            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm ${
              errors.DiscountedPrice ? "border-red-500" : ""
            }`}
            required
          />
          {errors.DiscountedPrice && (
            <span className="text-red-500 text-sm">{errors.DiscountedPrice}</span>
          )}
        </div>

        {/* Discount */}
        <div className="mb-4">
          <label htmlFor="Discount" className="block text-sm font-medium text-gray-700">
            Discount (%)
          </label>
          <input
            type="number"
            name="Discount"
            value={productData.Discount}
            onChange={handleChange}
            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm ${
              errors.Discount ? "border-red-500" : ""
            }`}
          />
          {errors.Discount && (
            <span className="text-red-500 text-sm">{errors.Discount}</span>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="Description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="Description"
            value={productData.Description}
            onChange={handleChange}
            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm ${
              errors.Description ? "border-red-500" : ""
            }`}
            required
          />
          {errors.Description && (
            <span className="text-red-500 text-sm">{errors.Description}</span>
          )}
        </div>

        {/* Quantity */}
        <div className="mb-4">
          <label htmlFor="Quantity" className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            name="Quantity"
            value={productData.Quantity}
            onChange={handleChange}
            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm ${
              errors.Quantity ? "border-red-500" : ""
            }`}
            required
          />
          {errors.Quantity && (
            <span className="text-red-500 text-sm">{errors.Quantity}</span>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg"
          >
            Post Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostProducts;
