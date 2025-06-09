
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { industries, countries, businessTypes } from "@/data/mockData";
import { Upload, Video } from "lucide-react";

const Sell = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    country: "",
    yearFounded: "",
    revenue: "",
    teamSize: "",
    industry: "",
    businessType: "",
    websiteUrl: "",
    contactEmail: "",
    pitchVideoUrl: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if it's a video file
      if (file.type.startsWith('video/')) {
        setUploadedVideo(file);
        toast({
          title: "Video Selected",
          description: `${file.name} has been selected for upload.`,
        });
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please select a video file.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Listing Submitted for Review",
        description: "Your business has been submitted and is pending admin approval. You'll be notified once it's approved and live on the marketplace.",
      });
      // Reset form
      setFormData({
        name: "",
        description: "",
        country: "",
        yearFounded: "",
        revenue: "",
        teamSize: "",
        industry: "",
        businessType: "",
        websiteUrl: "",
        contactEmail: "",
        pitchVideoUrl: "",
      });
      setUploadedVideo(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-3">Sell Your Business</h1>
            <p className="text-lg text-gray-600">
              List your startup or established business to connect with potential buyers.
            </p>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> All business listings require admin approval before being published on our marketplace. 
                This ensures quality and helps protect both buyers and sellers.
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Business Information</h2>
              <p className="text-gray-600">
                Complete the form below to create your business listing. Be detailed to attract serious buyers.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Business Name */}
              <div>
                <Label htmlFor="name" className="text-base">
                  Business Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your business name"
                  className="mt-1"
                  required
                />
              </div>

              {/* Business Description */}
              <div>
                <Label htmlFor="description" className="text-base">
                  Business Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe what your business does, its unique value, and why someone would want to buy it..."
                  className="mt-1 h-32"
                  required
                />
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Country */}
                <div>
                  <Label htmlFor="country" className="text-base">
                    Country <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) => handleSelectChange("country", value)}
                    required
                  >
                    <SelectTrigger id="country" className="mt-1">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Industry */}
                <div>
                  <Label htmlFor="industry" className="text-base">
                    Industry <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.industry}
                    onValueChange={(value) => handleSelectChange("industry", value)}
                    required
                  >
                    <SelectTrigger id="industry" className="mt-1">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Business Type */}
                <div>
                  <Label htmlFor="businessType" className="text-base">
                    Business Type <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.businessType}
                    onValueChange={(value) => handleSelectChange("businessType", value)}
                    required
                  >
                    <SelectTrigger id="businessType" className="mt-1">
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Year Founded */}
                <div>
                  <Label htmlFor="yearFounded" className="text-base">
                    Year Founded <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="yearFounded"
                    name="yearFounded"
                    type="number"
                    min="1900"
                    max={new Date().getFullYear()}
                    value={formData.yearFounded}
                    onChange={handleInputChange}
                    placeholder="e.g., 2018"
                    className="mt-1"
                    required
                  />
                </div>

                {/* Annual Revenue */}
                <div>
                  <Label htmlFor="revenue" className="text-base">
                    Annual Revenue <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="revenue"
                    name="revenue"
                    value={formData.revenue}
                    onChange={handleInputChange}
                    placeholder="e.g., $250K/year"
                    className="mt-1"
                    required
                  />
                </div>

                {/* Team Size */}
                <div>
                  <Label htmlFor="teamSize" className="text-base">
                    Team Size <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="teamSize"
                    name="teamSize"
                    type="number"
                    min="1"
                    value={formData.teamSize}
                    onChange={handleInputChange}
                    placeholder="Number of employees"
                    className="mt-1"
                    required
                  />
                </div>

                {/* Website URL */}
                <div>
                  <Label htmlFor="websiteUrl" className="text-base">Website URL</Label>
                  <Input
                    id="websiteUrl"
                    name="websiteUrl"
                    type="url"
                    value={formData.websiteUrl}
                    onChange={handleInputChange}
                    placeholder="https://example.com"
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Pitch Video Section */}
              <div className="space-y-4">
                <Label className="text-base">Pitch Video (Optional)</Label>
                <p className="text-sm text-gray-500">
                  Add a pitch video to showcase your business. You can either provide a URL or upload a video file.
                </p>
                
                {/* Video URL Option */}
                <div>
                  <Label htmlFor="pitchVideoUrl" className="text-sm text-gray-600">Video URL</Label>
                  <Input
                    id="pitchVideoUrl"
                    name="pitchVideoUrl"
                    type="url"
                    value={formData.pitchVideoUrl}
                    onChange={handleInputChange}
                    placeholder="https://youtube.com/your-pitch-video"
                    className="mt-1"
                  />
                </div>

                {/* Video Upload Option */}
                <div>
                  <Label htmlFor="videoUpload" className="text-sm text-gray-600">Or Upload Video File</Label>
                  <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                    <Video className="text-gray-400 mb-2" size={32} />
                    {uploadedVideo ? (
                      <div className="text-center">
                        <p className="text-sm font-medium text-green-600 mb-2">
                          ✓ {uploadedVideo.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Size: {(uploadedVideo.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 mb-2">
                        Drag and drop your video here, or click to browse
                      </p>
                    )}
                    <input
                      id="videoUpload"
                      type="file"
                      className="hidden"
                      accept="video/*"
                      onChange={handleVideoUpload}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => document.getElementById("videoUpload")?.click()}
                    >
                      {uploadedVideo ? "Change Video" : "Select Video File"}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Supported formats: MP4, AVI, MOV, WMV. Max size: 100MB
                  </p>
                </div>
              </div>

              {/* Upload Logo */}
              <div>
                <Label htmlFor="logo" className="text-base">Business Logo (Optional)</Label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                  <Upload className="text-gray-400 mb-2" size={32} />
                  <p className="text-sm text-gray-500">
                    Drag and drop your logo here, or click to browse
                  </p>
                  <input
                    id="logo"
                    type="file"
                    className="hidden"
                    accept="image/*"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => document.getElementById("logo")?.click()}
                  >
                    Select File
                  </Button>
                </div>
              </div>

              {/* Contact Email */}
              <div>
                <Label htmlFor="contactEmail" className="text-base">
                  Contact Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="mt-1"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  This will not be displayed publicly. Messages from interested buyers will be forwarded to this email.
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-startupPurple-600 hover:bg-startupPurple-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting for Review..." : "Submit for Review"}
                </Button>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Your listing will be reviewed by our team and published within 24-48 hours if approved.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sell;
