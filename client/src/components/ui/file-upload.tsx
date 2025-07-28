import { useState, useCallback } from "react";
import { CloudUpload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface FileUploadProps {
  onUploadSuccess?: (fileId: string, filename: string) => void;
}

export default function FileUpload({ onUploadSuccess }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const handleUpload = async (file: File, clientEmail?: string, projectId?: string) => {
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (clientEmail) formData.append("clientEmail", clientEmail);
      if (projectId) formData.append("projectId", projectId);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();
      
      toast({
        title: "Upload Successful",
        description: `File "${result.filename}" uploaded successfully.`,
      });

      if (onUploadSuccess) {
        onUploadSuccess(result.fileId, result.filename);
      }
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="client-email" className="text-sm font-medium text-gray-700">
            Client Email (Optional)
          </Label>
          <Input
            id="client-email"
            type="email"
            placeholder="client@example.com"
            className="professional-input"
          />
        </div>
        <div>
          <Label htmlFor="project-id" className="text-sm font-medium text-gray-700">
            Project ID (Optional)
          </Label>
          <Input
            id="project-id"
            type="text"
            placeholder="PRJ-2024-001"
            className="professional-input"
          />
        </div>
      </div>

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-blue-400"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <CloudUpload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-600 mb-2">
          {isUploading ? "Uploading..." : "Drag and drop your files here, or"}
        </p>
        <div className="relative">
          <Button
            disabled={isUploading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Browse Files
          </Button>
          <Input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileSelect}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
            disabled={isUploading}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Maximum file size: 10MB. Supported formats: PDF, DOC, JPG, PNG
        </p>
      </div>
    </div>
  );
}
