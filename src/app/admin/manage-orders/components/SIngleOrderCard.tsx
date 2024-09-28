import axios from "axios";
import React, { Dispatch, SetStateAction } from "react";
import { useAuth } from "../../../contexts/AuthContext";
interface SIngleOrderCardProps {
    order: any;
    setOrders: Dispatch<SetStateAction<any>>;
}
const SIngleOrderCard = ({ order, setOrders }: SIngleOrderCardProps) => {
    const { user } = useAuth();

    const updateOrderStatus = async (orderId: number, status: string) => {
        if (!user) return;
        try {
            const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/Orders/${orderId}`;
            const reqBody = {
                OrderStatus: status,
            };

            const response = await axios.put(url, reqBody, {
                headers: {
                    Authorization: `Bearer ${user.AuthToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 204) {
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order.OrderId === orderId
                            ? { ...order, OrderStatus: status }
                            : order
                    )
                );
            } else {
                console.log(response);
                alert("Failed to update order status.");
            }
        } catch (err) {
            alert(
                err.response?.data?.Message ||
                    "An error occurred while updating the order status."
            );
        }
    };

    return (
        <div key={order.OrderId} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Order #{order.OrderId}</h2>
            <p>Status: {order.OrderStatus}</p>
            <p>Order Date: {new Date(order.CreatedAt).toLocaleDateString()}</p>
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
            <div className="mt-4 flex gap-2">
                {order.OrderStatus === "Delivered" ? (
                    <p className="bg-red-500 py-4 px-3 flex justify-center items-center h-10 w-full text-white">
                        Delivered
                    </p>
                ) : null}
                {order.OrderStatus === "On the way" ? (
                    <button
                        onClick={() =>
                            updateOrderStatus(order.OrderId, "Delivered")
                        }
                        className="bg-green-500 text-white p-2 rounded w-full"
                    >
                        Mark as Delivered
                    </button>
                ) : null}
                {order.OrderStatus === "Processing" ||
                order.OrderStatus === "Pending" ? (
                    <button
                        onClick={() =>
                            updateOrderStatus(order.OrderId, "On the way")
                        }
                        className="bg-blue-500 text-white p-2 rounded w-full"
                    >
                        Mark as On the way
                    </button>
                ) : null}
            </div>
        </div>
    );
};

export default SIngleOrderCard;
