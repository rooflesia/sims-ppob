import React, { useState } from "react";
import { Button } from "../atoms/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { makeTransaction } from "../../redux/slices/transactionSlice";
import Input from "../atoms/Input";
import { CreditCardIcon } from "@heroicons/react/24/solid";

interface ServiceDetailProps {
  service: any;
  onBack: () => void;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ service, onBack }) => {
    const dispatch = useDispatch<AppDispatch>();
  const { loading, success, error } = useSelector((state: RootState) => state.transaction);
  const [amount, setAmount] = useState<number>(service.service_tariff);

  const handleSubmit = () => {
    if (amount < 10000 || amount > 1000000) {
        alert("Nominal pembayaran harus antara 10.000 dan 1.000.000");
        return;
      }
  
      dispatch(makeTransaction(service.service_code));
  };

  return (
    <div>
      <Button text="Kembali" onClick={onBack} className="text-blue-500 underline mb-4"/>
      <h1 className="text-2xl font-bold mb-4">Pembayaran</h1>
      <div className="mb-4 flex items-center">
        <img src={service.service_icon} alt={service.service_name} className="w-5 h-5 mr-4" />
        <h2 className="text-xl font-semibold">{service.service_name}</h2>
      </div>
      <Input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        iconLeft={<CreditCardIcon className="size-5 ml-2" />}
        className="mb-4"
      />
      <Button
        text={loading ? "Memproses..." : "Bayar"}
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
      />

      {success && <p className="text-green-500 mt-4">Pembayaran berhasil!</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default ServiceDetail;
