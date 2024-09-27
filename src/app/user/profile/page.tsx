import React from "react";
import ProfileForm from "./components/ProfileForm";
import Sidebar from "./components/Sidebar";

const Profile = () => {
    return (
        <div className="h-full  bg-white lg:px-[120px] flex  py-[50px] gap-5 lg:gap-[3rem] justify-center">
            <Sidebar />
            <ProfileForm />
        </div>
    );
};

export default Profile;
