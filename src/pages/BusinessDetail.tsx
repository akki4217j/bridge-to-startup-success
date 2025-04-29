
import { useParams, Link } from "react-router-dom";
import { businesses } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Building, Globe, ArrowLeft } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const BusinessDetail = () => {
  const { id } = useParams();
  
  // Find the business by ID
  const business = businesses.find((b) => b.id === Number(id));

  // If business not found
  if (!business) {
    return (
      <div className="min-h-screen pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Business Not Found</h1>
          <p className="text-gray-600 mb-8">The business you're looking for doesn't exist or may have been removed.</p>
          <Link to="/buy">
            <Button className="bg-startupBlue-600 hover:bg-startupBlue-700">
              <ArrowLeft className="mr-2" size={16} /> Back to Listings
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link to="/buy" className="inline-flex items-center text-startupBlue-600 hover:underline mb-6">
          <ArrowLeft className="mr-1" size={16} /> Back to Listings
        </Link>

        {/* Business Header */}
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          <div className="w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center">
            {business.logoUrl ? (
              <img src={business.logoUrl} alt={business.name} className="w-full h-full object-cover rounded-lg" />
            ) : (
              <Building size={32} className="text-gray-400" />
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{business.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
              <span>{business.industry}</span>
              <span>•</span>
              <span>{business.country}</span>
              <span>•</span>
              <span>Founded {business.yearFounded}</span>
            </div>

            {business.websiteUrl && (
              <a 
                href={business.websiteUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-startupBlue-600 hover:underline"
              >
                <Globe size={16} className="mr-1" /> Visit Website
              </a>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Business Details */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="financials">Financials</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-bold mb-4">About the Business</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {business.description}
                    {/* Added more detailed description */}
                    {business.id === 1 && (
                      <>
                        <br /><br />
                        Our platform has helped over 500 small businesses increase their operational efficiency by 30% on average. We specialize in automating repetitive tasks, improving client communication, and simplifying billing processes.
                        <br /><br />
                        We're seeking a strategic buyer who can help us scale the platform to reach more small businesses and expand our feature set to include advanced reporting and analytics.
                      </>
                    )}
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-bold mb-4">Key Information</h2>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Founded</TableCell>
                        <TableCell>{business.yearFounded}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Annual Revenue</TableCell>
                        <TableCell>{business.revenue}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Team Size</TableCell>
                        <TableCell>{business.teamSize} employees</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Location</TableCell>
                        <TableCell>{business.country}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Industry</TableCell>
                        <TableCell>{business.industry}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              {/* Financials Tab */}
              <TabsContent value="financials" className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-bold mb-4">Financial Overview</h2>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Metric</TableHead>
                        <TableHead>Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Annual Revenue</TableCell>
                        <TableCell>{business.revenue}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Monthly Recurring Revenue</TableCell>
                        <TableCell>{business.id === 1 ? "$29,000" : "Contact for details"}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Gross Margin</TableCell>
                        <TableCell>{business.id === 1 ? "78%" : "Contact for details"}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Growth Rate (YoY)</TableCell>
                        <TableCell>{business.id === 1 ? "32%" : "Contact for details"}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <p className="text-gray-500 mt-4 text-sm">
                    More detailed financial information available upon request with signed NDA.
                  </p>
                </div>
              </TabsContent>

              {/* Team Tab */}
              <TabsContent value="team" className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-bold mb-4">Team Structure</h2>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Department</TableHead>
                        <TableHead>Headcount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Development</TableCell>
                        <TableCell>{business.id === 1 ? "3" : "Contact for details"}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Sales & Marketing</TableCell>
                        <TableCell>{business.id === 1 ? "1" : "Contact for details"}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Customer Support</TableCell>
                        <TableCell>{business.id === 1 ? "1" : "Contact for details"}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Management</TableCell>
                        <TableCell>{business.id === 1 ? "1" : "Contact for details"}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <p className="text-gray-700 mt-4">
                    {business.id === 1 ? "Our team consists of experienced professionals with backgrounds in enterprise software development and small business operations." : "Contact for more details about the team structure and experience."}
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
              <h2 className="text-xl font-bold mb-4">Contact Business Owner</h2>
              <ContactForm recipientName={business.name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetail;
