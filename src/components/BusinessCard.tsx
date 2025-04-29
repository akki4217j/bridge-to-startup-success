
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building } from "lucide-react";

export interface Business {
  id: number;
  name: string;
  description: string;
  country: string;
  yearFounded: number;
  revenue: string;
  teamSize: number;
  industry: string;
  logoUrl?: string;
  websiteUrl?: string;
}

interface BusinessCardProps {
  business: Business;
}

const BusinessCard = ({ business }: BusinessCardProps) => {
  return (
    <Card className="overflow-hidden card-hover h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
              {business.logoUrl ? (
                <img src={business.logoUrl} alt={business.name} className="w-full h-full object-cover" />
              ) : (
                <Building className="text-gray-400" size={24} />
              )}
            </div>
            <div>
              <CardTitle className="text-lg">{business.name}</CardTitle>
              <CardDescription className="text-sm text-gray-500">
                {business.country}
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-700 leading-relaxed line-clamp-3 mb-3">
          {business.description}
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs mt-2">
          <div className="bg-gray-50 p-2 rounded">
            <span className="text-gray-500">Founded</span>
            <p className="font-medium">{business.yearFounded}</p>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <span className="text-gray-500">Revenue</span>
            <p className="font-medium">{business.revenue}</p>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <span className="text-gray-500">Team</span>
            <p className="font-medium">{business.teamSize} people</p>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <span className="text-gray-500">Industry</span>
            <p className="font-medium">{business.industry}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        {business.websiteUrl && (
          <Button variant="outline" size="sm" asChild>
            <a href={business.websiteUrl} target="_blank" rel="noopener noreferrer">
              Visit Website
            </a>
          </Button>
        )}
        <Button size="sm" className="bg-startupBlue-600 hover:bg-startupBlue-700" asChild>
          <Link to={`/business/${business.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BusinessCard;
