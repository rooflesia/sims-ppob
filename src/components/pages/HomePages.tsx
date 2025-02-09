import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../redux/store";
import { getBanners, getServices } from "../../redux/slices/homeSlice";

import ServiceList from "../molecules/ServiceList";
import ServiceDetail from "../molecules/ServiceDetail";
import LoadingBar from "../atoms/LoadingBar";
import Card from "../atoms/Card";

const HomePages = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { services, banners, loading, error } = useSelector((state: RootState) => state.home);
  const [selectedService, setSelectedService] = useState<any>(null);

  const handleServiceSelect = (service: any) => {
    setSelectedService(service);
  };

  useEffect(() => {
    dispatch(getServices());
    dispatch(getBanners());
  }, [dispatch]);

  return (
        <>
          <LoadingBar loading={loading} />
          <div className="p-6">
            {loading && services.length === 0 ? (
              <p className="text-gray-500">Memuat layanan...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="p-6">
                {!selectedService ? (
                  <ServiceList services={services} loading={loading} error={error} onServiceSelect={handleServiceSelect} />
                ) : (
                  <ServiceDetail service={selectedService} onBack={() => setSelectedService(null)} />
                )}
              </div>
            )}

            <h1 className="text-2xl font-bold mt-8 mb-4">Temukan Promo Menarik</h1>
            {loading && banners.length === 0 ? (
              <p className="text-gray-500">Memuat banner...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
                {banners.map((banner: any) => (
                    <Card
                      key={banner.banner_name}
                      imageSrc={banner.banner_image}
                    />
                ))}
              </div>
            )}
          </div>
        </>
    )
};

export default HomePages;
