import React from "react";

interface CardProps {
  title?: string;
  description?: string;
  imageSrc?: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageSrc, className }) => {
  return (
    <div className={`rounded-lg shadow-md ${className}`}>
      {imageSrc && <img src={imageSrc} alt={title} className="w-full h-full mb-4 cursor-pointer" />}
      <h3 className="text-lg font-bold">{title}</h3>
      {description && <p className="text-sm text-gray-600 mt-2">{description}</p>}
    </div>
  );
};

export default Card;
