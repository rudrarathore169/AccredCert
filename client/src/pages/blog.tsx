import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, User, ArrowRight } from "lucide-react";
import type { BlogPost } from "@shared/schema";
import { useContext } from "react";
import { AppContext } from "@/Context";

export default function Blog() {
 const {blogs}=useContext(AppContext)

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-black mb-4">Knowledge Center</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed with the latest insights on compliance, regulations, and industry best practices.
          </p>
        </div>

        
          <div className="text-center py-12">
            <p className="text-gray-600 mb-8">
              We're working on creating valuable content for you. Check back soon for the latest insights on compliance and regulations.
            </p>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {[
    ...blogs.filter(b => b.status === "Active"),
    ...blogs.filter(b => b.status === "Coming Soon")
  ].map((blog, index, arr) => (
    <div key={blog._id}>
      <Card className="service-card">
        <img 
          src={blog.imageUrl} 
          alt={blog.title}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        <CardContent className="p-6">
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <Calendar size={16} className="mr-2" />
            <span>{blog.status}</span>
          </div>
          <h3 className="text-xl font-semibold text-black mb-3">
            {blog.title}
          </h3>
          <p className="text-gray-600 mb-4">
            {blog.description}
          </p>
          <div className="flex items-center justify-between">
            <Badge variant="secondary">{blog.category}</Badge>
            <span className="text-sm text-gray-500">Article coming soon</span>
          </div>
        </CardContent>
      </Card>
    </div>
  ))}
</div>


          </div>
        {/* Featured Categories */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-black text-center mb-12">Article Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Badge className="w-8 h-8 bg-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">FDA Compliance</h3>
                <p className="text-gray-600 text-sm">
                  Guidelines and best practices for FDA registration and compliance.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Badge className="w-8 h-8 bg-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">Global Regulations</h3>
                <p className="text-gray-600 text-sm">
                  International regulatory requirements and compliance strategies.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Badge className="w-8 h-8 bg-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">Industry Insights</h3>
                <p className="text-gray-600 text-sm">
                  Latest trends and updates in the compliance industry.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Badge className="w-8 h-8 bg-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">Case Studies</h3>
                <p className="text-gray-600 text-sm">
                  Real-world examples of successful compliance implementations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-20 bg-black rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest compliance insights and regulatory updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
