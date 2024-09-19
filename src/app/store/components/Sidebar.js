"use client";
import React, { useState } from "react";
const list = [
  {
    id: 1,
    name: "Rocking chair",
    Path: "#Footer",
  },
  {
    id: 2,
    name: "Side chair",
    Path: "#Header",
  },
  {
    id: 3,
    name: "Lounge chair",
    Path: "#Cart",
  },
];

const Sidebar = () => {
  const [selectedId, setSelectedId] = useState(1);
  return (
    <div className="flex flex-col gap-[12px] pt-[40px] w-[263px] h-[1000px] border-r">
      {list.map((item) => (
        <a
          key={item.id}
          onClick={() => setSelectedId(item.id)}
          href={item.Path}
          className={`flex items-center px-[24px] rounded-lg text-[22px] h-[53px] w-[231px] font-medium ${
            selectedId === item.id
              ? "bg-black text-white font-semibold"
              : "text-[#717171]  "
          }`}
        >
          {item.name}
        </a>
      ))}
    </div>
  );
};

export default Sidebar;
