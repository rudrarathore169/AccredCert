import { Link } from "wouter";
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">AccredCert</h3>
            <p className="text-gray-300 mb-4">
              Your trusted US Government certified FDA agent for global compliance solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition duration-300">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition duration-300">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-green-400">Services</h4>
            <ul className="space-y-2">
              <li><Link href="/services" className="text-gray-300 hover:text-white transition duration-300">FDA Registration</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-white transition duration-300">FSVP Agent</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-white transition duration-300">Product Labeling</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-white transition duration-300">LLC Registration</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-white transition duration-300">FSSAI License</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-green-400">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-white transition duration-300">About Us</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-white transition duration-300">Our Services</Link></li>
              <li><Link href="/verification" className="text-gray-300 hover:text-white transition duration-300">Certificate Verification</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition duration-300">Contact Us</Link></li>
              <li><Link href="/blog" className="text-gray-300 hover:text-white transition duration-300">Blog</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-green-400">Contact Info</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start">
                <MapPin className="mt-1 mr-3 flex-shrink-0" size={16} />
                <span className="text-sm">
                  2105 Vista Oeste St NW, Suite E - 1080<br />
                  Albuquerque, NM 87120
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-3 flex-shrink-0" size={16} />
                <span className="text-sm">+1 (646) 974-6735</span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-3 flex-shrink-0" size={16} />
                <span className="text-sm">info@accredcert.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm mb-4 md:mb-0">
              © 2024 AccredCert. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-300 hover:text-white transition duration-300">Privacy Policy</a>
              <a href="#" className="text-gray-300 hover:text-white transition duration-300">Terms of Service</a>
              <a href="#" className="text-gray-300 hover:text-white transition duration-300">Disclaimers</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
