import { useState, useEffect } from "react";
import api from "../config/api";

interface Profile {
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

interface UseFetchProfile {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const useFetchProfile = (): UseFetchProfile => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get("/profile");
      setProfile(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    loading,
    error,
    refetch: fetchProfile,
  };
};

export default useFetchProfile;
