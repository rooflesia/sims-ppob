import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { getBanners, getServices } from "../../redux/slices/homeSlice";
import ServiceList from "../molecules/ServiceList";
import ServiceDetail from "../molecules/ServiceDetail";
import LoadingBar from "../atoms/LoadingBar";

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

            {/* Banners */}
            {loading && banners.length === 0 ? (
              <p className="text-gray-500">Memuat banner...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="grid grid-cols-4 gap-4">
                {banners.map((banner: any) => (
                  <div
                    key={banner.id}
                    className="p-4 rounded-lg shadow-md"
                    style={{ backgroundColor: banner.backgroundColor }}
                  >
                    <h2 className="text-lg font-bold mb-2">{banner.title}</h2>
                    <p className="text-sm">{banner.description}</p>
                    <img src={banner.image} alt={banner.title} className="mt-2 rounded-lg" />
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* <section className="grid grid-cols-6 lg:grid-cols-12 mb-6">
            {[
              { title: "PBB", icon: "/PBB.png" },
              { title: "Listrik", icon: "/Listrik.png" },
              { title: "Pulsa", icon: "/Pulsa.png" },
              { title: "PDAM", icon: "/PDAM.png" },
              { title: "PGN", icon: "/PGN.png" },
              { title: "TV Langganan", icon: "/Televisi.png" },
              { title: "Musik", icon: "/Musik.png" },
              { title: "Voucher Game", icon: "/Game.png" },
              { title: "Voucher Makanan", icon: "/voucher_makanan.png" },
              { title: "Kurban", icon: "/Kurban.png" },
              { title: "Zakat", icon: "/Zakat.png" },
              { title: "Paket Data", icon: "/paket_data.png" },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center">
                <img src={item.icon} alt={item.title} className="w-12 h-12 mb-2 cursor-pointer" />
                <p className="text-sm">{item.title}</p>
              </div>
            ))}
          </section>
          <section>
            <h2 className="text-lg font-bold mb-4">Temukan promo menarik</h2>
            <div className="grid grid-cols-5 gap-4">
              <Card
                imageSrc="/banner_1.png"
              />
              <Card
                imageSrc="/banner_2.png"
              />
              <Card
                imageSrc="/banner_3.png"
              />
              <Card
                imageSrc="/banner_4.png"
              />
              <Card
                imageSrc="/banner_5.png"
              />
            </div>
          </section> */}
        </>
    )
};

export default HomePages;
