"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCheckout } from "../../../contexts/CheckoutContext";

const AddressForm = () => {
    const { address, setAddress, orderDetails } = useCheckout();
    const router = useRouter();
    const [formData, setFormData] = useState(address);
    const [errors, setErrors] = useState({
        street: "",
        city: "",
        postalCode: "",
        country: "",
        contactPhone: "",
    });

    useEffect(() => {
        setFormData(address);
    }, [address]);

    useEffect(() => {
        if (!orderDetails.subTotal) {
            router.push("/store/cart");
        }
    }, [orderDetails]);

    const validateFields = () => {
        const newErrors = {
            street: "",
            city: "",
            postalCode: "",
            country: "",
            contactPhone: "",
        };
        let isValid = true;

        // Street validation
        if (!formData.street || formData.street.trim() === "") {
            newErrors.street = "Street address is required";
            isValid = false;
        }

        // City validation
        if (!formData.city || formData.city.trim() === "") {
            newErrors.city = "City is required";
            isValid = false;
        }

        // Postal code validation (basic validation)
        const postalCodeRegex = /^[A-Za-z0-9\- ]{3,10}$/; // Adjust the regex based on your postal code format
        if (
            !formData.postalCode ||
            !postalCodeRegex.test(formData.postalCode)
        ) {
            newErrors.postalCode = "Invalid postal code";
            isValid = false;
        }

        // Country validation (basic non-empty check)
        if (!formData.country || formData.country.trim() === "") {
            newErrors.country = "Country is required";
            isValid = false;
        }

        // Phone number validation (basic format)
        const phoneRegex = /^\+?[1-9]\d{1,14}$/; // This is a basic regex for international phone numbers
        if (!formData.contactPhone || !phoneRegex.test(formData.contactPhone)) {
            newErrors.contactPhone = "Invalid phone number";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleNext = () => {
        if (validateFields()) {
            // Save address to context if validation passes
            setAddress(formData);
            router.push("/store/checkout/payment");
        }
    };

    return (
        <div className="flex flex-col w-full max-w-md mx-auto py-10">
            <h2 className="text-xl font-bold mb-4">Enter Your Address</h2>

            <input
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="Street"
                className={`mb-2 p-2 border ${
                    errors.street ? "border-red-500" : ""
                }`}
            />
            {errors.street && (
                <span className="text-red-500 text-sm">{errors.street}</span>
            )}

            <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className={`mb-2 p-2 border ${
                    errors.city ? "border-red-500" : ""
                }`}
            />
            {errors.city && (
                <span className="text-red-500 text-sm">{errors.city}</span>
            )}

            <input
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="Postal Code"
                className={`mb-2 p-2 border ${
                    errors.postalCode ? "border-red-500" : ""
                }`}
            />
            {errors.postalCode && (
                <span className="text-red-500 text-sm">
                    {errors.postalCode}
                </span>
            )}

            <input
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                className={`mb-2 p-2 border ${
                    errors.country ? "border-red-500" : ""
                }`}
            />
            {errors.country && (
                <span className="text-red-500 text-sm">{errors.country}</span>
            )}

            <input
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                placeholder="Contact Phone"
                className={`mb-2 p-2 border ${
                    errors.contactPhone ? "border-red-500" : ""
                }`}
            />
            {errors.contactPhone && (
                <span className="text-red-500 text-sm">
                    {errors.contactPhone}
                </span>
            )}

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
