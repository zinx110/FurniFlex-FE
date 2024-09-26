"use client";
import React from "react";

import Details from "./components/Details";
import OrderView from "./components/OrderView";

const Cart = () => {
    return (
        <div className="h-auto w-full bg-white px-[120px] flex flex-col lg:flex-row  py-[20px] gap-[8rem]">
            <OrderView />
            <Details />
        </div>
    );
};

export default Cart;
