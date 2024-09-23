import Sidebar from "./components/Sidebar";
import React from "react";
import ProfileForm from "./components/ProfileForm";

const Profile = () => {
  return (
    <div className="h-[1444px]  bg-white px-[120px] flex  py-[50px] gap-[3rem] justify-center">
      <Sidebar />
      <ProfileForm />
    </div>
  );
};

export default Profile;
