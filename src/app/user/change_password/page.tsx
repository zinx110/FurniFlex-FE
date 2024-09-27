"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const ChangePasswordPage = () => {
    const { user } = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (!user) return router.push("/");
    }, [user]);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setloading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (!user) return;
        if (!currentPassword) {
            setMessage("Please provide your current password.");
            return;
        }
        if (!newPassword) {
            setMessage("Please provide a new password.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setMessage("New password and confirm password do not match.");
            return;
        }

        try {
            setloading(true);
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/Auth/ChangePassword`,
                {
                    currentPassword,
                    newPassword,
                },
                {
                    headers: {
                        Authorization: "Bearer " + user.AuthToken,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                alert("Password updated successfully");
                router.push("/user/profile");
                setloading(false);
            } else {
                console.log(response);
                setMessage("Failed to change password.");
                setloading(false);
            }
        } catch (error) {
            console.error(error);

            setMessage(
                error?.response?.data?.Message || "Error changing password."
            );
            setloading(false);
        }
    };
    if (!user) return null;
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Change Password
                </h2>
                <form onSubmit={handleChangePassword} className="space-y-4">
                    <div>
                        <label
                            htmlFor="currentPassword"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Current Password
                        </label>
                        <input
                            type="password"
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="newPassword"
                            className="block text-sm font-medium text-gray-700"
                        >
                            New Password
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Change Password
                    </button>
                </form>
                {message && (
                    <p className="mt-4 text-center text-red-600">{message}</p>
                )}
            </div>
        </div>
    );
};

export default ChangePasswordPage;
