"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import SIngleOrderCard from "./components/SIngleOrderCard";

const ManageOrders = () => {
    const { user } = useAuth(); // Assuming JWT token is in user.AuthToken
    const [orders, setOrders] = useState<any[]>([]);
    const [processingOrders, setProcessingOrders] = useState<any[]>([]);
    const [onTheWayOrders, setOnTheWayOrders] = useState<any[]>([]);
    const [deliveredOrders, setDeliveredOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();
    useEffect(() => {
        if (!user) return;
        if (user.Role.Name !== "admin") {
            router.push("/");
        }

        const fetchOrders = async () => {
            try {
                const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/Orders`;
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${user.AuthToken}`, // Send JWT token for authentication
                    },
                });

                if (response.status === 200) {
                    console.log("orders : ", response.data);
                    setOrders(response.data);
                } else {
                    setError("Failed to load orders.");
                }
            } catch (err) {
                console.log(err);
                setError(
                    err.response?.data?.Message ||
                        "An error occurred while fetching orders."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    useEffect(() => {
        setProcessingOrders(
            orders.filter(
                (order) =>
                    order.OrderStatus === "Pending" ||
                    order.OrderStatus === "Processing"
            )
        );
        setOnTheWayOrders(
            orders.filter((order) => order.OrderStatus === "On the way")
        );
        setDeliveredOrders(
            orders.filter((order) => order.OrderStatus === "Delivered")
        );
    }, [orders]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="px-20 lg:px-40 w-full mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>

            {orders.length === 0 ? (
                <div>No orders available.</div>
            ) : (
                <>
                    <div className="flex flex-col lg:flex-row gap-2 h-full justify-center items-center ">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4 border-r-2 pr-2 border-black">
                            <h2 className="col-span-full text-xl font-semibold mb-6">
                                Pending Orders
                            </h2>
                            {processingOrders.map((order) => (
                                <SIngleOrderCard
                                    key={order.OrderId}
                                    order={order}
                                    setOrders={setOrders}
                                />
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4 border-r-2 pr-2 border-black">
                            <h2 className="col-span-full text-xl font-semibold mb-6">
                                On The Way Orders
                            </h2>
                            {onTheWayOrders.map((order) => (
                                <SIngleOrderCard
                                    key={order.OrderId}
                                    order={order}
                                    setOrders={setOrders}
                                />
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                            <h2 className="col-span-full text-xl font-semibold mb-6">
                                Delivered Orders
                            </h2>
                            {deliveredOrders.map((order) => (
                                <SIngleOrderCard
                                    key={order.OrderId}
                                    order={order}
                                    setOrders={setOrders}
                                />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ManageOrders;
