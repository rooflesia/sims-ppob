import { useSelector } from "react-redux";

import useFetchProfile from "../hooks/useFetchProfile";

import Navbar from "../components/organisms/Navbar";
import BalanceCard from "../components/molecules/BalanceCard";

import AkunPages from "../components/pages/AkunPages";
import HomePages from "../components/pages/HomePages";
import TopUpPages from "../components/pages/TopupPages";
import TransactionPages from "../components/pages/TransactionPages";
import LoadingBar from "../components/atoms/LoadingBar";

const Dashboard = () => {
  const { profile, error, refetch } = useFetchProfile();
  const activeMenu = useSelector((state: any) => state.menu);
  const loading = useSelector((state: any) => state.transaction.loading || state.home.loading);
  
  const defaultProfile = {
    email: "",
    firstName: "",
    lastName: "",
    avatar: "/profile_photo.png",
  };

  const handleProfileUpdate = (updatedUser: any) => {
    console.log("User updated:", updatedUser);
  };
  
  return (
    <div className="p-6">
      <LoadingBar loading={loading} />
      <Navbar />
      {activeMenu !== "Akun" && (
        <div className="flex justify-between p-6 w-full">
          <div className="flex flex-col items-start space-x-4">
            <img
              src={profile?.avatar || "/profile_photo.png"}
              alt="User Avatar"
              className="w-12 h-12 rounded-full m-4"
            />
            <div>
              <p className="text-gray-600">Selamat datang,</p>
              <h2 className="text-xl font-bold">{profile?.firstName} {profile?.lastName}</h2>
            </div>
          </div>
          <BalanceCard />
        </div>
      )}
      

      {activeMenu === "Home" ? (
        <HomePages />
      ) : (activeMenu === "Top Up") ? (
        <TopUpPages />
      ) : (activeMenu === "Transaction") ? (
        <TransactionPages />
      ) : (<div>
        <AkunPages user={profile || defaultProfile} onProfileUpdate={handleProfileUpdate} />
      </div>)}
      
    </div>
  );
};

export default Dashboard;
