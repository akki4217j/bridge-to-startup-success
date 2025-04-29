
import { useState } from "react";
import { businessNeeds, needTypes, countries } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import ContactForm from "@/components/ContactForm";
import { Search } from "lucide-react";

const FulfillNeed = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("browse");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form data for registering a need
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    businessName: "",
    country: "",
    contactEmail: "",
  });

  // Filter needs based on search and filters
  const filteredNeeds = businessNeeds.filter((need) => {
    const matchesSearch = need.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         need.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === "" || need.type === selectedType;
    const matchesCountry = selectedCountry === "" || need.country === selectedCountry;
    
    return matchesSearch && matchesType && matchesCountry;
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
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Need Registered",
        description: "Your business need has been successfully registered.",
      });
      // Reset form
      setFormData({
        title: "",
        type: "",
        description: "",
        businessName: "",
        country: "",
        contactEmail: "",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Fulfill a Business Need</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse startups and businesses looking for partnerships, investments, or services.
            Or register your own business need to connect with potential partners.
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <div className="flex justify-center">
            <TabsList className="grid grid-cols-2 w-full max-w-md">
              <TabsTrigger value="browse">Browse Needs</TabsTrigger>
              <TabsTrigger value="register">Register a Need</TabsTrigger>
            </TabsList>
          </div>

          {/* Browse Needs Tab */}
          <TabsContent value="browse">
            {/* Filters */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                {/* Search */}
                <div className="relative">
                  <Label htmlFor="search" className="mb-2 block">Search</Label>
                  <div className="relative">
                    <Input
                      id="search"
                      type="text"
                      placeholder="Search by title or description"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                    <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" size={16} />
                  </div>
                </div>

                {/* Need Type Filter */}
                <div>
                  <Label htmlFor="needType" className="mb-2 block">Need Type</Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger id="needType">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Types</SelectItem>
                      {needTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Country Filter */}
                <div>
                  <Label htmlFor="needCountry" className="mb-2 block">Country</Label>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger id="needCountry">
                      <SelectValue placeholder="All Countries" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Countries</SelectItem>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Needs Listing */}
            <div>
              <h2 className="text-2xl font-bold mb-6">
                {filteredNeeds.length} Business {filteredNeeds.length === 1 ? "Need" : "Needs"} Available
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredNeeds.map((need) => (
                  <Card key={need.id} className="card-hover overflow-hidden h-full flex flex-col">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-startupPurple-100 text-startupPurple-800">
                          {need.type}
                        </span>
                        <span className="text-xs text-gray-500">
                          Posted on {new Date(need.postedDate).toLocaleDateString()}
                        </span>
                      </div>
                      <CardTitle className="text-lg">{need.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm text-gray-700 mb-4">
                        {need.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{need.businessName}</span>
                        <span>{need.country}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <Button 
                        className="w-full bg-startupPurple-600 hover:bg-startupPurple-700"
                        onClick={() => {
                          document.getElementById(`need-${need.id}`)?.scrollIntoView({ behavior: 'smooth' });
                          document.getElementById(`need-${need.id}`)?.classList.add('ring-2', 'ring-startupPurple-500');
                          setTimeout(() => {
                            document.getElementById(`need-${need.id}`)?.classList.remove('ring-2', 'ring-startupPurple-500');
                          }, 1500);
                        }}
                      >
                        Contact Business
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {filteredNeeds.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No business needs match your search</h3>
                  <p className="text-gray-500">Try adjusting your search criteria or filters</p>
                </div>
              )}
            </div>

            {/* Contact Forms */}
            <div className="mt-16 space-y-8">
              <h2 className="text-2xl font-bold">Contact Businesses</h2>
              {filteredNeeds.map((need) => (
                <div 
                  key={need.id} 
                  id={`need-${need.id}`}
                  className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300"
                >
                  <h3 className="text-xl font-bold mb-2">{need.title}</h3>
                  <div className="mb-6">
                    <p className="text-sm text-gray-500">
                      {need.businessName} • {need.country} • {need.type}
                    </p>
                  </div>
                  <ContactForm recipientName={need.businessName} recipientType="need" />
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Register a Need Tab */}
          <TabsContent value="register">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">Register Your Business Need</h2>
                  <p className="text-gray-600">
                    Describe what your business is looking for. Be specific to attract the right partners.
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
                      placeholder="e.g., Looking for Marketing Partner"
                      className="mt-1"
                      required
                    />
                  </div>

                  {/* Need Type */}
                  <div>
                    <Label htmlFor="type" className="text-base">
                      Need Type <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => handleSelectChange("type", value)}
                      required
                    >
                      <SelectTrigger id="type" className="mt-1">
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

                  {/* Need Description */}
                  <div>
                    <Label htmlFor="description" className="text-base">
                      Description <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe what you're looking for, requirements, timeline, etc."
                      className="mt-1 h-32"
                      required
                    />
                  </div>

                  {/* Business Name and Country */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      This will not be displayed publicly. Messages from interested parties will be forwarded to this email.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-startupPurple-600 hover:bg-startupPurple-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Register Your Need"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FulfillNeed;
