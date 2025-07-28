import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Settings, 
  Tag, 
  FileText, 
  Mail, 
  Upload, 
  BarChart3, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  LogOut,
  User
} from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Service, Certificate as CertificateType, ContactSubmission, FileUpload, BlogPost } from "@shared/schema";

// Login form schema
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

// Service form schema
const serviceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  country: z.string().min(1, "Country is required"),
  category: z.string().min(1, "Category is required"),
  imageUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
});

// Tag form schema
const certificateSchema = z.object({
  certificateNumber: z.string().min(1, "Tag number is required"),
  clientName: z.string().min(1, "Client name is required"),
  clientEmail: z.string().email("Invalid email format").optional().or(z.literal("")),
  serviceType: z.string().min(1, "Service type is required"),
  issueDate: z.string().min(1, "Issue date is required"),
  expiryDate: z.string().min(1, "Expiry date is required"),
});

// Blog post form schema
const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().optional(),
  imageUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  isPublished: z.boolean(),
});

type LoginFormData = z.infer<typeof loginSchema>;
type ServiceFormData = z.infer<typeof serviceSchema>;
type CertificateFormData = z.infer<typeof certificateSchema>;
type BlogFormData = z.infer<typeof blogSchema>;

export default function Admin() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingCertificate, setEditingCertificate] = useState<CertificateType | null>(null);
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null);
  const { toast } = useToast();

  // Check if user is logged in
  const { data: currentUser } = useQuery({
    queryKey: ["/api/auth/me"],
    retry: false,
    meta: { errorHandler: () => {} },
  });

  // Login form
  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Service form
  const {
    register: registerService,
    handleSubmit: handleServiceSubmit,
    formState: { errors: serviceErrors },
    reset: resetService,
    setValue: setServiceValue,
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
  });

  // Tag form
  const {
    register: registerCertificate,
    handleSubmit: handleCertificateSubmit,
    formState: { errors: certificateErrors },
    reset: resetCertificate,
    setValue: setCertificateValue,
  } = useForm<CertificateFormData>({
    resolver: zodResolver(certificateSchema),
  });

  // Blog form
  const {
    register: registerBlog,
    handleSubmit: handleBlogSubmit,
    formState: { errors: blogErrors },
    reset: resetBlog,
    setValue: setBlogValue,
    watch: watchBlog,
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: { isPublished: false },
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await apiRequest("POST", "/api/auth/login", data);
      return response.json();
    },
    onSuccess: (userData) => {
      setUser(userData);
      toast({
        title: "Login Successful",
        description: "Welcome to the admin panel!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
    },
    onError: () => {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/auth/logout", {});
      return response.json();
    },
    onSuccess: () => {
      setUser(null);
      queryClient.clear();
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully.",
      });
    },
  });

  // Admin stats query
  const { data: stats } = useQuery({
    queryKey: ["/api/admin/stats"],
    enabled: !!currentUser?.isAdmin,
  });

  // Services queries and mutations
  const { data: services, isLoading: servicesLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
    enabled: !!currentUser?.isAdmin,
  });

  const createServiceMutation = useMutation({
    mutationFn: async (data: ServiceFormData) => {
      const response = await apiRequest("POST", "/api/services", data);
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Service Created", description: "Service has been created successfully." });
      queryClient.invalidateQueries({ queryKey: ["/api/services"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      resetService();
    },
  });

  const updateServiceMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: ServiceFormData }) => {
      const response = await apiRequest("PUT", `/api/services/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Service Updated", description: "Service has been updated successfully." });
      queryClient.invalidateQueries({ queryKey: ["/api/services"] });
      setEditingService(null);
      resetService();
    },
  });

  const deleteServiceMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest("DELETE", `/api/services/${id}`, {});
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Service Deleted", description: "Service has been deleted successfully." });
      queryClient.invalidateQueries({ queryKey: ["/api/services"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
    },
  });

  // Certificates queries and mutations
  const { data: certificates, isLoading: certificatesLoading } = useQuery<CertificateType[]>({
    queryKey: ["/api/certificates"],
    enabled: !!currentUser?.isAdmin,
  });

  const createCertificateMutation = useMutation({
    mutationFn: async (data: CertificateFormData) => {
      const response = await apiRequest("POST", "/api/certificates", {
        ...data,
        issueDate: new Date(data.issueDate).toISOString(),
        expiryDate: new Date(data.expiryDate).toISOString(),
      });
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Tag Created", description: "Tag has been created successfully." });
      queryClient.invalidateQueries({ queryKey: ["/api/certificates"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      resetCertificate();
    },
  });

  const updateCertificateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: CertificateFormData }) => {
      const response = await apiRequest("PUT", `/api/certificates/${id}`, {
        ...data,
        issueDate: new Date(data.issueDate).toISOString(),
        expiryDate: new Date(data.expiryDate).toISOString(),
      });
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Tag Updated", description: "Tag has been updated successfully." });
      queryClient.invalidateQueries({ queryKey: ["/api/certificates"] });
      setEditingCertificate(null);
      resetCertificate();
    },
  });

  const deleteCertificateMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest("DELETE", `/api/certificates/${id}`, {});
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Tag Deleted", description: "Tag has been deleted successfully." });
      queryClient.invalidateQueries({ queryKey: ["/api/certificates"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
    },
  });

  // Contact submissions query
  const { data: contacts, isLoading: contactsLoading } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/contact"],
    enabled: !!currentUser?.isAdmin,
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest("PUT", `/api/contact/${id}/read`, {});
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
    },
  });

  // File uploads query
  const { data: uploads, isLoading: uploadsLoading } = useQuery<FileUpload[]>({
    queryKey: ["/api/uploads"],
    enabled: !!currentUser?.isAdmin,
  });

  const deleteUploadMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest("DELETE", `/api/uploads/${id}`, {});
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "File Deleted", description: "File has been deleted successfully." });
      queryClient.invalidateQueries({ queryKey: ["/api/uploads"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
    },
  });

  // Blog posts queries and mutations
  const { data: blogPosts, isLoading: blogLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog/all"],
    enabled: !!currentUser?.isAdmin,
  });

  const createBlogMutation = useMutation({
    mutationFn: async (data: BlogFormData) => {
      const response = await apiRequest("POST", "/api/blog", data);
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Blog Post Created", description: "Blog post has been created successfully." });
      queryClient.invalidateQueries({ queryKey: ["/api/blog/all"] });
      resetBlog();
    },
  });

  const updateBlogMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: BlogFormData }) => {
      const response = await apiRequest("PUT", `/api/blog/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Blog Post Updated", description: "Blog post has been updated successfully." });
      queryClient.invalidateQueries({ queryKey: ["/api/blog/all"] });
      setEditingBlogPost(null);
      resetBlog();
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest("DELETE", `/api/blog/${id}`, {});
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Blog Post Deleted", description: "Blog post has been deleted successfully." });
      queryClient.invalidateQueries({ queryKey: ["/api/blog/all"] });
    },
  });

  // Form handlers
  const onLoginSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  const onServiceSubmit = (data: ServiceFormData) => {
    if (editingService) {
      updateServiceMutation.mutate({ id: editingService.id, data });
    } else {
      createServiceMutation.mutate(data);
    }
  };

  const onCertificateSubmit = (data: CertificateFormData) => {
    if (editingCertificate) {
      updateCertificateMutation.mutate({ id: editingCertificate.id, data });
    } else {
      createCertificateMutation.mutate(data);
    }
  };

  const onBlogSubmit = (data: BlogFormData) => {
    if (editingBlogPost) {
      updateBlogMutation.mutate({ id: editingBlogPost.id, data });
    } else {
      createBlogMutation.mutate(data);
    }
  };

  const editService = (service: Service) => {
    setEditingService(service);
    setServiceValue("title", service.title);
    setServiceValue("description", service.description);
    setServiceValue("country", service.country);
    setServiceValue("category", service.category);
    setServiceValue("imageUrl", service.imageUrl || "");
  };

  const editCertificate = (certificate: CertificateType) => {
    setEditingCertificate(certificate);
    setCertificateValue("certificateNumber", certificate.certificateNumber);
    setCertificateValue("clientName", certificate.clientName);
    setCertificateValue("clientEmail", certificate.clientEmail || "");
    setCertificateValue("serviceType", certificate.serviceType);
    setCertificateValue("issueDate", new Date(certificate.issueDate).toISOString().split('T')[0]);
    setCertificateValue("expiryDate", new Date(certificate.expiryDate).toISOString().split('T')[0]);
  };

  const editBlogPost = (post: BlogPost) => {
    setEditingBlogPost(post);
    setBlogValue("title", post.title);
    setBlogValue("slug", post.slug);
    setBlogValue("content", post.content);
    setBlogValue("excerpt", post.excerpt || "");
    setBlogValue("imageUrl", post.imageUrl || "");
    setBlogValue("isPublished", post.isPublished);
  };

  // If not authenticated, show login form
  if (!currentUser?.isAdmin) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <Card className="w-full max-w-md bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-white">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...registerLogin("email")}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="admin@accredcert.com"
                />
                {loginErrors.email && (
                  <p className="text-red-400 text-sm mt-1">{loginErrors.email.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...registerLogin("password")}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="••••••••"
                />
                {loginErrors.password && (
                  <p className="text-red-400 text-sm mt-1">{loginErrors.password.message}</p>
                )}
              </div>
              <Button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {loginMutation.isPending ? "Logging in..." : "Login to Admin Panel"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-300">Manage your AccredCert platform</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User size={20} />
              <span>{currentUser.username}</span>
            </div>
            <Button
              onClick={() => logoutMutation.mutate()}
              variant="outline"
              className="border-gray-600 text-white hover:bg-gray-800"
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="admin-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Total Services</p>
                  <p className="text-2xl font-bold text-white">{stats?.totalServices || 0}</p>
                </div>
                <Settings className="text-blue-400" size={24} />
              </div>
            </CardContent>
          </Card>

          <Card className="admin-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Active Certificates</p>
                  <p className="text-2xl font-bold text-white">{stats?.activeCertificates || 0}</p>
                </div>
                <Tag className="text-green-400" size={24} />
              </div>
            </CardContent>
          </Card>

          <Card className="admin-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Client Inquiries</p>
                  <p className="text-2xl font-bold text-white">{stats?.clientInquiries || 0}</p>
                </div>
                <Mail className="text-yellow-400" size={24} />
              </div>
            </CardContent>
          </Card>

          <Card className="admin-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">File Uploads</p>
                  <p className="text-2xl font-bold text-white">{stats?.fileUploads || 0}</p>
                </div>
                <Upload className="text-purple-400" size={24} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="services" className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="services" className="data-[state=active]:bg-gray-700">Services</TabsTrigger>
            <TabsTrigger value="certificates" className="data-[state=active]:bg-gray-700">Certificates</TabsTrigger>
            <TabsTrigger value="contacts" className="data-[state=active]:bg-gray-700">Contact Submissions</TabsTrigger>
            <TabsTrigger value="uploads" className="data-[state=active]:bg-gray-700">File Uploads</TabsTrigger>
            <TabsTrigger value="blog" className="data-[state=active]:bg-gray-700">Blog Posts</TabsTrigger>
          </TabsList>

          {/* Services Tab */}
          <TabsContent value="services">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Service Management</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus size={16} className="mr-2" />
                      Add Service
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{editingService ? "Edit Service" : "Add New Service"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleServiceSubmit(onServiceSubmit)} className="space-y-4">
                      <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          {...registerService("title")}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                        {serviceErrors.title && (
                          <p className="text-red-400 text-sm mt-1">{serviceErrors.title.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          {...registerService("description")}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                        {serviceErrors.description && (
                          <p className="text-red-400 text-sm mt-1">{serviceErrors.description.message}</p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="country">Country</Label>
                          <Input
                            id="country"
                            {...registerService("country")}
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                          {serviceErrors.country && (
                            <p className="text-red-400 text-sm mt-1">{serviceErrors.country.message}</p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="category">Category</Label>
                          <Input
                            id="category"
                            {...registerService("category")}
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                          {serviceErrors.category && (
                            <p className="text-red-400 text-sm mt-1">{serviceErrors.category.message}</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="imageUrl">Image URL (Optional)</Label>
                        <Input
                          id="imageUrl"
                          {...registerService("imageUrl")}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                        {serviceErrors.imageUrl && (
                          <p className="text-red-400 text-sm mt-1">{serviceErrors.imageUrl.message}</p>
                        )}
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setEditingService(null);
                            resetService();
                          }}
                          className="border-gray-600 text-white hover:bg-gray-700"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={createServiceMutation.isPending || updateServiceMutation.isPending}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          {editingService ? "Update" : "Create"} Service
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-0">
                  {servicesLoading ? (
                    <div className="p-6 space-y-4">
                      {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-16 bg-gray-700" />
                      ))}
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-700">
                          <TableHead className="text-gray-300">Title</TableHead>
                          <TableHead className="text-gray-300">Country</TableHead>
                          <TableHead className="text-gray-300">Category</TableHead>
                          <TableHead className="text-gray-300">Status</TableHead>
                          <TableHead className="text-gray-300">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {services?.map((service) => (
                          <TableRow key={service.id} className="border-gray-700">
                            <TableCell className="text-white font-medium">{service.title}</TableCell>
                            <TableCell className="text-gray-300">{service.country}</TableCell>
                            <TableCell className="text-gray-300">{service.category}</TableCell>
                            <TableCell>
                              <Badge variant={service.isActive ? "default" : "secondary"}>
                                {service.isActive ? "Active" : "Inactive"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => editService(service)}
                                  className="border-gray-600 text-white hover:bg-gray-700"
                                >
                                  <Edit size={14} />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => deleteServiceMutation.mutate(service.id)}
                                  disabled={deleteServiceMutation.isPending}
                                >
                                  <Trash2 size={14} />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Tag Management</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Plus size={16} className="mr-2" />
                      Add Tag
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{editingCertificate ? "Edit Tag" : "Add New Tag"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleCertificateSubmit(onCertificateSubmit)} className="space-y-4">
                      <div>
                        <Label htmlFor="certificateNumber">Tag Number</Label>
                        <Input
                          id="certificateNumber"
                          {...registerCertificate("certificateNumber")}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                        {certificateErrors.certificateNumber && (
                          <p className="text-red-400 text-sm mt-1">{certificateErrors.certificateNumber.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="clientName">Client Name</Label>
                        <Input
                          id="clientName"
                          {...registerCertificate("clientName")}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                        {certificateErrors.clientName && (
                          <p className="text-red-400 text-sm mt-1">{certificateErrors.clientName.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="clientEmail">Client Email (Optional)</Label>
                        <Input
                          id="clientEmail"
                          type="email"
                          {...registerCertificate("clientEmail")}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                        {certificateErrors.clientEmail && (
                          <p className="text-red-400 text-sm mt-1">{certificateErrors.clientEmail.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="serviceType">Service Type</Label>
                        <Input
                          id="serviceType"
                          {...registerCertificate("serviceType")}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                        {certificateErrors.serviceType && (
                          <p className="text-red-400 text-sm mt-1">{certificateErrors.serviceType.message}</p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="issueDate">Issue Date</Label>
                          <Input
                            id="issueDate"
                            type="date"
                            {...registerCertificate("issueDate")}
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                          {certificateErrors.issueDate && (
                            <p className="text-red-400 text-sm mt-1">{certificateErrors.issueDate.message}</p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            type="date"
                            {...registerCertificate("expiryDate")}
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                          {certificateErrors.expiryDate && (
                            <p className="text-red-400 text-sm mt-1">{certificateErrors.expiryDate.message}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setEditingCertificate(null);
                            resetCertificate();
                          }}
                          className="border-gray-600 text-white hover:bg-gray-700"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={createCertificateMutation.isPending || updateCertificateMutation.isPending}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          {editingCertificate ? "Update" : "Create"} Tag
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-0">
                  {certificatesLoading ? (
                    <div className="p-6 space-y-4">
                      {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-16 bg-gray-700" />
                      ))}
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-700">
                          <TableHead className="text-gray-300">Tag Number</TableHead>
                          <TableHead className="text-gray-300">Client Name</TableHead>
                          <TableHead className="text-gray-300">Service Type</TableHead>
                          <TableHead className="text-gray-300">Status</TableHead>
                          <TableHead className="text-gray-300">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {certificates?.map((certificate) => (
                          <TableRow key={certificate.id} className="border-gray-700">
                            <TableCell className="text-white font-medium">{certificate.certificateNumber}</TableCell>
                            <TableCell className="text-gray-300">{certificate.clientName}</TableCell>
                            <TableCell className="text-gray-300">{certificate.serviceType}</TableCell>
                            <TableCell>
                              <Badge variant={
                                certificate.status === "valid" ? "default" :
                                certificate.status === "expired" ? "secondary" : "destructive"
                              }>
                                {certificate.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => editCertificate(certificate)}
                                  className="border-gray-600 text-white hover:bg-gray-700"
                                >
                                  <Edit size={14} />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => deleteCertificateMutation.mutate(certificate.id)}
                                  disabled={deleteCertificateMutation.isPending}
                                >
                                  <Trash2 size={14} />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Contact Submissions Tab */}
          <TabsContent value="contacts">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Contact Submissions</h2>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-0">
                  {contactsLoading ? (
                    <div className="p-6 space-y-4">
                      {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-16 bg-gray-700" />
                      ))}
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-700">
                          <TableHead className="text-gray-300">Name</TableHead>
                          <TableHead className="text-gray-300">Email</TableHead>
                          <TableHead className="text-gray-300">Subject</TableHead>
                          <TableHead className="text-gray-300">Date</TableHead>
                          <TableHead className="text-gray-300">Status</TableHead>
                          <TableHead className="text-gray-300">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {contacts?.map((contact) => (
                          <TableRow key={contact.id} className="border-gray-700">
                            <TableCell className="text-white font-medium">{contact.name}</TableCell>
                            <TableCell className="text-gray-300">{contact.email}</TableCell>
                            <TableCell className="text-gray-300">{contact.subject || "No subject"}</TableCell>
                            <TableCell className="text-gray-300">
                              {new Date(contact.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Badge variant={contact.isRead ? "default" : "secondary"}>
                                {contact.isRead ? "Read" : "Unread"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="border-gray-600 text-white hover:bg-gray-700"
                                    >
                                      <Eye size={14} />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="bg-gray-800 border-gray-700 text-white">
                                    <DialogHeader>
                                      <DialogTitle>Contact Submission Details</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <div>
                                        <Label className="text-gray-300">Name</Label>
                                        <p className="text-white">{contact.name}</p>
                                      </div>
                                      <div>
                                        <Label className="text-gray-300">Email</Label>
                                        <p className="text-white">{contact.email}</p>
                                      </div>
                                      <div>
                                        <Label className="text-gray-300">Subject</Label>
                                        <p className="text-white">{contact.subject || "No subject"}</p>
                                      </div>
                                      <div>
                                        <Label className="text-gray-300">Message</Label>
                                        <p className="text-white whitespace-pre-wrap">{contact.message}</p>
                                      </div>
                                      <div>
                                        <Label className="text-gray-300">Date</Label>
                                        <p className="text-white">{new Date(contact.createdAt).toLocaleString()}</p>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                                {!contact.isRead && (
                                  <Button
                                    size="sm"
                                    onClick={() => markAsReadMutation.mutate(contact.id)}
                                    className="bg-blue-600 hover:bg-blue-700"
                                  >
                                    Mark Read
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* File Uploads Tab */}
          <TabsContent value="uploads">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">File Uploads</h2>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-0">
                  {uploadsLoading ? (
                    <div className="p-6 space-y-4">
                      {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-16 bg-gray-700" />
                      ))}
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-700">
                          <TableHead className="text-gray-300">File Name</TableHead>
                          <TableHead className="text-gray-300">Client Email</TableHead>
                          <TableHead className="text-gray-300">Size</TableHead>
                          <TableHead className="text-gray-300">Upload Date</TableHead>
                          <TableHead className="text-gray-300">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {uploads?.map((upload) => (
                          <TableRow key={upload.id} className="border-gray-700">
                            <TableCell className="text-white font-medium">{upload.originalName}</TableCell>
                            <TableCell className="text-gray-300">{upload.clientEmail || "N/A"}</TableCell>
                            <TableCell className="text-gray-300">
                              {(upload.fileSize / 1024 / 1024).toFixed(2)} MB
                            </TableCell>
                            <TableCell className="text-gray-300">
                              {new Date(upload.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => deleteUploadMutation.mutate(upload.id)}
                                disabled={deleteUploadMutation.isPending}
                              >
                                <Trash2 size={14} />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Blog Posts Tab */}
          <TabsContent value="blog">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Blog Management</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Plus size={16} className="mr-2" />
                      Add Blog Post
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>{editingBlogPost ? "Edit Blog Post" : "Add New Blog Post"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleBlogSubmit(onBlogSubmit)} className="space-y-4">
                      <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          {...registerBlog("title")}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                        {blogErrors.title && (
                          <p className="text-red-400 text-sm mt-1">{blogErrors.title.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                          id="slug"
                          {...registerBlog("slug")}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                        {blogErrors.slug && (
                          <p className="text-red-400 text-sm mt-1">{blogErrors.slug.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="excerpt">Excerpt (Optional)</Label>
                        <Textarea
                          id="excerpt"
                          {...registerBlog("excerpt")}
                          className="bg-gray-700 border-gray-600 text-white"
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                          id="content"
                          {...registerBlog("content")}
                          className="bg-gray-700 border-gray-600 text-white"
                          rows={10}
                        />
                        {blogErrors.content && (
                          <p className="text-red-400 text-sm mt-1">{blogErrors.content.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="imageUrl">Image URL (Optional)</Label>
                        <Input
                          id="imageUrl"
                          {...registerBlog("imageUrl")}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                        {blogErrors.imageUrl && (
                          <p className="text-red-400 text-sm mt-1">{blogErrors.imageUrl.message}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="isPublished"
                          {...registerBlog("isPublished")}
                          className="rounded"
                        />
                        <Label htmlFor="isPublished">Published</Label>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setEditingBlogPost(null);
                            resetBlog();
                          }}
                          className="border-gray-600 text-white hover:bg-gray-700"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={createBlogMutation.isPending || updateBlogMutation.isPending}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          {editingBlogPost ? "Update" : "Create"} Blog Post
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-0">
                  {blogLoading ? (
                    <div className="p-6 space-y-4">
                      {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-16 bg-gray-700" />
                      ))}
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-700">
                          <TableHead className="text-gray-300">Title</TableHead>
                          <TableHead className="text-gray-300">Slug</TableHead>
                          <TableHead className="text-gray-300">Status</TableHead>
                          <TableHead className="text-gray-300">Date</TableHead>
                          <TableHead className="text-gray-300">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {blogPosts?.map((post) => (
                          <TableRow key={post.id} className="border-gray-700">
                            <TableCell className="text-white font-medium">{post.title}</TableCell>
                            <TableCell className="text-gray-300">{post.slug}</TableCell>
                            <TableCell>
                              <Badge variant={post.isPublished ? "default" : "secondary"}>
                                {post.isPublished ? "Published" : "Draft"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-gray-300">
                              {new Date(post.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => editBlogPost(post)}
                                  className="border-gray-600 text-white hover:bg-gray-700"
                                >
                                  <Edit size={14} />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => deleteBlogMutation.mutate(post.id)}
                                  disabled={deleteBlogMutation.isPending}
                                >
                                  <Trash2 size={14} />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
