"use client";
import React, { useState } from "react";
import Image from "next/image";

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
    ? products.filter(product => product.CategoryId === selectedCategory)
    : products;

  // Map through filtered products to include main price calculation
  const updatedProductList = filteredProducts.map((product) => {
    const mainPrice = calculateMainPrice(product.DiscountedPrice, product.Discount);
    return {
      ...product,
      mainPrice: parseFloat(mainPrice), // Ensure mainPrice is a number
    };
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = updatedProductList.slice(indexOfFirstItem, indexOfLastItem);

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
          <div
            key={item.ProductId}
            className="product-card max-w-[277px] max-h-[484px] flex flex-col justify-between border rounded-xl p-3"
          >
            <div>
              <img
                className="bg-[#F2F2F2] rounded-lg p-2"
                src={item.ImgUrl}
                alt={item.Name}
                width={1440}
                height={1440}
              />
            </div>
            <div>
              <span className="text-[#343434] font-bold text-[18px]">
                {item.Name}
              </span>
              <div className="flex gap-3">
                <span className="text-[#343434] font-bold text-[18px]">
                  €{item.DiscountedPrice}
                </span>
                <s className="text-[#ABABAB] font-semibold text-[18px]">
                  €{item.mainPrice} {/* Show the calculated main price */}
                </s>
                <span className="text-[#B92E2E] font-bold text-[18px]">
                  {item.Discount} % OFF
                </span>
              </div>
              <span className="text-[#838383] text-[14px]">
                {item.Description}
              </span>
            </div>
            <div>
              <button
                className="bg-black h-[42px] max-w-[277px] w-full rounded-lg flex items-center justify-center gap-3"
                onClick={() => console.log("Added to cart")}
                ///DiscountedPrice e asol price eitare e cart a nibi
              >
                <Image
                  src="/assets/icons/AddedW.svg"
                  className="min-w-[18px] w-[18px] min-h-[18px] h-[18px]"
                  alt="Add to cart"
                  width={1440}
                  height={1440}
                />
                <span className="text-white font-medium">Add to cart</span>
              </button>
            </div>
          </div>
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
