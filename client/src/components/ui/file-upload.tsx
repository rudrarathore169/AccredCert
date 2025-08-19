import { useState, useCallback } from "react";
import { CloudUpload, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FileUploadProps {
  onFileSelect: (file: File) => void; // parent me file bhejne ka method
}

export default function FileUpload({ onFileSelect }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (file: File) => {
    setSelectedFile(file);      // apne state me set karo
    onFileSelect(file);         // parent ko bhejo
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
      handleFileChange(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Optional extra fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="client-email" className="text-sm font-medium text-gray-700">
            Client Email (Optional)
          </Label>
          <Input id="client-email" type="email" placeholder="client@example.com" />
        </div>
        <div>
          <Label htmlFor="project-id" className="text-sm font-medium text-gray-700">
            Project ID (Optional)
          </Label>
          <Input id="project-id" type="text" placeholder="PRJ-2024-001" />
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
        {!selectedFile ? (
          <>
            <CloudUpload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2">
              Drag and drop your files here, or
            </p>
            <div className="relative">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Browse Files
              </Button>
              <Input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileSelect}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Maximum file size: 10MB. Supported formats: PDF, DOC, JPG, PNG
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center">
            {selectedFile.type.startsWith("image/") ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="preview"
                className="h-32 w-auto rounded-lg mb-2 object-cover border"
              />
            ) : (
              <FileText className="h-12 w-12 text-gray-500 mb-2" />
            )}
            <p className="text-sm font-medium text-gray-700">{selectedFile.name}</p>
            <Button
              variant="ghost"
              className="mt-2 text-red-500 hover:text-red-700"
              onClick={() => setSelectedFile(null)}
            >
              Remove
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
