import React, { useEffect, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { formatCurrency } from "../../utils/formatCurrency";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getBalance } from "../../redux/slices/homeSlice";

const BalanceCard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { balance, loading } = useSelector((state: RootState) => state.home);
  const [showBalance, setShowBalance] = useState(false);

  const handleToggleBalance = async () => {
    if (showBalance) {
      setShowBalance(false);
    } else {
      if (balance === null) {
        await dispatch(getBalance())
      }
      setShowBalance(true);
    }
  };

  useEffect(() => {
    dispatch(getBalance())
  }, [dispatch])


  return (
    <div className="p-6 bg-red-500 text-white rounded-lg shadow-md w-1/2">
      <h2 className="text-lg font-medium">Saldo anda</h2>
      <p className="text-2xl font-bold">
        {showBalance && balance !== null ? `${formatCurrency(Number(balance))}` : "Rp **********"}
      </p>
      <button
        onClick={handleToggleBalance}
        className="flex items-center text-sm mt-2"
        disabled={loading}
      >
        {loading ? "Memuat..." : showBalance ? "Tutup Saldo" : "Lihat Saldo"}
        {showBalance ? (
          <EyeSlashIcon className="size-5 ml-2" />
        ) : (
          <EyeIcon className="size-5 ml-2" />
        )}
      </button>
    </div>
  );
};

export default BalanceCard;
