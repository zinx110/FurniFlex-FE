"use client";
import Image from "next/image";
import React, { useState } from "react";
import ProductCart from "../../../Data/Product.json";

const Products = ProductCart;
const OrderView = () => {
  // Initialize state for each product count
  const [counts, setCounts] = useState(Products.map(() => 1)); // Default to 1 for all products

  const handleIncrease = (index) => {
    // Create a new array with updated count for the specific product
    const newCounts = [...counts];
    newCounts[index] += 1; // Increase the count for the specific product
    setCounts(newCounts);
  };

  const handleDecrease = (index) => {
    const newCounts = [...counts];
    if (newCounts[index] > 0) {
      newCounts[index] -= 1; // Decrease the count for the specific product
    }
    setCounts(newCounts);
  };

  return (
    <div className="order-view w-[860px]  max-h-[914px] h-auto flex flex-col gap-8 text-[#1E1E1E]">
      <div>
        <span className=" font-medium text-[28px] font-sans ">
          An overview of your order
        </span>
      </div>
      <div className="all-item flex flex-col gap-6 w-[860px] max-h-[840px] overflow-y-auto px-4 py-4 bg-[#FAFAFA] rounded-lg">
        {Products.map((product, index) => (
          <div key={index} className="item  max-w-full min-h-[120px]">
            <div className="flex px-2 py-2">
              <div className="flex  items-center  w-[235px] justify-between">
                <div className="border-[1px] flex h-[44px] w-[77px] items-center justify-between px-4 rounded-lg">
                  <button onClick={() =>handleDecrease(index)}>-</button>
                  <sapn className="font-bold">{counts[index]}</sapn>
                  <button onClick={() =>handleIncrease(index)}>+</button>
                </div>

                <Image
                  className="w-[88px] h-[88px] bg-[#EAEAEA] rounded-lg "
                  src={product.imgUrl}
                  alt="alt"
                  width={1444}
                  height={1444}
                />
              </div>
              <div className="flex justify-between ml-5 w-full p-2 ">
                <span className="font-bold text-[16px]">{product.name}</span>
                <button className="flex">
                  <img src="/assets/icons/cross.svg" alt="" />
                </button>
              </div>
            </div>
            <div className=" flex justify-end px-2 font-bold text-[20px]">
              € {product.discountedPrice}
            </div>
          </div>
        ))}
        <hr className="border-t-[0.01px] border-gray-[#ECECEC]" />
      </div>
    </div>
  );
};

export default OrderView;
