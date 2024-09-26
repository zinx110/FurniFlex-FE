"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { User } from "../../../types/User";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
    const { user, setUser } = useAuth();
    const route = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string[]>([]);

    useEffect(() => {
        if (user) {
            route.push("/");
        }
    }, [user]);
    function validate(): boolean {
        let errs: string[] = [];
        if (!email) {
            errs.push("Email is required");
        }
        if (!password) {
            errs.push("Password is required");
        }
        if (errs.length > 0) {
            setError(errs);
            return true; // There are errors
        }
        setError([]); // Clear previous errors if the form is valid
        return false; // No errors
    }
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (validate()) return;

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/Auth/Login`,
                {
                    Email: email,
                    Password: password,
                }
            );

            if (response.status === 200) {
                const data = response.data;
                console.log(data);
                const AuthToken = data.AuthToken;

                if (!data) return;
                const userData = {
                    UserId: data.UserId,
                    Email: data.Email,
                    FirstName: data.FirstName,
                    LastName: data.LastName,
                    Location: data.Location || "",
                    Phone: data.Phone || "",
                    // @ts-ignore
                    ProfilePictureUrl: data.ProfilePicture || "",
                    CartItems: data.CartItems || [],
                    Orders: data.Orders || [],
                    Reviews: data.Reviews || [],
                    RoleId: data.RoleId,
                    Role: data.Role,
                    AuthToken: AuthToken,
                };
                await localStorage.setItem("furniflex-userToken", AuthToken);
                setUser(userData); // Set user in the auth context
            } else {
                setError(["Failed to log in. Please try again."]);
            }
        } catch (err: any) {
            if (err?.message === "Request failed with status code 404") {
                setError(["User is not registered"]);
                return;
            }
            if (err?.message === "Request failed with status code 401") {
                setError(["Wrong Password"]);
                return;
            }
            if (
                err.response &&
                err.response.data &&
                err.response.data.Message
            ) {
                const errMessage = err.response.data.Message;
                if (errMessage === "The request is invalid.") {
                    setError(["Invalid Request"]);
                } else {
                    setError([err.response.data.Message]);
                }
            } else {
                setError(["An error occurred while logging in."]);
            }
            console.log("err", err);
        }
    }

    return (
        <div className="base flex h-lvh">
            <div className="loginField bg-white w-1/2 flex items-center justify-center overflow-hidden">
                <div className="login-form text-black">
                    <div className="heading-text flex flex-col items-start gap-2">
                        <h3 className="text-[32px]">Welcome Back!</h3>
                        <span className="text-[#707070] font-light -mt-2">
                            Enter your credentials to access your account
                        </span>
                    </div>
                    <div className="input-fields flex flex-col mt-[1.2rem] gap-4">
                        <div className="flex flex-col w-[451px] h-[52px] border rounded-md p-1 pl-2">
                            <span className="text-[#707070] text-[12px]">
                                Email address
                            </span>
                            <input
                                type="text"
                                className="w-full focus:outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col w-[451px] h-[52px] border rounded-md p-1 pl-2">
                            <span className="text-[#707070] text-[12px]">
                                Password
                            </span>
                            <input
                                type="password"
                                className="w-full focus:outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end text-[14px] -mt-2 text-[#1E99F5]">
                            <Link href="/forgot-password">
                                Forgot Password?
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" name="" id="" />
                            <span className="text-[14px] ml-2">
                                I agree to the{" "}
                                <Link href="#" className="underline">
                                    Terms & Policy
                                </Link>
                            </span>
                        </div>
                        <div>
                            <button
                                onClick={handleSubmit}
                                className="w-[451px] h-[56px] border rounded-md p-1 pl-2 font-semibold bg-black text-white"
                            >
                                Login
                            </button>
                        </div>
                        {error.length > 0 && (
                            <div className="text-red-500 mt-4">
                                {error.map((errMsg, index) => (
                                    <p key={index}>{errMsg}</p>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="others mt-[1rem]">
                        <div className="flex items-center justify-center">
                            <span className="bg-[#F1F0F0] h-[0.05rem] overflow-hidden mt-1 w-[40%]">
                                .
                            </span>
                            <span>or</span>
                            <span className="bg-[#F1F0F0] h-[0.05rem] overflow-hidden mt-1 w-[40%]">
                                .
                            </span>
                        </div>
                        <div className="flex gap-3 mt-3">
                            <button className="flex items-center justify-center w-[219px] h-[52px] border rounded-md p-1 pl-2">
                                <Image
                                    className="w-[24px] h-[24px]"
                                    src="/assets/icons/icons8-google 1.svg"
                                    alt="Google Icon"
                                    width={24}
                                    height={24}
                                />
                                <span className="text-[12px] pl-2">
                                    Sign in with Google
                                </span>
                            </button>
                            <button className="flex items-center justify-center w-[219px] h-[52px] border rounded-md p-1 pl-2">
                                <Image
                                    className="w-[24px] h-[24px]"
                                    src="/assets/icons/icons8-apple-logo 1.svg"
                                    alt="Apple Icon"
                                    width={24}
                                    height={24}
                                />
                                <span className="text-[12px] pl-2">
                                    Sign in with Apple
                                </span>
                            </button>
                        </div>
                        <div className="flex items-center justify-center mt-5">
                            <span>
                                Don&apos;t have an account?{" "}
                                <Link
                                    href="/auth/signup"
                                    className="text-[#0F3DDE]"
                                >
                                    Signup
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative ImageField w-1/2 flex items-center justify-center overflow-hidden">
                <div className="absolute flex flex-col items-center gap-2 w-[445px]">
                    <div className="flex items-center justify-center bg-[#1E99F5] w-[85px] h-[85px] rounded-full">
                        <span className="text-[36px] text-black font-serif">
                            F
                        </span>
                    </div>
                    <h1 className="text-5xl font-bold">
                        <span>Furni</span>
                        <span className="text-[#4977EE]">Flex</span>
                    </h1>
                    <span className="font-light text-center">
                        Discover a seamless shopping experience with our curated
                        collection of products. From fashion to electronics, we
                        bring quality.
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

export default Login;
