import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CertificateResultProps {
  result: {
    status: "valid" | "expired" | "not_found";
    certificate?: {
      certificateNumber: string;
      clientName: string;
      serviceType: string;
      issueDate: string;
      expiryDate: string;
      isExpired?: boolean;
    };
    message?: string;
  };
}

export default function CertificateResult({ result }: CertificateResultProps) {
  const getStatusIcon = () => {
    switch (result.status) {
      case "valid":
        return <CheckCircle className="w-12 h-12 text-green-600" />;
      case "expired":
        return <AlertCircle className="w-12 h-12 text-yellow-600" />;
      case "not_found":
        return <XCircle className="w-12 h-12 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (result.status) {
      case "valid":
        return "Certificate Valid";
      case "expired":
        return "Certificate Expired";
      case "not_found":
        return "Certificate Not Found";
      default:
        return "Unknown Status";
    }
  };

  const getStatusColor = () => {
    switch (result.status) {
      case "valid":
        return "text-green-600";
      case "expired":
        return "text-yellow-600";
      case "not_found":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Card className="mt-8 border border-gray-200 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          {getStatusIcon()}
          <div className="ml-4">
            <h3 className={`text-xl font-semibold ${getStatusColor()}`}>
              {getStatusText()}
            </h3>
            {result.certificate && (
              <p className="text-gray-600">
                Certificate {result.certificate.certificateNumber} {result.status === "valid" ? "is authentic and valid" : result.status === "expired" ? "has expired" : ""}
              </p>
            )}
            {result.message && !result.certificate && (
              <p className="text-gray-600">{result.message}</p>
            )}
          </div>
        </div>

        {result.certificate && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <span className="font-semibold text-black">Client Name:</span>
              <span className="text-gray-700 ml-2">{result.certificate.clientName}</span>
            </div>
            <div>
              <span className="font-semibold text-black">Service Type:</span>
              <span className="text-gray-700 ml-2">{result.certificate.serviceType}</span>
            </div>
            <div>
              <span className="font-semibold text-black">Issue Date:</span>
              <span className="text-gray-700 ml-2">
                {new Date(result.certificate.issueDate).toLocaleDateString()}
              </span>
            </div>
            <div>
              <span className="font-semibold text-black">Expiry Date:</span>
              <span className="text-gray-700 ml-2">
                {new Date(result.certificate.expiryDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
