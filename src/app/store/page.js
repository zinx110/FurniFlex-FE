import React from "react";
import Sidebar from "./components/Sidebar";
import Products from "./components/Products";

const Store = () => {
  return (
    <div className="h-[1444px] bg-white px-[120px] flex  py-[120px] ">
      <div className='w-auto'>
        <Sidebar />
      </div>
      <div className='w-full'>
        <Products />
      </div>
    </div>
  );
};

export default Store;
