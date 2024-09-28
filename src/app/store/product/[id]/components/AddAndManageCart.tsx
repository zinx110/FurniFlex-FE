"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Cart } from "../../../../../types/Cart";
import { useAuth } from "../../../../contexts/AuthContext";
interface AddAndManageCartProp {
    product: any;
}
const AddAndManageCart = ({ product }: AddAndManageCartProp) => {
    const { user, setUser } = useAuth();

    const [buttonLoading, setButtonLoading] = useState(false);

    const [cart, setCart] = useState<Cart | null>(null);

    useEffect(() => {
        if (!user || !user.CartItems) return;
        const cart = user.CartItems;
        const thisItemInCart = cart.find(
            (c) => c.ProductId === product.ProductId
        );

        setCart(thisItemInCart || null);
    }, [user]);

    async function changeQuantity(val: number) {
        if (!user || !cart) {
            alert("Please log in to add item to cart");
            return;
        }

        setButtonLoading(true);
        try {
            const cartId = cart.CartId;
            const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/Carts/${cartId}?changeValue=${val}`;
            const config = {};

            const res = await axios.put(
                url,
                {},
                {
                    headers: {
                        Authorization: "Bearer " + user.AuthToken,
                        "Content-Type": "application/json",
                    },
                }
            );
            if (res.status == 200) {
                const newCartState: Cart = {
                    ...cart,
                    Quantity: cart.Quantity + val,
                };

                const userUpdatedCartItems = user.CartItems.map((c) =>
                    c.CartId === cartId ? newCartState : c
                );
                console.log(userUpdatedCartItems);
                // @ts-ignore
                setUser((prev) => ({
                    ...prev,
                    CartItems: userUpdatedCartItems,
                }));
                setCart(newCartState);

                setButtonLoading(false);
            } else {
                alert("There was an error adding the product to the cart");

                console.log(res);
                setButtonLoading(false);
            }
        } catch (error) {
            alert(error);
            setButtonLoading(false);
        }
    }
    async function addToCart() {
        if (!user) {
            alert("Please log in to add item to cart");
            return;
        }
        if (user.Role.Name === "admin") {
            alert("You are an admin. Admin cannot have a cart.");
            return;
        }
        setButtonLoading(true);
        try {
            const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/Carts`;
            const config = {};
            const reqBody = {
                UserId: user.UserId,
                ProductId: product.ProductId,
                Quantity: 1,
            };
            const res = await axios.post(url, reqBody, {
                headers: {
                    Authorization: "Bearer " + user.AuthToken,
                    "Content-Type": "application/json",
                },
            });
            if (res.status == 201) {
                alert("Added successfully");
                console.log(res.data);
                const resData = res.data;

                const newUserCartItems: any[] = resData?.User?.CartItems;
                // @ts-ignore
                setUser((prev) => ({ ...prev, CartItems: newUserCartItems }));

                setButtonLoading(false);
            } else {
                alert("There was an error adding the product to the cart");

                console.log(res);
                setButtonLoading(false);
            }
        } catch (error) {
            alert(error);
            setButtonLoading(false);
        }
    }
    async function removeFromCart() {
        if (!user || !cart) {
            alert("Please log in to add item to cart");
            return;
        }
        setButtonLoading(true);
        try {
            const cartId = cart.CartId;
            const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/Carts/${cartId}`;
            const config = {};

            const res = await axios.delete(url, {
                headers: {
                    Authorization: "Bearer " + user.AuthToken,
                    "Content-Type": "application/json",
                },
            });

            if (res.status == 200) {
                alert("Cart Deleted Successfully");
                const userRemainingCarts = user.CartItems.filter(
                    (c) => c.CartId !== cartId
                );

                // @ts-ignore
                setUser((prev) => ({ ...prev, CartItems: userRemainingCarts }));

                setButtonLoading(false);
            } else {
                alert("There was an error adding the product to the cart");

                console.log(res);
                setButtonLoading(false);
            }
        } catch (error) {
            alert(error);
            setButtonLoading(false);
        }
    }

    return (
        <div>
            {cart?.Quantity ? (
                <>
                    <div className="mt-8 w-full flex items-center justify-between space-x-4">
                        {/* Decrement button */}
                        <button
                            onClick={() => {
                                changeQuantity(-1);
                            }}
                            disabled={cart.Quantity <= 1 || buttonLoading}
                            className={`${
                                cart.Quantity > 1
                                    ? "bg-blue-600"
                                    : "bg-gray-200"
                            } text-white py-2 px-4 rounded-lg transition hover:${
                                cart.Quantity > 1
                                    ? "bg-blue-700"
                                    : "cursor-not-allowed"
                            }`}
                        >
                            -
                        </button>

                        {/* Display text for cart.Quantity */}
                        <span className="text-lg font-semibold text-black">
                            {cart.Quantity}{" "}
                            {/* Display the current quantity here */}
                        </span>

                        {/* Increment button */}
                        <button
                            onClick={() => {
                                changeQuantity(+1);
                            }}
                            disabled={
                                !product.Quantity ||
                                product.Quantity <= cart.Quantity ||
                                buttonLoading
                            }
                            className={`${
                                product.Quantity &&
                                product.Quantity > cart.Quantity
                                    ? "bg-blue-600"
                                    : "bg-gray-200"
                            } text-white py-2 px-4 rounded-lg transition hover:${
                                product.Quantity
                                    ? "bg-blue-700"
                                    : "cursor-not-allowed"
                            }`}
                        >
                            +
                        </button>
                    </div>

                    <button
                        onClick={removeFromCart}
                        disabled={buttonLoading}
                        className={`mt-4 w-full   bg-red-600 text-white py-2 rounded-lg hover:bg-red-700  transition disabled:hover:cursor-not-allowed`}
                    >
                        Remove from cart
                    </button>
                </>
            ) : null}

            {/* Add to Cart button (kept separately) */}
            {cart == null ? (
                <button
                    onClick={addToCart}
                    disabled={!product.Quantity || buttonLoading}
                    className={`mt-4 w-full ${
                        product.Quantity ? "bg-blue-600" : "bg-orange-200"
                    } text-white py-2 rounded-lg hover:${
                        product.Quantity ? "bg-blue-700" : "bg-orange-200"
                    } transition disabled:hover:cursor-not-allowed`}
                >
                    {product.Quantity ? "Add to Cart" : "Out of Stock"}
                </button>
            ) : null}
        </div>
    );
};

export default AddAndManageCart;
