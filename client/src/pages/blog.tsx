import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, User, ArrowRight } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const { data: blogPosts, isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-black mb-4">Knowledge Center</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed with the latest insights on compliance, regulations, and industry best practices.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="service-card">
                <Skeleton className="w-full h-48 rounded-t-xl" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : !blogPosts || blogPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-8">
              We're working on creating valuable content for you. Check back soon for the latest insights on compliance and regulations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Sample article previews to show what content will look like */}
              <Card className="service-card">
                <img 
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
                  alt="FDA Compliance Guide"
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar size={16} className="mr-2" />
                    <span>Coming Soon</span>
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-3">
                    Complete Guide to FDA Food Facility Registration
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Everything you need to know about FDA food facility registration, including requirements, timelines, and best practices.
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">FDA Compliance</Badge>
                    <span className="text-sm text-gray-500">Article coming soon</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="service-card">
                <img 
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
                  alt="MoCRA Compliance"
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar size={16} className="mr-2" />
                    <span>Coming Soon</span>
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-3">
                    MoCRA Compliance: What Cosmetic Companies Need to Know
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Navigate the new Modernization of Cosmetics Regulation Act requirements and ensure your products comply.
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">Cosmetics</Badge>
                    <span className="text-sm text-gray-500">Article coming soon</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="service-card">
                <img 
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
                  alt="International Trade"
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar size={16} className="mr-2" />
                    <span>Coming Soon</span>
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-3">
                    International Trade Compliance: A Global Perspective
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Understand the complexities of international trade regulations and how to ensure compliance across multiple markets.
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">Global Trade</Badge>
                    <span className="text-sm text-gray-500">Article coming soon</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="service-card">
                {post.imageUrl && (
                  <img 
                    src={post.imageUrl} 
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                )}
                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar size={16} className="mr-2" />
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    {post.authorId && (
                      <>
                        <span className="mx-2">•</span>
                        <User size={16} className="mr-1" />
                        <span>AccredCert Team</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt || post.content.substring(0, 150) + "..."}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">Compliance</Badge>
                    <Link href={`/blog/${post.slug}`} className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
                      Read More
                      <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

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
