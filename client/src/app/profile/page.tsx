"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import { useProfileSubmit } from "./hooks/useProfileSubmit";
import { useProfileForm } from "./hooks/useProfileForm";
import { logout } from "@/store/auth/authThunks";

const EditProfile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const { formData, localImage, file, handleChange, handleAvatarChange } =
    useProfileForm(user);
  const { submitted, handleSubmit } = useProfileSubmit();

  if (!user) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="container mx-auto max-w-lg p-6 bg-white shadow-md rounded-lg mt-10 relative">
      <h2 className="text-2xl font-semibold text-center mb-4">Profile</h2>
      <button className="absolute text-red-600 right-[15] top-[15]" onClick={() => dispatch(logout())}>logout</button>
      <form
        onSubmit={(e) => handleSubmit(e, formData, file)}
        className="space-y-4"
      >
        <div className="flex cursor-pointer flex-col items-center">
          <div
            onClick={() => inputRef.current?.click()}
            className="w-24 h-24 rounded-lg object-cover bg-gray-500 flex items-center justify-center"
            style={{
              backgroundImage: localImage ? `url(${localImage})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full px-4 py-2 ${
            submitted ? "bg-green-500" : "bg-gray-500"
          } text-white rounded-md ${
            submitted ? "hover:bg-green-600" : "hover:bg-gray-600"
          }`}
        >
          {submitted ? "Updated ✓" : "Update User"}
        </button>
      </form>
      <Navbar />
    </div>
  );
};

export default EditProfile;