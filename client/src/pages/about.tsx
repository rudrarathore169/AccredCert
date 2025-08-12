import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Users, Globe, ChevronDown, ChevronUp } from "lucide-react";

export default function About() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is the role of an FDA agent, and why do I need one?",
      answer: "An FDA agent acts as a liaison between the FDA and foreign companies, ensuring compliance with U.S. regulations and facilitating communication for exports."
    },
    {
      question: "How does AccredCert help with global compliance?",
      answer: "AccredCert is a US FDA registered agent who helps companies through FDA regulations, product registration, labeling, and compliance to meet U.S. and global standards."
    },
    {
      question: "What industries does AccredCert provide FDA compliance services for?",
      answer: "AccredCert provides FDA compliance support across industries like pharmaceuticals, medical devices, food, cosmetics, and dietary supplements, helping manufacturers, distributors, and exporters meet U.S. market entry standards."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-black mb-4">About AccredCert</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted partner in global compliance and regulatory solutions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <img 
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
            alt="AccredCert team working on compliance solutions" 
            className="rounded-2xl shadow-lg w-full"
          />
          
          <div>
            <h2 className="text-3xl font-bold text-black mb-6">Company Mission & Vision</h2>
            <p className="text-gray-700 mb-6">
              AccredCert is a trusted & US Govt. certified FDA agent specializing in global compliance solutions. We help businesses navigate complex regulations, ensuring your products meet FDA standards for U.S. market entry.
            </p>
            <p className="text-gray-700 mb-6">
              Whether you're a manufacturer, distributor, or exporter, our expertise in product registration, labeling, and inspections ensures smooth compliance. With a focus on efficiency, we work closely with our clients to simplify regulatory processes, enabling them to expand internationally with confidence.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="bg-white border border-gray-100">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                  <div className="text-gray-600">Successful Registrations</div>
                </CardContent>
              </Card>
              <Card className="bg-white border border-gray-100">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                  <div className="text-gray-600">Countries Served</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-black text-center mb-12">Our Core Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white border border-gray-100">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-3">Excellence</h3>
                <p className="text-gray-600">
                  We maintain the highest standards in all our compliance services, ensuring accuracy and reliability in every project.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-100">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-3">Client Focus</h3>
                <p className="text-gray-600">
                  Our clients' success is our priority. We provide personalized solutions tailored to each business's unique needs.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-100">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-3">Global Reach</h3>
                <p className="text-gray-600">
                  With extensive international experience, we help businesses navigate complex global regulatory landscapes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <Card className="bg-white border border-gray-100">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-black mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <button 
                    className="flex justify-between items-center w-full text-left"
                    onClick={() => toggleFaq(index)}
                  >
                    <h3 className="text-lg font-semibold text-black pr-8">{faq.question}</h3>
                    {openFaq === index ? (
                      <ChevronUp className="text-gray-500 flex-shrink-0" size={20} />
                    ) : (
                      <ChevronDown className="text-gray-500 flex-shrink-0" size={20} />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="mt-4 text-gray-600">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-black rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let our certified experts help you navigate the complex world of regulatory compliance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Contact Our Team
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-whit text-black">
                View Our Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
