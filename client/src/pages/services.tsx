import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ui/service-card";
import { AppContext } from "@/Context";
import { useNavigate } from 'react-router-dom';

export default function Services()  {
  const [selectedCountry, setSelectedCountry] = useState("USA");
  const { services } = useContext(AppContext);
  const navigate = useNavigate();

  const countries = [
    { code: "USA", name: "United States" },
    { code: "India", name: "India" },
    { code: "Global", name: "Global Services" },
  ];

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-black mb-4">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive FDA compliance and regulatory services tailored to your business needs across multiple regions.
          </p>
        </div>

        {/* Country Selector */}
        <div className="mb-12">
          <div className="flex justify-center">
            <div className="bg-white rounded-lg shadow-lg p-2 inline-flex">
              {countries.map((country) => (
                <Button
                  key={country.code}
                  onClick={() => setSelectedCountry(country.code)}
                  variant={selectedCountry === country.code ? "default" : "ghost"}
                  className={
                    selectedCountry === country.code
                      ? "bg-black text-white"
                      : "text-gray-600 hover:text-black"
                  }
                >
                  {country.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {
        services
  .filter(service => service.country.toLowerCase() === selectedCountry.toLowerCase())
  .map(service => <ServiceCard key={service._id} service={service} />)
  }
        </div>

        {/* Contact CTA */}
        <div className="mt-20 text-center bg-white rounded-2xl p-12 shadow-lg">
          <h2 className="text-3xl font-bold text-black mb-4">Need Custom Compliance Solutions?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Our experts can provide tailored compliance strategies for your specific business needs and regulatory requirements.
          </p>
          <Button onClick={() => navigate('/contact')} size="lg" className="professional-button">
            Contact Our Experts
          </Button>
        </div>
      </div>
    </div>
  );
}
