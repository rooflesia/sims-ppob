import React, { useState } from "react";
import { fetchBalance } from "../../services/balanceService";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { formatCurrency } from "../../utils/formatCurrency";

const BalanceCard: React.FC = () => {
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showBalance, setShowBalance] = useState(false);

  const handleToggleBalance = async () => {
    if (showBalance) {
      setShowBalance(false);
      setBalance(null);
    } else {
      try {
        setLoading(true);
        const response = await fetchBalance();
        setBalance(response.balance);
        setShowBalance(true);
      } catch (error) {
        alert("Gagal mengambil saldo. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    }
  };

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
