"use client";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ForgotPassword = () => {
    const route = useRouter();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string[]>([]);
    const [showOtpField, setShowOtpField] = useState(false);

    // Function to handle email submit (Step 1: Send OTP)
    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            setError(["Email is required"]);
            return;
        }

        try {
            const response = await axios.patch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/Auth/ForgotPassword`,
                email // Sending email as a plain string
            );

            if (response.status === 200) {
                // OTP sent successfully, now show the OTP input field
                setShowOtpField(true);
                setError([]);
            }
        } catch (err: any) {
            setError([err?.response?.data?.message || "Error sending OTP."]);
        }
    };

    // Function to handle OTP and password submission (Step 2: Verify OTP and Reset Password)
    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!otp || !newPassword || !confirmPassword) {
            setError(["Please fill out all fields"]);
            return;
        }

        if (newPassword !== confirmPassword) {
            setError(["Passwords do not match"]);
            return;
        }

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/Auth/VerifyOtpAndResetPassword`,
                {
                    Email: email,
                    Otp: otp,
                    NewPassword: newPassword
                }
            );

            if (response.status === 200) {
                // Password reset successful, redirect to login
                route.push("/auth/login");
            }
        } catch (err: any) {
            setError([err?.response?.data?.message || "Error resetting password."]);
        }
    };

    return (
        <div className="base flex h-lvh">
            <div className="forgot-password-field bg-white w-1/2 flex items-center justify-center overflow-hidden">
                <div className="forgot-password-form text-black">
                    <div className="heading-text flex flex-col items-start gap-2">
                        <h3 className="text-[32px]">Forgot Password?</h3>
                        <span className="text-[#707070] font-light -mt-2">
                            Please enter your email to receive the OTP and reset your password.
                        </span>
                    </div>

                    {!showOtpField ? (
                        <form onSubmit={handleEmailSubmit}>
                            <div className="input-fields flex flex-col mt-[1.2rem] gap-4">
                                <div className="flex flex-col w-[451px] h-[52px] border rounded-md p-1 pl-2">
                                    <span className="text-[#707070] text-[12px]">Email address</span>
                                    <input
                                        type="email"
                                        className="w-full focus:outline-none"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-[451px] h-[56px] border rounded-md p-1 pl-2 font-semibold bg-black text-white mt-4"
                            >
                                Send OTP
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handlePasswordReset}>
                            <div className="input-fields flex flex-col mt-[1.2rem] gap-4">
                                <div className="flex flex-col w-[451px] h-[52px] border rounded-md p-1 pl-2">
                                    <span className="text-[#707070] text-[12px]">OTP</span>
                                    <input
                                        type="text"
                                        className="w-full focus:outline-none"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col w-[451px] h-[52px] border rounded-md p-1 pl-2">
                                    <span className="text-[#707070] text-[12px]">New Password</span>
                                    <input
                                        type="password"
                                        className="w-full focus:outline-none"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col w-[451px] h-[52px] border rounded-md p-1 pl-2">
                                    <span className="text-[#707070] text-[12px]">Confirm New Password</span>
                                    <input
                                        type="password"
                                        className="w-full focus:outline-none"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-[451px] h-[56px] border rounded-md p-1 pl-2 font-semibold bg-black text-white mt-4"
                            >
                                Reset Password
                            </button>
                        </form>
                    )}

                    {error.length > 0 && (
                        <div className="text-red-500 mt-4">
                            {error.map((errMsg, index) => (
                                <p key={index}>{errMsg}</p>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="relative ImageField w-1/2 flex items-center justify-center overflow-hidden">
                <div className="absolute flex flex-col items-center gap-2 w-[445px]">
                    <div className="flex items-center justify-center bg-[#1E99F5] w-[85px] h-[85px] rounded-full">
                        <span className="text-[36px] text-black font-serif">F</span>
                    </div>
                    <h1 className="text-5xl font-bold">
                        <span>Furni</span>
                        <span className="text-[#4977EE]">Flex</span>
                    </h1>
                    <span className="font-light text-center text-white">
                        Discover a seamless shopping experience with our curated collection of products.
                    </span>
                </div>
                <Image
                    src="/assets/images/chris-lee-70l1tDAI6rM-unsplash 1.svg"
                    alt="Background"
                    className="max-w-full max-h-full object-cover"
                    width={1080}
                    height={1080}
                />
            </div>
        </div>
    );
};

export default ForgotPassword;
