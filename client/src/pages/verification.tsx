import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import CertificateResult from "@/components/ui/certificate-result";
import { Search } from "lucide-react";
import { AppContext } from "@/Context";
import { useToast } from "@/hooks/use-toast";

const verificationSchema = z.object({
  certificateNumber: z.string().min(1, "Certificate number is required"),
  clientName: z.string().optional(),
  clientEmail: z.string().email("Invalid email format").optional().or(z.literal("")),
});

type VerificationFormData = z.infer<typeof verificationSchema>;

export default function Verification() {
  const { certificates } = useContext(AppContext);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors } } = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema),
  });

  const onSubmit = (data: VerificationFormData) => {
    const found = certificates.find(cert => {
      const certNumMatch = cert.certificateNumber.toLowerCase() === data.certificateNumber.trim().toLowerCase();
      const nameMatch = !data.clientName || cert.customerName.toLowerCase() === data.clientName.trim().toLowerCase();
      const emailMatch = !data.clientEmail || cert.email.toLowerCase() === data.clientEmail.trim().toLowerCase();
      return certNumMatch && nameMatch && emailMatch;
    });

    if (found) {
      const isExpired = new Date(found.expiryDate) < new Date();
      setVerificationResult({
        status: isExpired ? "expired" : "valid",
        certificate: {
          certificateNumber: found.certificateNumber,
          clientName: found.customerName,
          serviceType: found.category,
          issueDate: found.issueDate,
          expiryDate: found.expiryDate,
        },
      });
    } else {
      setVerificationResult({
        status: "not_found",
        message: "The certificate number you entered could not be found or details do not match.",
      });
      toast({
        title: "Certificate Not Found",
        description: "The certificate number you entered could not be found or details do not match.",
        variant: "destructive",
      });
    }
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
                    placeholder="Enter email address"
                  />
                  {errors.clientEmail && (
                    <p className="text-red-600 text-sm mt-1">{errors.clientEmail.message}</p>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full flex items-center justify-center">
                <Search className="mr-2 h-4 w-4" />
                Verify Certificate
              </Button>
            </form>

            {/* Render certificate result */}
            {verificationResult && <CertificateResult result={verificationResult} />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
