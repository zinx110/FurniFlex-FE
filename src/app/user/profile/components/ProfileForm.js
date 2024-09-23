import React from "react";
import Image from "next/image";
const ProfileForm = () => {
  return (
    <div className="profile-form w-1/2 bg-[#e9eae9] h-1/2  rounded-lg p-10 flex flex-col gap-3">
      <div className="img&email">
        <div className="flex items-center gap-2 text-black">
          <Image
            src="/assets/images/chris-lee-70l1tDAI6rM-unsplash 1.svg"
            alt="alt"
            width={1000}
            height={1000}
            className="h-[100px] w-[100px] min-h-5h-[100px] min-w-[100px] rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="text-[#1F2937] font-medium text-[18px]">
              Roman Howladar
            </span>
            <span className="text-[#6B7280] text-[14px]">roman@gmail.com</span>
          </div>
        </div>
      </div>
      <hr class="border-gray-500 border-t-[0.1px] mt-2" />
      <div className="middle-info text-[#1F2937] font-medium text-[16px] flex flex-col gap-7 mt-2">
        <div className="w-full bg-white/10 flex justify-between h-10 items-center rounded-lg p-2">
          <span>Name</span>
          <input
            type="text"
            className="bg-transparent  text-gray-500 p-2 focus:outline-none"
          />
        </div>
        <hr class="border-gray-500 border-t-[0.1px]" />
        <div className="w-full bg-white/10 flex justify-between h-10 items-center rounded-lg p-2">
          <span>Email account</span>
          <input
            type="text"
            className="bg-transparent  text-gray-500 p-2 focus:outline-none"
          />
        </div>
        <hr class="border-gray-500 border-t-[0.1px]" />
        <div className="w-full bg-white/10 flex justify-between h-10 items-center rounded-lg p-2 ">
          <span>Mobile number </span>
          <input
            type="text"
            className="bg-transparent  text-gray-500 p-2 focus:outline-none w-auto"
          />
        </div>
        <hr class="border-gray-500 border-t-[0.1px]" />
        <div className="w-full bg-white/10 flex justify-between items-center rounded-lg p-2">
          <span>Location</span>
          <input
            type="text"
            className="bg-transparent text-gray-500 p-2 focus:outline-none w-1/2"
          />
        </div>
        <hr class="border-gray-500 border-t-[0.1px]" />
      </div>
      <div className="changes-btn mt-5 w-full flex justify-center p-3 text-[18px]">
        <button className="bg-[#2489FF] px-5 py-2 rounded-lg">Save Changes</button>
      </div>
    </div>
  );
};

export default ProfileForm;
