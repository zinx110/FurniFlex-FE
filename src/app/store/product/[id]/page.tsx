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
                const url = "https://localhost:3434/api/adfadf";
                const config = {};
                const res = await axios.get(url, {
                    headers: { Authorization: "Bearer " + userToken },
                });
                if (res.status == 200) {
                    const data = res.data;
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

    if (loading) return <LoadingSpinner />;
    if (error) return <p className="text-red-700">{error}</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-black">
                Product Details
            </h1>
            <div className="border p-4 rounded-lg shadow-lg text-black"></div>
        </div>
    );
};

export default ProductDetailsPage;
