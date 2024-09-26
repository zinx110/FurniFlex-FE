"use client";
import axios from "axios";
import local from "next/font/local";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { User } from "../../../types/User";
import { useAuth } from "../../contexts/AuthContext";
import CartItem from "../../store/cart/components/CartItem";
import Link from "next/link";

const Signup = () => {
    const { user, setUser } = useAuth();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string[]>([]);
    const router = useRouter();
    useEffect(() => {
        if (user) {
            router.push("/");
        }
    }, [user]);
    function validate(): boolean {
        let errs: string[] = [];
        if (!firstName) {
            errs.push("First name is required");
        }
        if (!lastName) {
            errs.push("Last name is required");
        }
        if (!email) {
            errs.push("Email is required");
        }
        if (!password) {
            errs.push("Password is required");
        }
        if (password !== confirmPassword) {
            errs.push("Passwords do not match");
        }
        if (errs.length > 0) {
            setError(errs);
            return true; // There are errors
        }
        setError([]); // Clear previous errors if the form is valid
        return false; // No errors
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault(); // Prevent page refresh on form submit
        if (validate()) return;

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/Auth/Register`,
                {
                    FirstName: firstName,
                    LastName: lastName,
                    Email: email,
                    Password: password,
                    // RoleId: 2,
                }
            );

            if (response.status === 201) {
                // Handle success (e.g., redirect to login or home page)
                const data = response.data;
                const AuthToken = data.AuthToken;

                if (!data) return;
                const userData: User = {
                    UserId: data.UserId,
                    Email: data.Email,
                    FirstName: data.FirstName,
                    LastName: data.LastName,
                    Location: "",
                    Phone: "",
                    ProfilePictureUrl: "",
                    CartItems: [],
                    Orders: [],
                    Reviews: [],
                    RoleId: data.RoleId,
                    Role: data.Role,
                    AuthToken: data.AuthToken,
                };
                await localStorage.setItem("furniflex-userToken", AuthToken);
                setUser(userData);
            } else {
                setError(["Failed to sign up. Please try again."]);
            }
        } catch (err: any) {
            // If the error contains a response from the server
            if (
                err.response &&
                err.response.data &&
                err.response.data.message
            ) {
                setError([err.response.data.message]);
            } else {
                setError(["An error occurred while signing up."]);
            }
            console.log("err", err);
        }
    }

    return (
        <div className="base flex h-lvh">
            <div className="relative ImageField w-1/2 flex items-center justify-center overflow-hidden">
                <div className="absolute flex flex-col items-center gap-2 w-[445px]">
                    <div className="flex items-center justify-center bg-[#1E99F5] w-[85px] h-[85px] rounded-full">
                        <span className="text-[36px] text-black font-serif italic">
                            F
                        </span>
                    </div>
                    <h1 className="text-5xl font-bold ">
                        <span className="text-white">Furni</span>
                        <span className="text-[#4977EE]">Flex</span>
                    </h1>
                    <span className="font-light text-center text-white">
                        Discover a seamless shopping experience with our curated
                        collection of products. From fashion to electronics, we
                        bring quality.
                    </span>
                </div>
                <Image
                    src="/assets/images/chris-lee-70l1tDAI6rM-unsplash 1.svg"
                    alt="alt"
                    className="max-w-full max-h-full object-cover"
                    width={1080}
                    height={1080}
                />
            </div>
            <div className="loginField bg-white  w-1/2 flex items-center justify-center overflow-hidden">
                <div className="login-form text-black">
                    <div className="heading-text  flex flex-col items-center gap-2">
                        <h3 className="text-2xl font-bold">Welcome To</h3>
                        <h1 className="text-5xl font-bold ">
                            <span>Furni</span>
                            <span className="text-[#4977EE]">Flex</span>
                        </h1>
                        <span className="text-[#707070] font-light -mt-2">
                            Signup for purchase your desire products
                        </span>
                    </div>
                    <div className="input-fields flex flex-col mt-[1.2rem] gap-4">
                        <div className="flex gap-3">
                            <div className="flex flex-col w-[219px] h-[52px] border rounded-md p-1 pl-2">
                                <span className="text-[#707070] text-[12px]">
                                    First name
                                </span>
                                <input
                                    type="text"
                                    className="w-full focus:outline-none"
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex flex-col w-[219px] h-[52px] border rounded-md p-1 pl-2">
                                <span className="text-[#707070] text-[12px]">
                                    Last name
                                </span>
                                <input
                                    type="text"
                                    className="w-full focus:outline-none"
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />
                            </div>
                        </div>
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
                        <div className="flex flex-col w-[451px] h-[52px] border rounded-md p-1 pl-2">
                            <span className="text-[#707070] text-[12px]">
                                Confirm Password
                            </span>
                            <input
                                type="password"
                                className="w-full focus:outline-none"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </div>

                        <div>
                            <input type="checkbox" name="" id="" />
                            <span className="text-[14px] ml-2">
                                I agree to the
                                <a href="" className="underline">
                                    {" "}
                                    Terms & Policy
                                </a>
                            </span>
                        </div>
                        <div>
                            <button
                                onClick={handleSubmit}
                                className="w-[451px] h-[56px] border rounded-md p-1 pl-2 font-semibold bg-black text-white"
                            >
                                Signup
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
                        <div className="flex items-center justify-center mt-5">
                            <span>
                                Have an account?{" "}
                                <Link
                                    href="/auth/login"
                                    className="text-[#0F3DDE]"
                                >
                                    Signin
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
