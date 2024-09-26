"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProductCart from "../../../Data/Product.json";
import { useAuth } from "../../../contexts/AuthContext";
import CartItem from "./CartItem";

const Products = ProductCart;
const OrderView = () => {
    // Initialize state for each product count
    const [counts, setCounts] = useState(Products.map(() => 1)); // Default to 1 for all products
    const router = useRouter();
    const { user } = useAuth();
    useEffect(() => {
        if (!user) {
            router.push("/");
            return;
        }
    }, [user]);

    if (!user) {
        return null;
    }
    return (
        <div className="order-view w-full  max-h-[914px] h-auto flex flex-col gap-8 text-[#1E1E1E]">
            <div>
                <span className=" font-medium text-[28px] font-sans ">
                    An overview of your order
                </span>
            </div>
            <div className="all-item flex flex-col gap-6 w-full max-h-[840px] overflow-y-auto px-4 py-4 bg-[#FAFAFA] rounded-lg">
                {user.CartItems.map((cart, index) => (
                    <CartItem key={index} cart={cart} />
                ))}
                <hr className="border-t-[0.01px] border-gray-[#ECECEC]" />
            </div>
        </div>
    );
};

export default OrderView;
