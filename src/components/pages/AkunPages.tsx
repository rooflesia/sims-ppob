import React, { useEffect, useState } from "react";
import api from "../../config/api";
import { Button } from "../atoms/Button";
import Input from "../atoms/Input";
import { AtSymbolIcon, UserIcon } from "@heroicons/react/24/solid";
import { updateProfileData, uploadProfileImage } from "../../services/profileService";

interface ProfileProps {
  user: {
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
  onProfileUpdate: (updatedUser: { email: string; firstName: string; lastName: string; avatar: string }) => void;
}

const AkunPages: React.FC<ProfileProps> = ({ user, onProfileUpdate }) => {
  const [profileImage, setProfileImage] = useState(user?.avatar ?? "/profile_photo.png");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email,
    firstName: user?.firstName,
    lastName: user?.lastName,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await api.get("/profile");
        const { email, firstName, lastName, avatar } = response.data;
        setFormData({ email, firstName, lastName });
        setProfileImage(avatar);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setLoading(true);
        const response = await uploadProfileImage(file);
        setProfileImage(response.avatar);
        alert("Foto profil berhasil diperbarui!");
      } catch (error) {
        alert("Gagal memperbarui foto profil. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditProfile = async () => {
    try {
      setLoading(true);
      const updatedProfile = {
        first_name: formData.firstName,
        last_name: formData.lastName,
      };

      const response = await updateProfileData(updatedProfile);
      onProfileUpdate({
        ...formData,
        firstName: response.first_name,
        lastName: response.last_name,
        avatar: profileImage,
      });

      alert("Profil berhasil diperbarui!");
    } catch (error) {
      alert("Gagal memperbarui profil. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <img
            src={profileImage}
            alt="Avatar"
            className="w-24 h-24 rounded-full border shadow-md"
          />
          <label
            htmlFor="profileImage"
            className="absolute bottom-0 right-0 bg-white border p-1 rounded-full cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536M16.5 3a1.5 1.5 0 112.121 2.121l-10 10a4.5 4.5 0 01-2.121 1.061l-2.25.562.562-2.25a4.5 4.5 0 011.061-2.121l10-10z"
              />
            </svg>
          </label>
          <input
            id="profileImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
        <h2 className="text-xl font-bold mt-4">{`${formData.firstName} ${formData.lastName}`}</h2>
      </div>
    
      {/* Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm mb-2">Email</label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            iconLeft={<AtSymbolIcon className="w-4 h-4" />}
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm mb-2">Nama Depan</label>
          <Input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            iconLeft={<UserIcon className="w-4 h-4" />}
          />
        </div>
        <div> 
          <label className="block text-gray-700 text-sm mb-2">Nama Belakang</label>
          <Input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            iconLeft={<UserIcon className="w-4 h-4" />}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 space-y-4">
        <Button variant="outline" text={loading ? "Memproses..." : "Edit Profile"} onClick={handleEditProfile}/>
        <Button text="Logout" />
      </div>
    </div>
  );
};

export default AkunPages;
