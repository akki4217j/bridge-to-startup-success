
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, MapPin, Users, Calendar, DollarSign } from "lucide-react";

export interface Business {
  id: number;
  name: string;
  description: string;
  country: string;
  yearFounded: number;
  revenue: string;
  teamSize: number;
  industry: string;
  businessType: string;
  websiteUrl: string;
  status: "pending" | "approved" | "rejected";
}

interface BusinessCardProps {
  business: Business;
}

const BusinessCard = ({ business }: BusinessCardProps) => {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-xl">{business.name}</CardTitle>
          <Badge variant="secondary">{business.businessType}</Badge>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          {business.country}
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow flex flex-col">
        <p className="text-gray-600 mb-4 flex-grow">{business.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm">
            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
            <span>Founded: {business.yearFounded}</span>
          </div>
          <div className="flex items-center text-sm">
            <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
            <span>Revenue: {business.revenue}</span>
          </div>
          <div className="flex items-center text-sm">
            <Users className="w-4 h-4 mr-2 text-gray-400" />
            <span>Team: {business.teamSize} people</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            Learn More
          </Button>
          {business.websiteUrl && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(business.websiteUrl, '_blank')}
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessCard;
