
import { useState } from "react";
import { businessNeeds, needTypes, countries, businessTypes } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Search, Calendar, Building, MapPin, Video } from "lucide-react";

const FulfillNeed = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"browse" | "register">("browse");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
  
  // Browse filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all-types");
  const [selectedCountry, setSelectedCountry] = useState("all-countries");
  const [selectedBusinessType, setSelectedBusinessType] = useState("all-business-types");
  
  // Register form data
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    businessType: "",
    description: "",
    businessName: "",
    country: "",
    contactEmail: "",
    pitchVideoUrl: "",
  });

  // Filter needs based on search and filters
  const filteredNeeds = businessNeeds.filter((need) => {
    const matchesSearch = need.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         need.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         need.businessName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === "all-types" || need.type === selectedType;
    const matchesCountry = selectedCountry === "all-countries" || need.country === selectedCountry;
    const matchesBusinessType = selectedBusinessType === "all-business-types" || need.businessType === selectedBusinessType;
    
    return matchesSearch && matchesType && matchesCountry && matchesBusinessType;
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
        title: "Need Registered Successfully",
        description: "Your business need has been posted and will be visible to potential partners.",
      });
      // Reset form
      setFormData({
        title: "",
        type: "",
        businessType: "",
        description: "",
        businessName: "",
        country: "",
        contactEmail: "",
        pitchVideoUrl: "",
      });
      setUploadedVideo(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Business Needs Marketplace</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse business needs from startups and companies, or register your own specific requirements.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="flex border-b">
            <button
              className={`px-6 py-4 font-medium ${
                activeTab === "browse"
                  ? "border-b-2 border-startupPurple-600 text-startupPurple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("browse")}
            >
              Browse Needs
            </button>
            <button
              className={`px-6 py-4 font-medium ${
                activeTab === "register"
                  ? "border-b-2 border-startupPurple-600 text-startupPurple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("register")}
            >
              Register a Need
            </button>
          </div>

          {activeTab === "browse" && (
            <div className="p-6">
              {/* Search and Filter */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {/* Search */}
                <div className="relative">
                  <Label htmlFor="search" className="mb-2 block">Search</Label>
                  <div className="relative">
                    <Input
                      id="search"
                      type="text"
                      placeholder="Search needs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                    <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" size={16} />
                  </div>
                </div>

                {/* Need Type Filter */}
                <div>
                  <Label htmlFor="type" className="mb-2 block">Need Type</Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-types">All Types</SelectItem>
                      {needTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Business Type Filter */}
                <div>
                  <Label htmlFor="businessTypeFilter" className="mb-2 block">Business Type</Label>
                  <Select value={selectedBusinessType} onValueChange={setSelectedBusinessType}>
                    <SelectTrigger id="businessTypeFilter">
                      <SelectValue placeholder="All Business Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-business-types">All Business Types</SelectItem>
                      {businessTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Country Filter */}
                <div>
                  <Label htmlFor="country" className="mb-2 block">Country</Label>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger id="country">
                      <SelectValue placeholder="All Countries" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-countries">All Countries</SelectItem>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Results */}
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  {filteredNeeds.length} {filteredNeeds.length === 1 ? "Need" : "Needs"} Available
                </h2>

                <div className="grid grid-cols-1 gap-6">
                  {filteredNeeds.map((need) => (
                    <Card key={need.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl mb-2">{need.title}</CardTitle>
                            <CardDescription className="flex items-center gap-4 text-sm">
                              <span className="flex items-center gap-1">
                                <Building size={14} />
                                {need.businessName}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin size={14} />
                                {need.country}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar size={14} />
                                {new Date(need.postedDate).toLocaleDateString()}
                              </span>
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="secondary">{need.type}</Badge>
                            {need.businessType && (
                              <Badge variant="outline">{need.businessType}</Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{need.description}</p>
                        <Button className="bg-startupPurple-600 hover:bg-startupPurple-700">
                          Contact & Fulfill Need
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredNeeds.length === 0 && (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-medium mb-2">No needs match your search</h3>
                    <p className="text-gray-500">Try adjusting your search criteria or filters</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "register" && (
            <div className="p-6">
              <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">Register Your Business Need</h2>
                  <p className="text-gray-600">
                    Post your specific business requirements to connect with potential partners, investors, or service providers.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Need Title */}
                  <div>
                    <Label htmlFor="title" className="text-base">
                      Need Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Brief title describing what you need"
                      className="mt-1"
                      required
                    />
                  </div>

                  {/* Two Column Layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Need Type */}
                    <div>
                      <Label htmlFor="needType" className="text-base">
                        Need Type <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value) => handleSelectChange("type", value)}
                        required
                      >
                        <SelectTrigger id="needType" className="mt-1">
                          <SelectValue placeholder="Select need type" />
                        </SelectTrigger>
                        <SelectContent>
                          {needTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
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

                    {/* Business Name */}
                    <div>
                      <Label htmlFor="businessName" className="text-base">
                        Business Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        placeholder="Your business name"
                        className="mt-1"
                        required
                      />
                    </div>

                    {/* Country */}
                    <div>
                      <Label htmlFor="registerCountry" className="text-base">
                        Country <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) => handleSelectChange("country", value)}
                        required
                      >
                        <SelectTrigger id="registerCountry" className="mt-1">
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
                  </div>

                  {/* Description */}
                  <div>
                    <Label htmlFor="description" className="text-base">
                      Detailed Description <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Provide detailed information about what you're looking for, requirements, timeline, etc."
                      className="mt-1 h-32"
                      required
                    />
                  </div>

                  {/* Pitch Video Section */}
                  <div className="space-y-4">
                    <Label className="text-base">Pitch Video (Optional)</Label>
                    <p className="text-sm text-gray-500">
                      Add a pitch video to better explain your need. You can either provide a URL or upload a video file.
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
                      Responses from interested parties will be sent to this email.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-startupPurple-600 hover:bg-startupPurple-700"
                      disabled={isLoading}
                    >
                      {isLoading ? "Posting..." : "Post Your Need"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FulfillNeed;
