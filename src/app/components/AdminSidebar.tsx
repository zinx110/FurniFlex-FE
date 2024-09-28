"use client";
import Link from "next/link";
import React from "react";
import { useAuth } from "../contexts/AuthContext";

export default function AdminSidebar() {
    const { user } = useAuth();
    if (!user || user.Role.Name !== "admin") {
        return null;
    }
    return (
        <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
            <ul className="flex flex-col p-4">
                {AdminRouteList.map((route) => (
                    <li key={route.id} className="mb-3">
                        <Link href={route.link}>
                            <p className="block p-2 rounded-md hover:bg-gray-700">
                                {route.name}
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const AdminRouteList = [
    {
        id: 1,
        name: "Admin Dashboard",
        link: "/admin/dashboard",
    },
    {
        id: 2,
        name: "Roles",
        link: "/admin/manage-roles",
    },
    {
        id: 3,
        name: "Manage Products",
        link: "/admin/view-edit-products",
    },
    {
        id: 4,
        name: "Manage Categories",
        link: "/admin/view-edit-categories",
    },
    {
        id: 5,
        name: "Post Product",
        link: "/admin/post-product",
    },
    {
        id: 6,
        name: "Post Category",
        link: "/admin/post-category",
    },
    {
        id: 7,
        name: "Manage Orders",
        link: "/admin/manage-orders",
    },
];
