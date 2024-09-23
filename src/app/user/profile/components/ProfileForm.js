"use client";
import { React, useState, useEffect } from "react";
import Image from "next/image";

const ProfileForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null); // To store file data for POST request
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    profileImage: "", // URL for the profile image
  });
  const [errors, setErrors] = useState({ name: "", email: "" }); // To store validation errors

  // Simulate fetching user info by ID
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("https://fakeapi.com/user/123"); // Simulated API GET request
        const data = await response.json();
        setUserData({
          name: data.name,
          email: data.email,
          phone: data.phone,
          location: data.location,
          profileImage: data.profileImage, // Assume API returns a profile image URL
        });
        setSelectedImage(data.profileImage); // Set image from API data
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserInfo();
  }, []);

  // Handle image upload and preview
  const handleImgUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setSelectedImage(imgUrl);
      setImageFile(file); // Store the file for uploading in the POST request
    }
  };

  // Validate required fields
  const validateFields = () => {
    let valid = true;
    let newErrors = { name: "", email: "" };

    if (!userData.name) {
      newErrors.name = "Name is required.";
      valid = false;
    }
    if (!userData.email) {
      newErrors.email = "Email is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle saving changes (including the uploaded image)
  const handleSaveChanges = async () => {
    // Validate fields before saving
    if (!validateFields()) {
      return; // Exit if validation fails
    }

    try {
      // Create a FormData object to include the image file for upload
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("phone", userData.phone);
      formData.append("location", userData.location);

      // Append image file only if it's been changed
      if (imageFile) {
        formData.append("profileImage", imageFile);
      } else {
        formData.append("profileImage", userData.profileImage); // Retain the existing image URL
      }

      const response = await fetch("https://fakeapi.com/user/123", {
        method: "POST", // Simulated POST request
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to save changes");
      }
      console.log("Changes saved successfully!");
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  return (
    <div className="profile-form w-1/2 bg-[#e9eae9] h-1/2 rounded-lg p-10 flex flex-col gap-3">
      <div className="img&email">
        <div className="flex items-center gap-2 text-black">
          <div className="img relative">
            <Image
              src={selectedImage || "/assets/icons/Account.svg"} // img from user data or default
              alt="Profile Image"
              width={1000}
              height={1000}
              className="h-[100px] w-[100px] rounded-full object-cover"
            />
          </div>
          {/* Edit button for image upload */}
          <label
            htmlFor="imgUpload"
            className="edit-btn w-[25px] h-[25px] bg-white rounded-full flex items-center justify-center translate-x-[4rem] translate-y-[2.5rem] absolute cursor-pointer"
          >
            <Image
              src="/assets/icons/edit.svg"
              className="w-[15px] h-[15px]"
              alt="edit-icon"
              width={1000}
              height={1000}
            />
            <input
              id="imgUpload"
              type="file"
              accept="image/*"
              onChange={handleImgUpload}
              className="hidden" // Hide the default file input
            />
          </label>
          <div className="flex flex-col">
            <span className="text-[#1F2937] font-medium text-[18px]">
              {userData.name}
            </span>
            <span className="text-[#6B7280] text-[14px]">{userData.email}</span>
          </div>
        </div>
      </div>
      <hr className="border-gray-500 border-t-[0.1px] mt-2" />
      <div className="middle-info text-[#1F2937] font-medium text-[16px] flex flex-col gap-7 mt-2">
        <div className="w-full bg-white/10 flex justify-between h-10 items-center rounded-lg p-2">
          <span>Name</span>
          <input
            type="text"
            className="bg-transparent text-gray-500 p-2 focus:outline-none"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
        </div>
          {errors.name && <span className="text-red-500 ml-2">{errors.name}</span>}
        <hr className="border-gray-500 border-t-[0.1px]" />
        <div className="w-full bg-white/10 flex justify-between h-10 items-center rounded-lg p-2">
          <span>Email account</span>
          <input
            type="text"
            className="bg-transparent text-gray-500 p-2 focus:outline-none"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
        </div>
          {errors.email && <span className="text-red-500 ml-2">{errors.email}</span>}
        <hr className="border-gray-500 border-t-[0.1px]" />
        <div className="w-full bg-white/10 flex justify-between h-10 items-center rounded-lg p-2">
          <span>Mobile number</span>
          <input
            type="text"
            className="bg-transparent text-gray-500 p-2 focus:outline-none w-auto"
            value={userData.phone}
            onChange={(e) =>
              setUserData({ ...userData, phone: e.target.value })
            }
          />
        </div>
        <hr className="border-gray-500 border-t-[0.1px]" />
        <div className="w-full bg-white/10 flex justify-between items-center rounded-lg p-2">
          <span>Location</span>
          <input
            type="text"
            className="bg-transparent text-gray-500 p-2 focus:outline-none w-1/2"
            value={userData.location}
            onChange={(e) =>
              setUserData({ ...userData, location: e.target.value })
            }
          />
        </div>
        <hr className="border-gray-500 border-t-[0.1px]" />
      </div>
      <div className="changes-btn mt-5 w-full flex justify-center p-3 text-[18px]">
        <button
          className="bg-[#2489FF] px-5 py-2 rounded-lg"
          onClick={handleSaveChanges} // Call the save function on click
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;
