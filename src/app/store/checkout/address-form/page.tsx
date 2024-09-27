"use client";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { useCheckout } from "../../../contexts/CheckoutContext";

const AddressForm = () => {
    const { address, setAddress, orderDetails } = useCheckout();
    const router = useRouter();

    const [formData, setFormData] = useState(address);
    useEffect(() => {
        setFormData(address);
    }, [address]);
    useEffect(() => {
        if (!orderDetails.subTotal) {
            router.push("/store/cart");
        }
    }, [orderDetails]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleNext = () => {
        if (
            !formData.city ||
            !formData.street ||
            !formData.postalCode ||
            !formData.country ||
            !formData.contactPhone
        ) {
            alert("please enter all the fields");
            return;
        }
        // Save address to context
        setAddress(formData);
        router.push("/store/checkout/payment");
    };

    return (
        <div className="flex flex-col w-full max-w-md mx-auto py-10">
            <h2 className="text-xl font-bold mb-4">Enter Your Address</h2>
            <input
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="Street"
                className="mb-2 p-2 border"
            />
            <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="mb-2 p-2 border"
            />
            <input
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="Postal Code"
                className="mb-2 p-2 border"
            />
            <input
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                className="mb-2 p-2 border"
            />
            <input
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                placeholder="Country"
                className="mb-2 p-2 border"
            />
            <button
                onClick={handleNext}
                className="bg-black text-white mt-4 p-2 rounded"
            >
                Next
            </button>
        </div>
    );
};

export default AddressForm;
