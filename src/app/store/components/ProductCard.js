import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ item }) => {
    return (
        <Link href={`/store/product/${item.ProductId}`} key={item.ProductId}>
            <div className="product-card max-w-[277px] max-h-[484px] flex flex-col justify-between border rounded-xl p-3">
                <div>
                    <img
                        className="bg-[#F2F2F2] rounded-lg p-2"
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/Products/${item.ProductId}/image`}
                        alt={item.Name}
                        width={1440}
                        height={1440}
                    />
                </div>
                <div>
                    <span className="text-[#343434] font-bold text-[18px]">
                        {item.Name}
                    </span>
                    <div className="flex gap-3">
                        <span className="text-[#343434] font-bold text-[18px]">
                            €{item.DiscountedPrice}
                        </span>
                        <s className="text-[#ABABAB] font-semibold text-[18px]">
                            €{item.mainPrice}{" "}
                            {/* Show the calculated main price */}
                        </s>
                        <span className="text-[#B92E2E] font-bold text-[18px]">
                            {item.Discount} % OFF
                        </span>
                    </div>
                    <span className="text-[#838383] text-[14px]">
                        {item.Description}
                    </span>
                </div>
                <div>
                    <button
                        className="bg-black h-[42px] max-w-[277px] w-full rounded-lg flex items-center justify-center gap-3"
                        onClick={() => console.log("Added to cart")}
                        ///DiscountedPrice e asol price eitare e cart a nibi
                    >
                        <Image
                            src="/assets/icons/AddedW.svg"
                            className="min-w-[18px] w-[18px] min-h-[18px] h-[18px]"
                            alt="Add to cart"
                            width={1440}
                            height={1440}
                        />
                        <span className="text-white font-medium">
                            Add to cart
                        </span>
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
