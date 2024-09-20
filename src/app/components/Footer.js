import React from "react";
import Image from "next/image";

const SocialInfo = [
  {
    id: 1,
    path: "/assets/socials/facebook-02.svg",
    link: "/",
  },
  {
    id: 2,
    path: "/assets/socials/instagram.svg",
    link: "/",
  },
  {
    id: 3,
    path: "/assets/socials/new-twitter.svg",
    link: "/",
  },
  {
    id: 4,
    path: "/assets/socials/linkedin-02.svg",
    link: "/",
  },
];

const Footer = () => {
  return (
    <div className="Footer flex flex-col h-[590px] text-white  px-[120px] pt-[80px] ">
      <div className="top-info sm:flex  justify-between">
        <div>
          <a href="/" className="logo flex gap-1">
            <div className="bg-[#1E99F5] h-[38px] min-h-[38px] w-[38px] min-w-[38px] flex items-center justify-center rounded-full  italic text-[24px]">
              <span className="text-black">f</span>
            </div>
            <div className="flex items-center text-[20px] font-bold ">
              <span className='text-black'>
                Furni<span className="text-[#1E99F5]">Flex</span>
              </span>
            </div>
          </a>
        </div>
        <div className="flex flex-col sm:flex-row gap-[120px] ">
          <div className="flex flex-col  text-[18px] gap-2 text-[#81859F]">
            <a href="" className="font-semibold text-white mb-[28px]">
              About US
            </a>
            <a href="">Master Plan</a>
            <a href="">Jobs</a>
            <a href="">Invest</a>
            <a href="">Pressroom</a>
            <a href="">Blog</a>
            <a href="">Contact</a>
          </div>
          <div className="flex flex-col  text-[18px] gap-2 text-[#81859F]">
            <a href="" className="font-semibold text-white mb-[28px]">
              Explore EEVE
            </a>
            <a href="">Unlock my Robot Power</a>
            <a href="">Starlight</a>
            <a href="">Robot Platform</a>
            <a href="">EEVE Roadmap</a>
          </div>
          <div className="flex flex-col  text-[18px] gap-2 text-[#81859F]">
            <a href="" className="font-semibold text-white mb-[28px]">
              Community & Support
            </a>
            <a href="">Willow X Community</a>
            <a href="">Developer & Maker Access</a>
            <a href="">Special Cases</a>
          </div>
        </div>
      </div>
      <div className="mt-[120px] mb-[40px]">
        <hr className="border-t-[0.01px] border-[#252948]" />
      </div>
      <div className="middel-social-info flex flex-col sm:flex-row  justify-between items-center ">
        <div className="socials-icons flex gap-2">
          {SocialInfo.map((item) => (
            <a key={item.id} href={item.link}>
              <Image
                className="w-[20px] h-[20px]"
                src={item.path}
                alt="alt"
                width={1440}
                height={1440}
              />
            </a>
          ))}
        </div>
        <div className="flex gap-10 font-medium text-[#81859F]">
          <a href="">March22 Recap</a>
          <a href="">Privacy Policy</a>
          <a href="">General Terms</a>
          <a href="">Contact</a>
        </div>
        <div className="text-[#81859F]">
          <span>🇺🇸 United States (English)</span>
        </div>
      </div>
      <div className="copy-rights flex text-[#323544] justify-center mt-[44px]">
        <span>EEVE © 2024. All rights reserved.</span>
      </div>
    </div>
  );
};

export default Footer;
