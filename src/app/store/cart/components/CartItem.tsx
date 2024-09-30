"use client";
import axios from "axios";
import React, { useState } from "react";
import { Cart } from "../../../../types/Cart";
import { useAuth } from "../../../contexts/AuthContext";
interface CartItemProps {
    cart: Cart;
}
const CartItem = ({ cart }: CartItemProps) => {
    const [buttonLoading, setButtonLoading] = useState(false);
    const { user, setUser } = useAuth();
    async function changeQuantity(val: number) {
        if (!user || !cart) {
            alert("Please log in to add item to cart");
            return;
        }
        console.log(val);
        if (val > 0) {
            if (
                cart?.Product?.Quantity &&
                cart.Quantity >= cart?.Product?.Quantity
            ) {
                alert(
                    `Cannot add more. Only ${cart?.Product?.Quantity} number of products are in stock`
                );
                return;
            }
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
                const newCartQuantity = cart.Quantity + val;

                const newCartState: Cart = {
                    ...cart,
                    Quantity: cart.Quantity + val,
                };
                let userUpdatedCartItems = user.CartItems.map((c) =>
                    c.CartId === cartId ? newCartState : c
                );
                if (newCartQuantity === 0) {
                    userUpdatedCartItems = user.CartItems.filter(
                        (c) => c.CartId !== cartId
                    );
                }

                // @ts-ignore
                setUser((prev) => ({
                    ...prev,
                    CartItems: userUpdatedCartItems,
                }));

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
        <div className="item  max-w-full min-h-[120px] h-auto bg-gray-200 rounded-lg flex justify-between items-center">
            <div className="flex px-2 py-2 justify-center items-center">
                <div className="flex  items-center  w-[235px] justify-between">
                    <div className="border-[1px] flex h-[44px] w-[77px] items-center justify-between px-4 rounded-lg">
                        <button onClick={() => changeQuantity(-1)}>-</button>
                        <span className="font-bold">{cart.Quantity}</span>
                        <button onClick={() => changeQuantity(+1)}>+</button>
                    </div>

                    <img
                        className="w-[88px] h-[88px] bg-[#EAEAEA] rounded-lg "
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/Products/${cart.ProductId}/image`}
                        alt=" "
                        width={144}
                        height={144}
                    />
                </div>
                <div className="flex justify-between ml-5 w-full p-2 ">
                    <span className="font-bold text-[16px]">
                        {cart.Product?.Name}
                    </span>
                </div>
            </div>
            <div className="h-full min-h-[120px] flex items-end justify-between p-4 font-bold text-[20px] flex-col">
                <button className="flex" onClick={removeFromCart}>
                    <img src="/assets/icons/cross.svg" alt="" />
                </button>
                <p>$ {(cart.Product?.DiscountedPrice || 0) * cart.Quantity}</p>
            </div>
        </div>
    );
};

export default CartItem;
