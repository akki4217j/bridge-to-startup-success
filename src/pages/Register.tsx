
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useBusinessContext } from "@/contexts/BusinessContext";
import { industries, countries } from "@/data/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const Register = () => {
  const { toast } = useToast();
  const { addBusiness } = useBusinessContext();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    country: "",
    description: "",
    websiteUrl: "",
    contactEmail: "",
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
      // Add business to the store
      addBusiness({
        name: formData.name,
        industry: formData.industry,
        country: formData.country,
        description: formData.description,
        websiteUrl: formData.websiteUrl,
        contactEmail: formData.contactEmail,
        businessType: 'Startup',
        revenue: 'Not disclosed',
        teamSize: 'Not disclosed',
        price: 'Contact for pricing',
        yearEstablished: new Date().getFullYear(),
        highlights: [],
      });

      setIsLoading(false);
      toast({
        title: "Registration Successful",
        description: "Your business has been registered and is pending admin approval.",
      });
      
      // Reset form
      setFormData({
        name: "",
        industry: "",
        country: "",
        description: "",
        websiteUrl: "",
        contactEmail: "",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-3">Register Your Business</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join StartupBridge to connect with potential buyers, partners, and fulfill your business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Registration Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">Business Registration</h2>
                  <p className="text-gray-600">
                    Create your business profile to access all StartupBridge features.
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

                  {/* Industry and Country */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      placeholder="Briefly describe what your business does..."
                      className="mt-1 h-24"
                      required
                    />
                  </div>

                  {/* Website URL and Contact Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    </div>
                  </div>

                  {/* Privacy Notice */}
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                    <p className="text-sm text-blue-700">
                      <strong>Privacy Note:</strong> Your contact information will remain hidden from public view. 
                      Messages from interested parties will be forwarded to your email without revealing your address.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-startupBlue-600 hover:bg-startupBlue-700"
                      disabled={isLoading}
                    >
                      {isLoading ? "Registering..." : "Register Business"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* Benefits Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Registration Benefits</CardTitle>
                  <CardDescription>
                    What you get when you register your business on StartupBridge
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="mr-3 mt-0.5">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <span className="text-gray-700">
                        <strong>Business Profile</strong>
                        <p className="text-sm text-gray-500">Create a detailed profile showcasing your business</p>
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-0.5">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <span className="text-gray-700">
                        <strong>List for Sale</strong>
                        <p className="text-sm text-gray-500">Offer your business for acquisition</p>
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-0.5">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <span className="text-gray-700">
                        <strong>Post Business Needs</strong>
                        <p className="text-sm text-gray-500">Find partners, investors, or service providers</p>
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-0.5">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <span className="text-gray-700">
                        <strong>Privacy Protection</strong>
                        <p className="text-sm text-gray-500">Secure messaging without revealing contact details</p>
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-0.5">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <span className="text-gray-700">
                        <strong>Market Access</strong>
                        <p className="text-sm text-gray-500">Connect with our global network of entrepreneurs and investors</p>
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-0.5">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <span className="text-gray-700">
                        <strong>Tools & Resources</strong>
                        <p className="text-sm text-gray-500">Access startup resources and business tools</p>
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <div className="mt-8 bg-gradient-to-r from-startupBlue-500 to-startupPurple-500 p-6 rounded-lg text-white">
                <h3 className="text-lg font-bold mb-2">Need Help?</h3>
                <p className="mb-4 opacity-90">
                  Our team is available to assist you with the registration process or answer any questions.
                </p>
                <Button variant="outline" className="bg-white text-startupBlue-600 hover:bg-gray-100 w-full">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
