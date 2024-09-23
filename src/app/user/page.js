import React from "react";
import ProfileForm from "./components/ProfileForm";
import Sidebar from "./components/Sidebar";

const Profile = () => {
  return (
    <div className='flex flex-row'>
      <Sidebar />
      <ProfileForm />
    </div>
  );
};

export default Profile;
