'use client'
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Login = () => {
  const route = useRouter();

  const handleClick = () =>{
    route.push('../../store')
  }
  return (
    <div className="base flex h-lvh">
      <div className="loginField bg-white  w-1/2 flex items-center justify-center overflow-hidden">
        <div className="login-form text-black">
          <div className="heading-text  flex flex-col items-start gap-2">
            <h3 className="text-[32px] ">Welcome Back!</h3>
            <span className="text-[#707070] font-light -mt-2">
              Enter your Credentials to access your account
            </span>
          </div>
          <div className="input-fields flex flex-col mt-[1.2rem] gap-4 ">
            <div className=" flex flex-col w-[451px] h-[52px] border rounded-md p-1 pl-2  ">
              <span className="text-[#707070] text-[12px]">Email address</span>
              <input type="text" className="w-full focus:outline-none" />
            </div>
            <div className=" flex flex-col w-[451px] h-[52px] border rounded-md p-1 pl-2  ">
              <span className="text-[#707070] text-[12px]">Password</span>
              <input type="password" className="w-full focus:outline-none" />
            </div>
            <div className="flex justify-end text-[14px] -mt-2 text-[#1E99F5]">
              <a href="/">Forgot Password</a>
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
              <button onClick ={handleClick}  className="w-[451px] h-[56px] border rounded-md p-1 pl-2 font-semibold bg-black text-white  ">
                Login
              </button>
            </div>
          </div>
          <div className="others mt-[1rem] ">
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
              <button className=" flex items-center justify-center w-[219px] h-[52px] border rounded-md p-1 pl-2  ">
                <Image
                  className="w-[24px] h-[24px]"
                  src="/assets/icons/icons8-google 1.svg"
                  alt="alt"
                  width={1444}
                  height={1444}
                />
                <span className="text-[12px] pl-2">Sign in with Google</span>
              </button>
              <button className=" flex items-center justify-center w-[219px] h-[52px] border rounded-md p-1 pl-2  ">
                <Image
                  className="w-[24px] h-[24px]"
                  src="/assets/icons/icons8-apple-logo 1.svg"
                  alt="alt"
                  width={1444}
                  height={1444}
                />
                <span className="text-[12px] pl-2 pt-1">
                  Sign in with Apple
                </span>
              </button>
            </div>
            <div className="flex items-center justify-center mt-5">
              <span>
                Haven't an account?{" "}
                <a href="/" className="text-[#0F3DDE]">
                  Signup
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="relative ImageField  w-1/2 flex items-center justify-center overflow-hidden">
        <div className="absolute flex flex-col items-center gap-2 w-[445px]">
          <div className="flex items-center justify-center bg-[#1E99F5] w-[85px] h-[85px] rounded-full">
            <span className="text-[36px] text-black font-serif">F</span>
          </div>
          <h1 className="text-5xl font-bold ">
            <span>Furni</span>
            <span className="text-[#4977EE]">Flex</span>
          </h1>
          <span className="font-light text-center">
            Discover a seamless shopping experience with our curated collection
            of products. From fashion to electronics, we bring quality.
          </span>
        </div>
        <Image
          src="/assets/images/chris-lee-70l1tDAI6rM-unsplash 1.svg"
          alt="alt"
          className="max-w-full max-h-full object-cover "
          width={1080}
          height={1080}
        />
      </div>
    </div>
  );
};

export default Login;
