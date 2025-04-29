
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { industries, countries } from "@/data/mockData";
import { Upload } from "lucide-react";

const Sell = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    country: "",
    yearFounded: "",
    revenue: "",
    teamSize: "",
    industry: "",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Listing Submitted",
        description: "Your business has been successfully listed on StartupBridge.",
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
        websiteUrl: "",
        contactEmail: "",
        pitchVideoUrl: "",
      });
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

              {/* Pitch Video URL */}
              <div>
                <Label htmlFor="pitchVideoUrl" className="text-base">Pitch Video URL (Optional)</Label>
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
                  {isLoading ? "Submitting..." : "List Your Business"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sell;
