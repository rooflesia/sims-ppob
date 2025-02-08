import React from "react";

interface ServiceListProps {
  services: any[];
  loading: boolean;
  error: string | null;
  onServiceSelect: (service: any) => void;
}

const ServiceList: React.FC<ServiceListProps> = ({ services, loading, error, onServiceSelect }) => {

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-5 gap-4">
      {services.map((service) => (
        <button
          key={service.service_code}
          className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-100"
          onClick={() => onServiceSelect(service)}
        >
          <img src={service.service_icon} alt={service.service_name} className="w-12 h-12 mb-2" />
          <p className="text-sm text-gray-700">{service.service_name}</p>
        </button>
      ))}
    </div>
  );
};

export default ServiceList;
