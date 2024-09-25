"use client";
import React, { useState } from "react";

// Categories should be passed as props
const Sidebar = ({ categories, onSelectCategory }) => {
  const [selectedId, setSelectedId] = useState(null);

  // Add "All" category at the beginning of the categories list
  const allCategories = [{ CategoryId: null, Name: "All" }, ...categories];

  return (
    <div className="flex flex-col gap-[18px] pt-[40px] w-[263px] h-[1000px] border-r">
      {allCategories.map((item) => (
        <button
          key={item.CategoryId} // Handle both "All" and actual categories
          onClick={() => {
            setSelectedId(item.CategoryId); // Update selectedId
            onSelectCategory(item.CategoryId); // Call the function to filter products
          }}
          className={`flex items-center justify-center px-[24px] py-[5px] rounded-lg text-[20px] h-[53px] hover:bg-black/10 w-[231px] font-medium ${
            selectedId === item.CategoryId
              ? "bg-black text-white font-semibold"
              : "text-[#717171]"
          }`}
        >
          {item.Name} {/* Render category name */}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
