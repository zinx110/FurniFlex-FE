'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const ViewEditProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    imgUrl: '',
    categoryId: '',
    discountedPrice: '',
    discount: '',
    description: '',
    quantity: '',
    imageFile: null, // For handling the uploaded image file
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch products and categories from the server when the component loads
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const productsResponse = await axios.get('https://localhost:44344/api/products');
        setProducts(productsResponse.data);
        const categoriesResponse = await axios.get('https://localhost:44344/api/categories');
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Set the form data for editing when the edit button is clicked
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
      imageFile: null, // Reset the image file
    });
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      imageFile: e.target.files[0],
      imgUrl: URL.createObjectURL(e.target.files[0]), // Preview the selected image
    });
  };

  // Handle form submission to update the product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages

    // Validation
    const errors = [];
    if (formData.name.length > 255) errors.push('Product name cannot exceed 255 characters.');
    if (formData.description.length > 1000) errors.push('Description cannot exceed 1000 characters.');
    if (formData.discount < 0 || formData.discount > 100) errors.push('Discount must be between 0 and 100.');
    if (formData.discountedPrice <= 0) errors.push('Discounted price must be a positive number.');
    if (formData.quantity < 0) errors.push('Quantity must be a non-negative number.');
    if (formData.imageFile && !formData.imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      errors.push('Image must be a valid file type (jpg, jpeg, png, gif).');
    }

    if (errors.length) {
      setMessage(errors.join(' '));
      return;
    }

    try {
      setLoading(true);
      const updateFormData = new FormData();
      updateFormData.append('name', formData.name);
      updateFormData.append('categoryId', formData.categoryId);
      updateFormData.append('discountedPrice', formData.discountedPrice);
      updateFormData.append('discount', formData.discount);
      updateFormData.append('description', formData.description);
      updateFormData.append('quantity', formData.quantity);

      // Append the image file if it's been changed, else retain the existing image URL
      if (formData.imageFile) {
        updateFormData.append('imgUrl', formData.imageFile);
      } else {
        updateFormData.append('imgUrl', formData.imgUrl);
      }

      const response = await axios.put(`https://localhost:44344/api/products/${editingProduct}`, updateFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setMessage('Product updated successfully!');
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.ProductId === editingProduct ? { ...product, ...formData } : product
          )
        );
        setEditingProduct(null);
        // Reset form data after successful submission
        setFormData({
          name: '',
          imgUrl: '',
          categoryId: '',
          discountedPrice: '',
          discount: '',
          description: '',
          quantity: '',
          imageFile: null,
        });
      }
    } catch (error) {
      setMessage('Error updating product: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle product deletion
  const handleDeleteClick = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await axios.delete(`https://localhost:44344/api/products/${productId}`);
        if (response.status === 204) {
          setMessage('Product deleted successfully!');
          setProducts(products.filter(product => product.ProductId !== productId));
        }
      } catch (error) {
        setMessage('Error deleting product: ' + error.message);
      }
    }
  };

  // Function to get category name by ID
  const getCategoryNameById = (id) => {
    const category = categories.find((cat) => cat.CategoryId === id);
    return category ? category.Name : 'Unknown Category';
  };

  return (
    <div className="max-w-full h-auto mx-auto py-10 px-10 bg-white text-black">
      <h1 className="text-2xl font-bold mb-6">View & Edit Products</h1>

      {message && <p className="text-red-500">{message}</p>}
      {loading && <p className="text-blue-500">Loading...</p>}

      {/* Display list of products */}
      <table className="table-auto w-full mb-10">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Discount</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.ProductId}>
              <td className="border px-4 py-2">{product.Name}</td>
              <td className="border px-4 py-2">€{product.DiscountedPrice}</td>
              <td className="border px-4 py-2">{product.Discount}%</td>
              <td className="border px-4 py-2">{getCategoryNameById(product.CategoryId)}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                  onClick={() => handleEditClick(product)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded"
                  onClick={() => handleDeleteClick(product.ProductId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display the edit form if a product is being edited */}
      {editingProduct && (
        <div className="edit-form">
          <h2 className="text-xl font-bold mb-4">Edit Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border rounded text-black"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="imgUrl" className="block text-sm font-medium">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-2 block w-full border rounded text-black"
              />
              {formData.imgUrl && (
                <img
                  src={formData.imgUrl}
                  alt="Product Preview"
                  className="mt-2 w-32 h-32 object-cover"
                />
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="categoryId" className="block text-sm font-medium">
                Category
              </label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="mt-1 block w-full border rounded"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.CategoryId} value={category.CategoryId}>
                    {category.Name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="discountedPrice" className="block text-sm font-medium">
                Discounted Price
              </label>
              <input
                type="number"
                name="discountedPrice"
                value={formData.discountedPrice}
                onChange={handleChange}
                className="mt-1 block w-full border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="discount" className="block text-sm font-medium">
                Discount (%)
              </label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                className="mt-1 block w-full border rounded"
                min="0"
                max="100"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="quantity" className="block text-sm font-medium">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="mt-1 block w-full border rounded"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ViewEditProducts;
