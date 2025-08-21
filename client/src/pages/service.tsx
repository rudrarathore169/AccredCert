// src/pages/service.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate,useLocation } from "react-router-dom";
import axios from "axios";
export default function Service() {  // ✅ default export
   const location = useLocation();
  const id = location.state;
  const navigate = useNavigate();
  const [service, setService] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/user/getservice/${id}`);
        setService(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchService();
  }, [id]);

  if (!service) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl overflow-hidden my-4">
      <img src={service.imageUrl} alt={service.title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h2>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <span className="bg-gray-200 rounded-full px-3 py-1">{service.category}</span>
          <span className="bg-gray-200 rounded-full px-3 py-1">{service.country}</span>
        </div>
        <p className="text-gray-700 mb-3">{service.description}</p>
        <p className={`text-sm font-medium ${service.isActive ? "text-green-600" : "text-yellow-600"}`}>
          {service.isActive ? "Active" : "Inactive"}
        </p>
        <div className="mt-3 text-xs text-gray-400">
          <p>Created: {new Date(service.createdAt).toLocaleDateString()}</p>
          <p>Updated: {new Date(service.updatedAt).toLocaleDateString()}</p>
        </div>
        <div className="p-4">
          <button
            onClick={() => navigate("/services")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-md"
          >
            ← Back to Services
          </button>
        </div>
      </div>
    </div>
  );
}
