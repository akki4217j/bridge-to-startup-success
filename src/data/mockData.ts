
import { Business } from "@/components/BusinessCard";

export const businesses: Business[] = [
  {
    id: 1,
    name: "TechFlow Solutions",
    description: "SaaS platform providing workflow automation for small businesses. We specialize in creating efficient processes for client management, invoicing, and project tracking.",
    country: "United States",
    yearFounded: 2018,
    revenue: "$350K/year",
    teamSize: 5,
    industry: "SaaS",
    businessType: "SaaS",
    websiteUrl: "https://example.com/techflow",
    status: "approved"
  },
  {
    id: 2,
    name: "GreenLeaf E-Commerce",
    description: "Eco-friendly products marketplace connecting sustainable brands with conscious consumers. Our platform has over 50,000 monthly visitors and is growing 15% month over month.",
    country: "Canada",
    yearFounded: 2019,
    revenue: "$500K/year",
    teamSize: 8,
    industry: "E-commerce",
    businessType: "E-commerce",
    websiteUrl: "https://example.com/greenleaf",
    status: "approved"
  },
  {
    id: 3,
    name: "DataViz Analytics",
    description: "B2B data visualization tool helping companies transform complex datasets into actionable insights. Used by marketing teams at over 200 companies.",
    country: "United Kingdom",
    yearFounded: 2017,
    revenue: "$800K/year",
    teamSize: 12,
    industry: "Analytics",
    businessType: "AI-ML",
    websiteUrl: "https://example.com/dataviz",
    status: "approved"
  },
  {
    id: 4,
    name: "HealthConnect",
    description: "Telehealth platform connecting patients with healthcare providers. We've facilitated over 10,000 virtual consultations in the last 12 months.",
    country: "Australia",
    yearFounded: 2020,
    revenue: "$250K/year",
    teamSize: 6,
    industry: "Healthcare",
    businessType: "HealthTech",
    websiteUrl: "https://example.com/healthconnect",
    status: "approved"
  },
  {
    id: 5,
    name: "EduLearn Platform",
    description: "Online learning marketplace with over 500 courses and 30,000 registered students. Specializing in technology and business skills development.",
    country: "Singapore",
    yearFounded: 2016,
    revenue: "$1.2M/year",
    teamSize: 15,
    industry: "EdTech",
    businessType: "EdTech",
    websiteUrl: "https://example.com/edulearn",
    status: "approved"
  },
  {
    id: 6,
    name: "FoodDelivery Local",
    description: "Restaurant delivery service operating in 5 major cities with proprietary logistics technology. Our platform connects 300+ local restaurants with customers.",
    country: "Germany",
    yearFounded: 2019,
    revenue: "$1.5M/year",
    teamSize: 22,
    industry: "Food Tech",
    businessType: "Food Tech",
    websiteUrl: "https://example.com/fooddelivery",
    status: "approved"
  }
];

export interface Need {
  id: number;
  title: string;
  type: string;
  description: string;
  businessName: string;
  country: string;
  businessType?: string;
  postedDate: string;
}

export const businessNeeds: Need[] = [
  {
    id: 1,
    title: "Looking for Marketing Partner",
    type: "Marketing",
    description: "Our SaaS startup needs help with digital marketing strategy and execution. We're looking for a partner with experience in B2B software marketing.",
    businessName: "CloudSync Solutions",
    country: "United States",
    businessType: "SaaS",
    postedDate: "2023-04-15"
  },
  {
    id: 2,
    title: "Investment Opportunity in FinTech",
    type: "Investment",
    description: "Seeking $500K investment for our growing fintech platform. We've achieved product-market fit with 15K monthly active users and consistent growth.",
    businessName: "PayPortal",
    country: "United Kingdom",
    businessType: "FinTech",
    postedDate: "2023-04-12"
  },
  {
    id: 3,
    title: "Technical Co-founder Wanted",
    type: "Partnership",
    description: "Early-stage health tech startup looking for a technical co-founder with experience in mobile development and healthcare integration.",
    businessName: "MediTrack",
    country: "Canada",
    businessType: "HealthTech",
    postedDate: "2023-04-10"
  },
  {
    id: 4,
    title: "Distribution Partnership for EdTech",
    type: "Distribution",
    description: "Our established education platform is seeking distribution partners in Asian markets to expand our global footprint.",
    businessName: "LearnQuest Academy",
    country: "Australia",
    businessType: "EdTech",
    postedDate: "2023-04-08"
  },
  {
    id: 5,
    title: "Seeking Technical Advisor",
    type: "Advisory",
    description: "AI startup looking for a technical advisor with experience in machine learning and natural language processing to guide our product development.",
    businessName: "NeuralSpeak",
    country: "Germany",
    businessType: "AI-ML",
    postedDate: "2023-04-05"
  },
  {
    id: 6,
    title: "E-commerce Logistics Partnership",
    type: "Logistics",
    description: "Fast-growing e-commerce brand seeking logistics partners in North America to improve delivery times and reduce shipping costs.",
    businessName: "FashionDirect",
    country: "France",
    businessType: "E-commerce",
    postedDate: "2023-04-03"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Founder, TechNest",
    testimonial: "StartupBridge helped us find the perfect buyer for our SaaS platform. The process was smooth and the team was incredibly supportive throughout.",
    avatarUrl: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Investor",
    testimonial: "I've acquired two businesses through StartupBridge, and both transactions were handled professionally. The platform provides detailed information that helps in making informed decisions.",
    avatarUrl: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    position: "CEO, GreenGrowth",
    testimonial: "We posted our specific needs on StartupBridge and connected with strategic partners that helped us scale our business by 300% in just one year.",
    avatarUrl: "https://i.pravatar.cc/150?img=3"
  }
];

export const industries = [
  "SaaS", "E-commerce", "FinTech", "EdTech", "HealthTech", 
  "AI/ML", "Marketing", "Mobile Apps", "Marketplace", "Hardware", 
  "Consumer Products", "B2B Services", "Social Media", "Gaming", "Other"
];

export const businessTypes = [
  "AI-ML", "AgTech", "Automobile", "B2B Services", "Blockchain", 
  "CleanTech", "E-commerce", "EdTech", "FinTech", "Food Tech", 
  "Gaming", "HealthTech", "IoT", "Marketplace", "Mobile Apps", 
  "Real Estate", "SaaS", "Social Media", "Travel", "Other"
];

export const needTypes = [
  "Investment", "Marketing", "Partnership", "Technical", 
  "Distribution", "Logistics", "Advisory", "Legal", "HR", "Other"
];

export const countries = [
  "United States", "United Kingdom", "Canada", "Australia", 
  "Germany", "France", "Singapore", "India", "Japan", "Brazil", 
  "Spain", "Sweden", "Netherlands", "South Africa", "Other"
];
