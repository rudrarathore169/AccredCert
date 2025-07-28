import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ServiceCard from "@/components/ui/service-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Service } from "@shared/schema";

export default function Services() {
  const [selectedCountry, setSelectedCountry] = useState("USA");

  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ["/api/services", selectedCountry],
    enabled: !!selectedCountry,
  });

  const countries = [
    { code: "USA", name: "United States" },
    { code: "India", name: "India" },
    { code: "Global", name: "Global Services" },
  ];

  // Mock services data for demonstration since we don't have seeded data
  const mockServices = {
    USA: [
      {
        id: "1",
        title: "US FDA Registration For Food, Beverages and Supplements",
        description: "Complete FDA facility registration and food product compliance for U.S. market entry.",
        country: "USA",
        category: "FDA Compliance",
        imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "2",
        title: "US FDA Registration For Cosmetics (MoCRA)",
        description: "Navigate the new MoCRA requirements for cosmetic product registration and compliance.",
        country: "USA",
        category: "FDA Compliance",
        imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "3",
        title: "FSVP Agent",
        description: "Foreign Supplier Verification Program agent services for food importers.",
        country: "USA",
        category: "FDA Compliance",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "4",
        title: "US FDA Product Label Review",
        description: "Professional review and compliance verification for product labeling requirements.",
        country: "USA",
        category: "FDA Compliance",
        imageUrl: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "5",
        title: "US FDA Prior Notice",
        description: "Prior notification services for food shipments entering the United States.",
        country: "USA",
        category: "FDA Compliance",
        imageUrl: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "6",
        title: "US LLC Registration",
        description: "Complete business formation services for establishing your U.S. presence.",
        country: "USA",
        category: "Business Formation",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    India: [
      {
        id: "7",
        title: "FSSAI License",
        description: "Food Safety and Standards Authority of India licensing for food businesses.",
        country: "India",
        category: "Food Safety",
        imageUrl: "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "8",
        title: "IEC (Import Export Code)",
        description: "Essential registration for businesses engaged in import-export activities in India.",
        country: "India",
        category: "Import Export",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "9",
        title: "Business Registration",
        description: "Complete business formation and registration services in India.",
        country: "India",
        category: "Business Formation",
        imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    Global: [
      {
        id: "10",
        title: "International Compliance Consulting",
        description: "Global regulatory compliance solutions for international market expansion.",
        country: "Global",
        category: "Consulting",
        imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "11",
        title: "Product Testing & Certification",
        description: "Comprehensive testing and certification services for global market compliance.",
        country: "Global",
        category: "Testing",
        imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "12",
        title: "Quality Management Systems",
        description: "Implementation and certification of ISO and other quality management standards.",
        country: "Global",
        category: "Quality Management",
        imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  };

  // Use mock data for display
  const displayServices = mockServices[selectedCountry as keyof typeof mockServices] || [];

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
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="service-card">
                <Skeleton className="w-full h-48 rounded-t-xl" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">Error loading services. Please try again later.</p>
          </div>
        ) : displayServices.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No services available for {selectedCountry}.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-20 text-center bg-white rounded-2xl p-12 shadow-lg">
          <h2 className="text-3xl font-bold text-black mb-4">Need Custom Compliance Solutions?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Our experts can provide tailored compliance strategies for your specific business needs and regulatory requirements.
          </p>
          <Button size="lg" className="professional-button">
            Contact Our Experts
          </Button>
        </div>
      </div>
    </div>
  );
}
