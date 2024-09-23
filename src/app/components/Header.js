"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Barlist = [
    {
        id: 1,
        name: "Home",
        link: "/",
    },
    {
        id: 2,
        name: "Products",
        link: "/",
    },
    {
        id: 3,
        name: "Categories",
        link: "/",
    },
    {
        id: 4,
        name: "Custom",
        link: "/",
    },
    {
        id: 5,
        name: "Blog",
        link: "/",
    },
];

const Header = () => {
    const router = useRouter();

    const handleCartClick = () => {
        router.push("../store/cart");
    };

    return (
        <div className="header flex h-[118px] items-center justify-between bg-white pl-[120px] pr-[120px] text-black border-b overflow-y-auto">
            <a href="/" className="logo flex gap-1">
                <div className="bg-[#1E99F5] h-[38px] w-[38px] flex items-center justify-center rounded-full  italic text-[24px]">
                    <span>f</span>
                </div>
                <div className="flex items-center text-[20px] font-bold text-black">
                    <span>
                        Furni<span className="text-[#1E99F5]">Flex</span>
                    </span>
                </div>
            </a>
            <div className="middle-selection flex  gap-[3.5rem] font-medium  h-20 items-center">
                {Barlist.map((item) => (
                    <a
                        key={item.id}
                        href={item.link}
                        className="hover:bg-slate-300/45 p-1 rounded-lg hover:pt-2 "
                    >
                        {item.name}
                    </a>
                ))}
            </div>
            <div className="shops&profile-icon flex items-center justify-center gap-5">
                <button onClick={handleCartClick} className="shops relative ">
                    <div className=" absolute flex w-[16px] h-[16px] bg-[#323232] items-center justify-center rounded-full translate-x-4 translate-y-[1.1rem] mx-auto">
                        <span className="text-[11.2px] font-medium text-white">
                            2
                        </span>
                    </div>
                    <Image
                        src="/assets/icons/Added.svg"
                        className="min-w-[33px] w-[33px] min-h-[34px] h-[34px]"
                        alt="alt"
                        width={1440}
                        height={1440}
                    />
                </button>
                <button className="profile rounded-full object-cover">
                    <Image
                        src="/assets/icons/Account.svg"
                        alt="alt"
                        className="w-[40px] min-w-[40px] min-h-[40px] h-[40px]"
                        width={1440}
                        height={1440}
                    />
                </button>
            </div>
        </div>
    );
};

export default Header;
