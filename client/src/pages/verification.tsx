import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import CertificateResult from "@/components/ui/certificate-result";
import { Search } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const verificationSchema = z.object({
  certificateNumber: z.string().min(1, "Certificate number is required"),
  clientName: z.string().optional(),
  clientEmail: z.string().email("Invalid email format").optional().or(z.literal("")),
});

type VerificationFormData = z.infer<typeof verificationSchema>;

export default function Verification() {
  const [verificationResult, setVerificationResult] = useState(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema),
  });

  const verifyMutation = useMutation({
    mutationFn: async (data: VerificationFormData) => {
      const response = await apiRequest("POST", "/api/certificates/verify", {
        certificateNumber: data.certificateNumber,
        clientName: data.clientName || undefined,
        clientEmail: data.clientEmail || undefined,
      });
      return response.json();
    },
    onSuccess: (result) => {
      setVerificationResult(result);
      if (result.status === "not_found") {
        toast({
          title: "Certificate Not Found",
          description: "The certificate number you entered could not be found or the details do not match.",
          variant: "destructive",
        });
      }
    },
    onError: () => {
      toast({
        title: "Verification Failed",
        description: "There was an error verifying the certificate. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: VerificationFormData) => {
    verifyMutation.mutate(data);
  };

  return (
    <div className="min-h-screen py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">Certificate Verification</h1>
          <p className="text-xl text-gray-600">
            Verify the authenticity of certificates issued by AccredCert
          </p>
        </div>

        <Card className="bg-gray-50 border border-gray-100">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="certificateNumber" className="block text-sm font-semibold text-black mb-2">
                  Certificate Number *
                </Label>
                <Input
                  id="certificateNumber"
                  {...register("certificateNumber")}
                  className="professional-input"
                  placeholder="Enter certificate number"
                />
                {errors.certificateNumber && (
                  <p className="text-red-600 text-sm mt-1">{errors.certificateNumber.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="clientName" className="block text-sm font-semibold text-black mb-2">
                    Client Name (Optional)
                  </Label>
                  <Input
                    id="clientName"
                    {...register("clientName")}
                    className="professional-input"
                    placeholder="Enter client name"
                  />
                </div>
                <div>
                  <Label htmlFor="clientEmail" className="block text-sm font-semibold text-black mb-2">
                    Email (Optional)
                  </Label>
                  <Input
                    id="clientEmail"
                    type="email"
                    {...register("clientEmail")}
                    className="professional-input"
                    placeholder="Enter email address"
                  />
                  {errors.clientEmail && (
                    <p className="text-red-600 text-sm mt-1">{errors.clientEmail.message}</p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                disabled={verifyMutation.isPending}
                className="w-full professional-button"
              >
                <Search className="mr-2 h-4 w-4" />
                {verifyMutation.isPending ? "Verifying..." : "Verify Certificate"}
              </Button>
            </form>

            {verificationResult && (
              <CertificateResult result={verificationResult} />
            )}
          </CardContent>
        </Card>

        {/* Information Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border border-gray-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-black mb-3">How It Works</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Enter your certificate number in the field above</li>
                <li>• Optionally provide client name or email for additional verification</li>
                <li>• Click verify to check certificate authenticity and status</li>
                <li>• View detailed certificate information if found</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-black mb-3">Certificate Status</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <span className="text-green-600 font-medium">Valid:</span> Certificate is authentic and current</li>
                <li>• <span className="text-yellow-600 font-medium">Expired:</span> Certificate has passed its expiry date</li>
                <li>• <span className="text-red-600 font-medium">Not Found:</span> Certificate number not in our database</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
