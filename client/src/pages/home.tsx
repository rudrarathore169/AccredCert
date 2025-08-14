import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle, Award, Users, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 hero-overlay"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=800')"
          }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Simplifying Global<br />
              <span className="brand-blue">Compliance</span>
            </h1>
            <p className="text-2xl md:text-3xl mb-8 max-w-3xl mx-auto text-black font-bold">
  AccredCert is a trusted &amp; US Govt. certified FDA agent specializing in global compliance solutions for manufacturers, distributors, and exporters.
</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8">
                  Get Started Today
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="professional-button-outline">
                  View Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Why Choose AccredCert?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive compliance solutions with unmatched expertise and reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">FDA Certified</h3>
              <p className="text-gray-600">
                US Government certified FDA agent with proven track record in global compliance.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Expert Team</h3>
              <p className="text-gray-600">
                Experienced professionals specializing in regulatory compliance across industries.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">500+ Clients</h3>
              <p className="text-gray-600">
                Successfully helped over 500 businesses achieve compliance and market entry.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Global Reach</h3>
              <p className="text-gray-600">
                Serving clients across 50+ countries with comprehensive compliance solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Our Core Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive regulatory and compliance services tailored to your business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* USA Services */}
            <div className="service-card p-6">
              <img 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
                alt="FDA Registration"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-black mb-2">FDA Registration</h3>
              <p className="text-gray-600 mb-4">
                Complete FDA facility registration and food product compliance for U.S. market entry.
              </p>
              <Button className="professional-button">Learn More</Button>
            </div>

            <div className="service-card p-6">
              <img 
                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
                alt="Cosmetics Registration"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-black mb-2">Cosmetics (MoCRA)</h3>
              <p className="text-gray-600 mb-4">
                Navigate the new MoCRA requirements for cosmetic product registration and compliance.
              </p>
              <Button className="professional-button">Learn More</Button>
            </div>

            <div className="service-card p-6">
              <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
                alt="LLC Registration"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-black mb-2">LLC Registration</h3>
              <p className="text-gray-600 mb-4">
                Complete business formation services for establishing your U.S. presence.
              </p>
              <Button className="professional-button">Learn More</Button>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button size="lg" className="professional-button">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
<div className="mt-1 mb-20 text-center bg-black rounded-2xl p-12 max-w-5xl mx-auto">
  <h2 className="text-4xl font-bold mb-6 text-white">
    Ready to Simplify Your Compliance?
  </h2>

  <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
    Get started with our expert compliance solutions today and ensure your
    products meet all regulatory requirements.
  </p>

  <div className="flex flex-col sm:flex-row gap-4 justify-center">
    <Link href="/contact">
      <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
        Contact Us Today
      </Button>
    </Link>
    <Link href="/verification">
      <Button
        size="lg"
        variant="outline"
        className="border-white text-blue hover:bg-white hover:text-black"
      >
        Verify Certificate
      </Button>
    </Link>
  </div>
</div>

    </div>
  );
}
