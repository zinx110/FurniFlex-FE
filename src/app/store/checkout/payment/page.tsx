"use client";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useCheckout } from "../../../contexts/CheckoutContext";

const PaymentForm = () => {
    const { address, paymentInfo, setPaymentInfo } = useCheckout();

    const router = useRouter();
    useEffect(() => {
        if (!address.postalCode) router.push("/store/checkout/address-form");
    }, [address]);
    const [formData, setFormData] = useState({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        paymentMethod: "Visa",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        // Save payment info
        setPaymentInfo(formData);

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/checkout`,
                { address, paymentInfo: formData },
                {
                    headers: {
                        Authorization: "Bearer " + "YOUR_JWT_TOKEN", // Replace with actual token
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 200) {
                router.push("/myOrders");
            } else {
                alert("Payment failed, please try again.");
            }
        } catch (error) {
            alert("An error occurred during payment.");
        }
    };

    return (
        <div className="flex flex-col w-full max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Payment Information</h2>
            <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="mb-2 p-2 border"
            >
                <option value="Visa">Visa</option>
                <option value="Mastercard">Mastercard</option>
                <option value="Bkash">Bkash</option>
            </select>
            <input
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="Card Number"
                className="mb-2 p-2 border"
            />
            <input
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                placeholder="Expiry Date"
                className="mb-2 p-2 border"
            />
            <input
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="CVV"
                className="mb-2 p-2 border"
            />
            <button
                onClick={handleSubmit}
                className="bg-black text-white mt-4 p-2 rounded"
            >
                Confirm Payment
            </button>
        </div>
    );
};

export default PaymentForm;
