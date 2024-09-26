import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProductCart from "../../../Data/Product.json";
import { useAuth } from "../../../contexts/AuthContext";

const Details = () => {
    const { user } = useAuth();
    const router = useRouter();
    const [subTotal, setSubTotal] = useState<number>(0);
    useEffect(() => {
        if (!user || !user.CartItems) return;

        const sbtotal: number = user.CartItems.reduce(
            (total, crt) =>
                total + (crt.Product?.DiscountedPrice || 0) * crt.Quantity,
            0
        );
        setSubTotal(sbtotal);
    }, [user?.CartItems]);
    const subtotal = ProductCart.reduce(
        (total, product) => total + product.discountedPrice,
        0
    );
    function goToCheckout() {
        router.push("/store/checkout");
    }
    return (
        <div className="order-view w-[440px]  flex flex-col gap-8 ">
            <div>
                <span className=" font-medium text-[28px] font-sans text-black">
                    Oder details
                </span>
            </div>
            <div className="flex flex-col">
                <div className="details-price w-[440px] border-[1px] border-[#DEDEDE] bg-[#EAEAEA] rounded-lg px-5 ">
                    <div className="flex flex-col mt-5 gap-2 text-[18px] text-[#272626] font-extralight">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>€ {subTotal}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Estimated Tax</span>
                            <span>-€</span>
                        </div>
                        <hr />
                        <div className="flex justify-between my-5 font-bold text-black">
                            <span>Total</span>
                            <span>€ {subTotal}</span>
                        </div>
                    </div>
                </div>

                <button
                    className=" bg-black h-[56px] mt-5 rounded-lg text-white"
                    onClick={goToCheckout}
                >
                    Go to Checkout
                </button>
            </div>
        </div>
    );
};

export default Details;
