import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../atoms/Button";
import { AppDispatch, RootState } from "../../redux/store";
import { topUpBalance } from "../../redux/slices/topupSlice";
import Input from "../atoms/Input";
import { CreditCardIcon } from "@heroicons/react/24/solid";
import { getBalance } from "../../redux/slices/homeSlice";
import { toast } from "react-toastify";

const TopUpPages: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.topup);
  const [amount, setAmount] = useState<string>("");

  const isValidAmount = (value: string): boolean => {
    const numericValue = Number(value);
    return numericValue >= 10000 && numericValue <= 1000000;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handlePresetClick = (value: string) => {
    setAmount(value);
  };

  const handleSubmit = async () => {
    if (!amount || !isValidAmount(amount)) {
      toast.error("Masukkan nominal yang valid (Rp.10.000 - Rp.1.000.000)", {
        position: "top-right"
      });
      return;
    }
    await dispatch(topUpBalance(Number(amount)));
    await dispatch(getBalance());
    setAmount("");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-regular mb-1">Silahkan masukan</h1>
      <h1 className="text-2xl font-bold mb-4">Nominal Top Up</h1>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <Input
            type="number"
            value={amount}
            onChange={handleInputChange}
            iconLeft={<CreditCardIcon className="w-4 h-4" />}
            placeholder="Masukkan nominal Top-Up"
          />
          <div className="mt-6">
            <Button
              text={loading ? "Memproses..." : "Top Up"}
              onClick={handleSubmit}
              disabled={!isValidAmount(amount) || loading}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {["10000", "20000", "50000", "100000", "250000", "500000"].map((value) => (
            <button
              key={value}
              onClick={() => handlePresetClick(value)}
              className={`px-4 py-2 border rounded-lg text-gray-700 ${
                amount === value ? "bg-red-200" : "bg-white"
              } hover:bg-red-100`}
            >
              Rp{parseInt(value).toLocaleString("id-ID")}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
    </div>
  );
};

export default TopUpPages;
