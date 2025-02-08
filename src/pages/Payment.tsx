import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { getServices } from "../redux/slices/serviceSlice";
import { makeTransaction } from "../redux/slices/transactionSlice";
import { Button } from "../components/atoms/Button";

const Payment: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { services, banners, loading, error } = useSelector((state: RootState) => state.home);
  const { success, loading: transactionLoading } = useSelector((state: RootState) => state.transaction);

  const [selectedService, setSelectedService] = useState<number | null>(null);

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  const handlePayment = () => {
    if (!selectedService) {
      alert("Silakan pilih layanan terlebih dahulu.");
      return;
    }
    dispatch(makeTransaction(selectedService));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pilih Layanan</h1>

      {loading ? (
        <p>Memuat layanan...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="space-y-4">
          {services.map((service: any) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service.id)}
              className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                selectedService === service.id ? "bg-gray-100 border-blue-500" : "border-gray-300"
              }`}
            >
              <div>
                <p className="font-bold">{service.name}</p>
                <p className="text-sm text-gray-500">Rp{service.price.toLocaleString("id-ID")}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        <Button
          text={transactionLoading ? "Memproses..." : "Bayar Sekarang"}
          onClick={handlePayment}
          disabled={transactionLoading}
        />
      </div>

      {success && <p className="text-green-500 mt-4">Pembayaran berhasil!</p>}
    </div>
  );
};

export default Payment;
