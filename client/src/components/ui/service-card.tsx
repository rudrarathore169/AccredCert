import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Service } from "@shared/schema";
import { useNavigate } from 'react-router-dom';
interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const navigate=useNavigate()
  return (
    <Card className="service-card">
      {service.imageUrl && (
        <img 
          src={service.imageUrl} 
          alt={service.title}
          className="w-full h-48 object-cover rounded-t-xl"
        />
      )}
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-black mb-2">{service.title}</h3>
        {/* <p className="text-gray-600 mb-4 line-clamp-3">{service.description}</p> */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {service.country}
          </span>
         
         <Button
  onClick={() => navigate('/service',{state:service._id})}
  className="professional-button"
>
  Learn More
</Button>

        </div>
      </CardContent>
    </Card>
  );
}
