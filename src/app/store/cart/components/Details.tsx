import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProductCart from "../../../Data/Product.json";
import { useAuth } from "../../../contexts/AuthContext";
import { useCheckout } from "../../../contexts/CheckoutContext";

const Details = () => {
    const { user } = useAuth();
    const { setOrderDetails } = useCheckout();
    const router = useRouter();
    const [subTotal, setSubTotal] = useState<number>(0);
    useEffect(() => {
        if (!user || user.Role.Name === "admin") {
            alert("admin cannot have a cart.");
            router.push("/admin/dashboard");
        }
        if (!user || !user.CartItems) return;

        const sbtotal: number = user.CartItems.reduce(
            (total, crt) =>
                total + (crt.Product?.DiscountedPrice || 0) * crt.Quantity,
            0
        );
        setSubTotal(sbtotal);
    }, [user]);

    function goToCheckout() {
        if (user?.Role.Name === "admin") {
            alert("Admin Cannot checkout");
            return;
        }
        router.push("/store/checkout/address-form");
        setOrderDetails({
            subTotal: subTotal,
        });
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
