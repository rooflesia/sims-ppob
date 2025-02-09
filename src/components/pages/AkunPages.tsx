import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Button } from "../atoms/Button";
import Input from "../atoms/Input";
import { AtSymbolIcon, UserIcon } from "@heroicons/react/24/solid";
import { editProfile, uploadAvatar } from "../../redux/slices/profileSlice";
import { RootState, AppDispatch } from "../../redux/store";
import { setActiveMenu } from "../../redux/slices/menuSlice";

const AkunPages: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { profile, loading } = useSelector((state: RootState) => state.profile);

  const [disabled, setDisabled] = useState(true);
  const [formData, setFormData] = useState({
    email: profile.email,
    first_name: profile.first_name,
    last_name: profile.last_name,
  });
  const [originalData, setOriginalData] = useState({
    email: profile.email,
    first_name: profile.first_name,
    last_name: profile.last_name,
  });

  useEffect(() => {
    setFormData({
      email: profile.email,
      first_name: profile.first_name,
      last_name: profile.last_name,
    });
    setOriginalData({
      email: profile.email,
      first_name: profile.first_name,
      last_name: profile.last_name,
    });
  }, [profile]);

  const handleLogout = () => {
    toast.success("Logout berhasil!", { position: "top-right" });
    localStorage.removeItem("token");
    setActiveMenu("Home")
    navigate("/login");
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const maxFileSize = 100 * 1024;
    if (file) {
      if (file.size > maxFileSize) {
        toast.error("Ukuran gambar maksimal 100KB!", { position: "top-right" });
        return;
      }

      try {
        await dispatch(uploadAvatar(file));
        toast.success("Foto profil berhasil diperbarui!", { position: "top-right" });
      } catch {
        toast.error("Gagal memperbarui foto profil. Silakan coba lagi.");
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditProfile = async () => {
    try {
      await dispatch(editProfile({ first_name: formData.first_name, last_name: formData.last_name }));
      toast.success("Profil berhasil diperbarui!", { position: "top-right" });
      setOriginalData(formData);
      setDisabled(true);
    } catch {
      toast.error("Gagal memperbarui profil. Silakan coba lagi.");
    }
  };

  const handleCancelEdit = () => {
    setFormData(originalData);
    setDisabled(true);
  };

  console.log(profile !== null ? profile?.profile_image.split(/\/(?=[^\/]+$)/)[1] !== "null" ? profile?.profile_image : "/profile_photo.png" : "/profile_photo.png")

  return (
    <div className="p-6">
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <img
            src={profile !== null ? profile?.profile_image.split(/\/(?=[^\/]+$)/)[1] !== "null" ? profile?.profile_image : "/profile_photo.png" : "/profile_photo.png"}
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
        <h2 className="text-xl font-bold mt-4">{`${originalData.first_name} ${originalData.last_name}`}</h2>
      </div>
    
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm mb-2">Email</label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled
            iconLeft={<AtSymbolIcon className="w-4 h-4" />}
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm mb-2">Nama Depan</label>
          <Input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            disabled={disabled}
            iconLeft={<UserIcon className="w-4 h-4" />}
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm mb-2">Nama Belakang</label>
          <Input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            disabled={disabled}
            iconLeft={<UserIcon className="w-4 h-4" />}
          />
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {disabled ? (
          <>
            <Button variant="outline" text={"Edit Profile"} onClick={() => setDisabled(false)} />
            <Button text="Logout" onClick={handleLogout} />
          </>
        ) : (
          <>
            <Button text={loading ? "Memproses..." : "Simpan"} onClick={handleEditProfile} />
            <Button variant="outline" text="Cancel" onClick={handleCancelEdit} />
          </>
        )}
      </div>
    </div>
  );
};

export default AkunPages;
