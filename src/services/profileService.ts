import api, { get } from "../config/api";

// Fetch Profile
export const getProfile = async () => {
  const response = await get("/profile");
  return response.data;
};

// Fetch Balance
export const getBalance = async () => {
  const response = await get("/balance");
  return response.data;
};

export const updateProfileData = async (profileData: { first_name: string; last_name: string }) => {
  try {
    const response = await api.put("/profile/update", profileData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to update profile data:", error);
    throw error;
  }
};

export const uploadProfileImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.put("/profile/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to upload profile image:", error);
    throw error;
  }
};