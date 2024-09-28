"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const MyOrders = () => {
    const { user } = useAuth(); // Assuming JWT token is in user.AuthToken
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!user) return;

        const fetchOrders = async () => {
            try {
                const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/Orders/MyOrders`;
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${user.AuthToken}`, // Send JWT token for authentication
                    },
                });
                 console.log(response.data)  
                if (response.status === 200) {
                    console.log("orders : ", response.data);
                    setOrders(response.data);
                } else {
                    setError("Failed to load orders.");
                }
            } catch (err) {
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="max-w-4xl mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6">My Orders</h1>

            {orders.length === 0 ? (
                <div>You have no orders yet.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {orders.map((order) => (
                        <div
                            key={order.OrderId}
                            className="border p-4 rounded shadow"
                        >
                            <h2 className="text-lg font-semibold">
                                Order #{order.OrderId}
                            </h2>
                            <p>Status: {order.OrderStatus}</p>
                            <p>
                                Order Date:{" "}
                                {new Date(order.CreatedAt).toLocaleDateString()}
                            </p>
                            <div className="mt-4">
                                <h3 className="font-semibold">Items:</h3>
                                <ul className="list-disc ml-5 flex flex-col py-3 gap-2">
                                    {order.OrderItems.map((item) => (
                                        <li
                                            className="border-b-2 flex items-center justify-between"
                                            key={item.ProductId}
                                        >
                                            <span>
                                                {item.Product.Name} (x
                                                {item.Quantity})
                                            </span>
                                            <div className="w-10 h-10 flex justify-center items-center">
                                                <img
                                                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/Products/${item.Product.ProductId}/image`}
                                                    alt={""}
                                                    width={500}
                                                    height={500}
                                                    className="rounded-md object-cover w-full h-full"
                                                />
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <span className="font-bold"> Total Price: {order.TotalPrice}{`(${order.PaymentStatus})`}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
