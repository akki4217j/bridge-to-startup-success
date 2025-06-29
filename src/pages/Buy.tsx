
import { useState } from "react";
import { countries, businessTypes } from "@/data/mockData";
import { useBusinessContext } from "@/contexts/BusinessContext";
import BusinessCard from "@/components/BusinessCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

const Buy = () => {
  const { businesses } = useBusinessContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBusinessType, setSelectedBusinessType] = useState("all-types");
  const [selectedCountry, setSelectedCountry] = useState("all-countries");

  // Filter businesses to only show approved ones and apply search/filter criteria
  const filteredBusinesses = businesses
    .filter((business) => business.status === "approved") // Only show approved businesses
    .filter((business) => {
      const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           business.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesBusinessType = selectedBusinessType === "all-types" || business.businessType === selectedBusinessType;
      const matchesCountry = selectedCountry === "all-countries" || business.country === selectedCountry;
      
      return matchesSearch && matchesBusinessType && matchesCountry;
    });

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Buy a Business</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore available businesses and startups for acquisition. Find your next entrepreneurial opportunity.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {/* Search */}
            <div className="relative">
              <Label htmlFor="search" className="mb-2 block">Search</Label>
              <div className="relative">
                <Input
                  id="search"
                  type="text"
                  placeholder="Search by name or description"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>

            {/* Business Type Filter */}
            <div>
              <Label htmlFor="businessType" className="mb-2 block">Business Type</Label>
              <Select value={selectedBusinessType} onValueChange={setSelectedBusinessType}>
                <SelectTrigger id="businessType">
                  <SelectValue placeholder="All Business Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-types">All Business Types</SelectItem>
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
        </div>

        {/* Results */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            {filteredBusinesses.length} {filteredBusinesses.length === 1 ? "Business" : "Businesses"} Available
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBusinesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>

          {filteredBusinesses.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No approved businesses match your search</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Buy;
