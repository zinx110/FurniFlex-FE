"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuth } from "../../../contexts/AuthContext";

const Sidebar = () => {
    const Options = [
        {
            id: 1,
            name: "My Profile",
            path: "/user/profile",
            imgUrl: "/assets/icons/user.svg",
        },
        {
            id: 2,
            name: "Change Password",
            path: "/user/change_password",
            imgUrl: "/assets/icons/setting.svg",
        },
    ];

    const router = useRouter();
    const { logout, user } = useAuth();

    const handleLogout = () => {
        logout();
        router.push("/auth/login");
    };
    return (
        <div className="bg-[#e9eae9] w-1/4 rounded-lg py-10 px-4 lg:px-10 h-[50%] text-black">
            <div className="text-[18px] font-semibold">Options</div>
            <hr className="border-gray-500 border-t-[0.1px] mt-2" />
            <div className="mt-8 flex flex-col gap-3">
                {Options.map((option) => (
                    <Link
                        href={option.path}
                        key={option.id}
                        className="flex font-semibold mb-4"
                    >
                        <Image
                            src={option.imgUrl}
                            alt={option.name}
                            width={1000}
                            height={1000}
                            className="w-[24px] h-[24px] mr-2"
                        />
                        <div className="flex justify-between w-full">
                            <span>{option.name}</span>
                            <Image
                                src="/assets/icons/rightnav.svg" // Keep this as a static image
                                alt="alt"
                                width={1000}
                                height={1000}
                                className="w-[24px] h-[24px]"
                            />
                        </div>
                    </Link>
                ))}

                {user?.Role.Name === "customer" ? (
                    <Link
                        href="/user/my-orders"
                        className="flex font-semibold mb-4"
                    >
                        <Image
                            src="/assets/icons/orders.svg"
                            alt={"option.name"}
                            width={1000}
                            height={1000}
                            className="w-[24px] h-[24px] mr-2"
                        />
                        <div className="flex justify-between w-full">
                            <span>My Orders</span>
                            <Image
                                src="/assets/icons/rightnav.svg" // Keep this as a static image
                                alt="alt"
                                width={1000}
                                height={1000}
                                className="w-[24px] h-[24px]"
                            />
                        </div>
                    </Link>
                ) : null}

                <button
                    onClick={handleLogout}
                    className="flex font-semibold mb-4"
                >
                    <Image
                        src="/assets/icons/logout.svg"
                        alt="logout"
                        width={1000}
                        height={1000}
                        className="w-[24px] h-[24px] mr-2"
                    />
                    <div className="flex justify-between w-full">
                        <span>Logout</span>
                        <Image
                            src="/assets/icons/rightnav.svg" // Keep this as a static image
                            alt="alt"
                            width={1000}
                            height={1000}
                            className="w-[24px] h-[24px]"
                        />
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
