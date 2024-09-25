// app/reports/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { fetchReportById } from "@/lib/firestore";
import { uploadUriType } from "@/types";
import axios from "axios";
import Image from "next/image";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useAuth } from "../../../contexts/AuthContext";

const ProductDetailsPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { userToken } = useAuth();
    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const url = process.env.NEXT_PUBLIC_API_BASE_URL + "Products/1";
                const config = {};
                const res = await axios.get(url, {
                    headers: { Authorization: "Bearer " + userToken },
                });
                if (res.status == 200) {
                    const data = res.data;
                    console.log("product :", data);
                    setProduct(data);
                } else {
                    alert("There was an error fetching the product");
                }
            } catch (err) {
                setError("Failed to load report details.");
                console.error(err);
            }
            setLoading(false);
        };

        fetchProduct();
    }, [id]);

    if (loading)
        return (
            <div className="p-6 min-h-screen flex justify-center items-center ">
                <LoadingSpinner />
            </div>
        );
    if (error) return <p className="text-red-700">{error}</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-black">
                Product Details
            </h1>
            <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
                <div className="bg-white shadow-md rounded-lg max-w-3xl w-full p-6">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Product Image */}
                        <div className="w-full md:w-1/2">
                            <Image
                                src={`/assets/products/image 151.svg`}
                                alt={product.Name}
                                width={500}
                                height={500}
                                className="rounded-md object-cover w-full h-full"
                            />
                        </div>

                        {/* Product Details */}
                        <div className="w-full md:w-1/2">
                            <h1 className="text-3xl font-bold text-gray-800">
                                {product.Name}
                            </h1>
                            <p className="mt-2 text-sm text-gray-600">
                                Category: {product.Category.Name}
                            </p>

                            <div className="mt-4">
                                <p className="text-2xl font-bold text-gray-900">
                                    ${product.DiscountedPrice.toFixed(2)}
                                </p>
                                {product.Discount > 0 && (
                                    <p className="text-sm text-gray-500 line-through">
                                        $
                                        {(
                                            product.DiscountedPrice +
                                            product.Discount
                                        ).toFixed(2)}
                                    </p>
                                )}
                            </div>

                            <p className="mt-6 text-gray-700 leading-relaxed">
                                {product.Description}
                            </p>

                            <div className="mt-6 flex items-center space-x-4">
                                <span className="text-sm font-medium text-gray-600">
                                    Quantity Available: {product.Quantity}
                                </span>
                            </div>

                            <button className="mt-8 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                                Add to Cart
                            </button>
                        </div>
                    </div>

                    {/* Reviews Section (Placeholder) */}
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Reviews
                        </h2>
                        <p className="text-gray-500 mt-4">
                            No reviews available.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
