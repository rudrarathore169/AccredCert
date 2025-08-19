import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import FileUpload from "@/components/ui/file-upload";
import { MapPin, Phone, Mail } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  subject: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const contactMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch("http://localhost:3000/user/contact", {
        method: "POST",
        body: formData, // Direct FormData
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent Successfully",
        description: "Thank you for your message! We will get back to you soon.",
      });
      reset();
    },
    onError: (error) => {
      console.log(error)
      toast({
        title: "Failed to Send Message",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("subject", data.subject || "");
    formData.append("message", data.message);

    if (uploadedFile) {
      formData.append("file", uploadedFile);
    }

    contactMutation.mutate(formData);
  };

  const handleUploadSuccess = (file: File) => {
    setUploadedFile(file);
    toast({
      title: "File Uploaded",
      description: `${file.name} has been added to your message.`,
    });
  };

  return (
    <div className="min-h-screen py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-black mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">
            Don't hesitate to reach out to us!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-black mb-8">Get In Touch</h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <MapPin className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-1">Our Location</h3>
                  <p className="text-gray-600">
                    2105 Vista Oeste St NW,<br />
                    Suite E - 1080<br />
                    Albuquerque, NM 87120
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <Phone className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-1">Phone</h3>
                  <p className="text-gray-600">+1 (646) 974-6735</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-1">Email</h3>
                  <p className="text-gray-600">info@accredcert.com</p>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-xl overflow-hidden shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3265.0985775437773!2d-106.71659992500493!3d35.15166607260616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8718515b66db2b75%3A0x7e8c6c1c8c8c8c8c!2s2105%20Vista%20Oeste%20St%20NW%2C%20Albuquerque%2C%20NM%2087120%2C%20USA!5e0!3m2!1sen!2sus!4v1624567890123" 
                width="100%" 
                height="300" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="AccredCert Office Location - 2105 Vista Oeste St NW, Albuquerque, NM"
              />
            </div>
          </div>

          {/* Contact Form and File Upload */}
          <div className="space-y-8">
            {/* Contact Form */}
            <Card className="bg-gray-50 border border-gray-100">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-black mb-6">Send us a Message</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="block text-sm font-semibold text-black mb-2">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      {...register("name")}
                      className="professional-input"
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email" className="block text-sm font-semibold text-black mb-2">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      className="professional-input"
                      placeholder="Your email address"
                    />
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="subject" className="block text-sm font-semibold text-black mb-2">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      {...register("subject")}
                      className="professional-input"
                      placeholder="Message subject"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="block text-sm font-semibold text-black mb-2">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      {...register("message")}
                      rows={5}
                      className="professional-input resize-none"
                      placeholder="Your message"
                    />
                    {errors.message && (
                      <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  {/* File Upload Portal */}
             <Card className="bg-gray-50 border border-gray-100">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-black mb-6">Client Document Upload</h3>
                <p className="text-gray-600 mb-6">
                  Upload your documents securely for processing. Our team will review them and get back to you.
                </p>
                <FileUpload onFileSelect={(file) => setUploadedFile(file)} />
              </CardContent>
            </Card>

                  <Button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="w-full professional-button"
                  >
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            
          </div>
        </div>

        {/* Business Hours */}
        <div className="mt-16">
          <Card className="bg-gray-50 border border-gray-100">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-black mb-6">Business Hours</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-600">
                <div>
                  <h4 className="font-semibold text-black mb-2">Monday - Friday</h4>
                  <p>9:00 AM - 6:00 PM EST</p>
                </div>
                <div>
                  <h4 className="font-semibold text-black mb-2">Saturday</h4>
                  <p>10:00 AM - 4:00 PM EST</p>
                </div>
                <div>
                  <h4 className="font-semibold text-black mb-2">Sunday</h4>
                  <p>Closed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
