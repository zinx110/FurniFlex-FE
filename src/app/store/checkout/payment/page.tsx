"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useCheckout } from "../../../contexts/CheckoutContext";

const PaymentForm = () => {
    const { address, orderDetails, paymentInfo, setPaymentInfo } =
        useCheckout();
    const { user } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState(paymentInfo);
    const [errors, setErrors] = useState({
        paymentMethod: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });

    useEffect(() => {
        if (!address.postalCode) router.push("/store/checkout/address-form");
    }, [address]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            paymentMethod: "",
            cardNumber: "",
            expiryDate: "",
            cvv: "",
        };

        // Card number validation (16 digits for Visa/Mastercard)
        const cardNumberRegex = /^\d{16}$/;
        if (
            !formData.cardNumber ||
            !cardNumberRegex.test(formData.cardNumber)
        ) {
            newErrors.cardNumber = "Card number must be 16 digits";
            isValid = false;
        }

        // CVV validation (3 digits for Visa/Mastercard)
        const cvvRegex = /^\d{3}$/;
        if (!formData.cvv || !cvvRegex.test(formData.cvv)) {
            newErrors.cvv = "CVV must be a 3-digit number";
            isValid = false;
        }

        // Expiry date validation (MM/YY format and future date)
        const expiryDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
        const today = new Date();
        const [month, year] = formData.expiryDate.split("/");
        if (
            !formData.expiryDate ||
            !expiryDateRegex.test(formData.expiryDate)
        ) {
            newErrors.expiryDate = "Expiry date must be in MM/YY format";
            isValid = false;
        } else {
            const expiryDate = new Date(
                2000 + parseInt(year),
                parseInt(month) - 1
            ); // Convert to Date object
            if (expiryDate <= today) {
                newErrors.expiryDate = "Expiry date must be a future date";
                isValid = false;
            }
        }

        // Payment method validation
        if (!formData.paymentMethod) {
            newErrors.paymentMethod = "Please select a payment method";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            alert("Please correct the highlighted errors.");
            return;
        }

        // Save payment info
        // setPaymentInfo(formData);
        const [month, year] = formData.expiryDate.split("/");
        const formattedExpiryDate = `20${year}-${month}-01`;

        try {
            if (!user) return;
            const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/Orders`;
            const reqBody = {
                Street: address.street,
                City: address.city,
                Postal: address.postalCode,
                Country: address.country,
                ContactPhone: address.contactPhone,
                SubTotal: orderDetails.subTotal,
                CardNumber: formData.cardNumber,
                CVV: formData.cvv,
                ExpiryDate: formattedExpiryDate,
                PaymentMethod: formData.paymentMethod,
                CartItems: user.CartItems.map((cartItem) => ({
                    ProductId: cartItem.ProductId,
                    Quantity: cartItem.Quantity,
                })),
            };
            const response = await axios.post(url, reqBody, {
                headers: {
                    Authorization: "Bearer " + user.AuthToken, // Replace with actual token
                    "Content-Type": "application/json",
                },
            });
            console.log(response);
            if (response.status === 201) {
                alert("Successfully places your order");
                router.push("/user/my-orders");
            } else {
                alert(
                    response?.data?.Message ||
                        "Payment failed, please try again."
                );
            }
        } catch (error) {
            console.log(error);
            alert(
                error.response?.data?.Message ||
                    "An error occurred during payment."
            );
        }
    };

    return (
        <div className="flex flex-col w-full max-w-md mx-auto py-10">
            <h2 className="text-xl font-bold mb-4">Payment Information</h2>

            <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className={`mb-2 p-2 border ${
                    errors.paymentMethod ? "border-red-500" : ""
                }`}
            >
                <option value="">Select Payment Method</option>
                <option value="Visa">Visa</option>
                <option value="Mastercard">Mastercard</option>
                <option value="Bkash">Bkash</option>
            </select>
            {errors.paymentMethod && (
                <span className="text-red-500 text-sm">
                    {errors.paymentMethod}
                </span>
            )}

            <input
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="Card Number"
                className={`mb-2 p-2 border ${
                    errors.cardNumber ? "border-red-500" : ""
                }`}
            />
            {errors.cardNumber && (
                <span className="text-red-500 text-sm">
                    {errors.cardNumber}
                </span>
            )}

            <input
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                placeholder="Expiry Date (MM/YY)"
                className={`mb-2 p-2 border ${
                    errors.expiryDate ? "border-red-500" : ""
                }`}
            />
            {errors.expiryDate && (
                <span className="text-red-500 text-sm">
                    {errors.expiryDate}
                </span>
            )}

            <input
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="CVV"
                className={`mb-2 p-2 border ${
                    errors.cvv ? "border-red-500" : ""
                }`}
            />
            {errors.cvv && (
                <span className="text-red-500 text-sm">{errors.cvv}</span>
            )}

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
