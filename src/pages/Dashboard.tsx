import { useDispatch, useSelector } from "react-redux";

import Navbar from "../components/organisms/Navbar";
import BalanceCard from "../components/molecules/BalanceCard";

import AkunPages from "../components/pages/AkunPages";
import HomePages from "../components/pages/HomePages";
import TopUpPages from "../components/pages/TopupPages";
import TransactionPages from "../components/pages/TransactionPages";
import LoadingBar from "../components/atoms/LoadingBar";
import { useEffect } from "react";
import { getProfil } from "../redux/slices/profileSlice";
import { AppDispatch, RootState } from "../redux/store";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile } = useSelector((state: RootState) => state.profile);
  const activeMenu = useSelector((state: any) => state.menu);
  const loading = useSelector((state: any) => state.transaction.loading || state.home.loading || state.profile.loading);

  useEffect(() => {
    dispatch(getProfil());
  }, [dispatch]);

  return (
    <div className="p-6">
      <LoadingBar loading={loading} />
      <Navbar />
      {activeMenu !== "Akun" && (
        <div className="flex justify-between p-6 w-full">
          <div className="flex flex-col items-start space-x-4">
            <img
              src={profile !== null ? profile?.profile_image.split(/\/(?=[^\/]+$)/)[1] !== "null" ? profile?.profile_image : "/profile_photo.png" : "/profile_photo.png"}
              alt="User Avatar"
              className="w-12 h-12 rounded-full m-4"
            />
            <div>
              <p className="text-gray-600">Selamat datang,</p>
              <h2 className="text-xl font-bold">{profile?.first_name} {profile?.last_name}</h2>
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
        <AkunPages />
      </div>)}
      
    </div>
  );
};

export default Dashboard;
