"use client";
import { React, useState, useEffect } from "react";
import axios from "axios"; // Ensure axios is imported
import Image from "next/image";

const ProfileForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null); // To store file data for POST request
  const [userData, setUserData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    phone: "",
    location: "",
    ProfilePicture: "", // URL for the profile image
  });
  const [errors, setErrors] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
  });

  // Simulate fetching user info by ID
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("https://localhost:44344/api/users/1");
        const data = response.data;
        setUserData({
          FirstName: data.FirstName,
          LastName: data.LastName,
          Email: data.Email,
          phone: data.phone,
          location: data.location,
          ProfilePicture: data.ProfilePictureUrl, // Already has full URL
        });
        console.log(data.ProfilePictureUrl);
        setSelectedImage(data.ProfilePictureUrl); // Set image from API data
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
      setImageFile(file); // Store the file for uploading in the PUT request
    }
  };

  // Validate required fields
  const validateFields = () => {
    let valid = true;
    let newErrors = { FirstName: "", LastName: "", Email: "" };

    if (!userData.FirstName) {
      newErrors.FirstName = "First Name is required.";
      valid = false;
    }
    if (!userData.LastName) {
      newErrors.LastName = "Last Name is required.";
      valid = false;
    }
    if (!userData.Email) {
      newErrors.Email = "Email is required.";
      valid = false;
    }
    // Validate email
    if (!userData.Email) {
      newErrors.Email = "Email is required.";
      valid = false;
    } else {
      // Email format validation with regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.Email)) {
        newErrors.Email = "Invalid email format.";
        valid = false;
      }
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
      formData.append("FirstName", userData.FirstName);
      formData.append("LastName", userData.LastName);
      formData.append("Email", userData.Email);
      formData.append("phone", userData.phone);
      formData.append("location", userData.location);

      // Append image file only if it's been changed
      if (imageFile) {
        formData.append("ProfilePicture", imageFile);
      } else {
        formData.append("ProfilePicture", userData.ProfilePicture); // Retain the existing image URL
      }

      // PUT request using axios
      const response = await axios.put(
        "https://localhost:44344/api/users/1",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 204) {
        console.log("Changes saved successfully!");
      } else {
        console.error("Failed to save changes");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  return (
    <div className="profile-form w-1/2 bg-[#e9eae9] h-1/2 rounded-lg p-10 flex flex-col gap-3">
      <div className="img&Email">
        <div className="flex items-center gap-2 text-black">
          <div className="img relative">
            <img
              src={selectedImage || "/assets/icons/Account.svg"} // Default image
              alt="Profile Image"
              width={1000}
              height={1000}
              className="h-[100px] w-[100px] rounded-full object-cover"
            />
          </div>
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
              {userData.FirstName} {userData.LastName}
            </span>
            <span className="text-[#6B7280] text-[14px]">{userData.Email}</span>
          </div>
        </div>
      </div>
      <hr className="border-gray-500 border-t-[0.1px] mt-2" />
      <div className="middle-info text-[#1F2937] font-medium text-[16px] flex flex-col gap-7 mt-2">
        {/* First Name Field */}
        <div className="w-full bg-white/10 flex justify-between h-10 items-center rounded-lg p-2">
          <span>First Name</span>
          <input
            type="text"
            className="bg-slate-400/20 text-gray-500 p-2 focus:outline-none"
            value={userData.FirstName}
            onChange={(e) =>
              setUserData({ ...userData, FirstName: e.target.value })
            }
          />
        </div>
        {errors.FirstName && (
          <span className="text-red-500 ml-2">{errors.FirstName}</span>
        )}
        <hr className="border-gray-500 border-t-[0.1px]" />
        {/* Last Name Field */}
        <div className="w-full bg-white/10 flex justify-between h-10 items-center rounded-lg p-2">
          <span>Last Name</span>
          <input
            type="text"
            className="bg-slate-400/20 text-gray-500 p-2 focus:outline-none"
            value={userData.LastName}
            onChange={(e) =>
              setUserData({ ...userData, LastName: e.target.value })
            }
          />
        </div>
        {errors.LastName && (
          <span className="text-red-500 ml-2">{errors.LastName}</span>
        )}
        <hr className="border-gray-500 border-t-[0.1px]" />
        {/* Email Field */}
        <div className="w-full bg-white/10 flex justify-between h-10 items-center rounded-lg p-2">
          <span>Email</span>
          <input
            type="text"
            className="bg-slate-400/20 text-gray-500 p-2 focus:outline-none"
            value={userData.Email}
            onChange={(e) =>
              setUserData({ ...userData, Email: e.target.value })
            }
          />
        </div>
        {errors.Email && (
          <span className="text-red-500 ml-2">{errors.Email}</span>
        )}
        <hr className="border-gray-500 border-t-[0.1px]" />
        {/* Phone Number Field */}
        <div className="w-full bg-white/10 flex justify-between h-10 items-center rounded-lg p-2">
          <span>Mobile number</span>
          <input
            type="text"
            className="bg-slate-400/20 text-gray-500 p-2 focus:outline-none w-auto"
            value={userData.phone}
            onChange={(e) =>
              setUserData({ ...userData, phone: e.target.value })
            }
          />
        </div>
        <hr className="border-gray-500 border-t-[0.1px]" />
        {/* Location Field */}
        <div className="w-full bg-white/10 flex justify-between items-center rounded-lg p-2">
          <span>Location</span>
          <input
            type="text"
            className="bg-slate-400/20 text-gray-500 p-2 focus:outline-none w-1/2"
            value={userData.location}
            onChange={(e) =>
              setUserData({ ...userData, location: e.target.value })
            }
          />
        </div>
        <hr className="border-gray-500 border-t-[0.1px]" />
      </div>
      <div className="flex justify-center mt-5">
        <button
          onClick={handleSaveChanges}
          className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;
