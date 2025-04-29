
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { businesses, testimonials } from "@/data/mockData";
import BusinessCard from "@/components/BusinessCard";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  
  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });
    setEmail("");
  };
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              The Bridge to Startup Success
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Buy, sell, or partner with businesses worldwide. Find the perfect opportunity for your entrepreneurial journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/buy">
                <Button size="lg" className="w-full sm:w-auto bg-white text-startupBlue-600 hover:bg-gray-100">
                  Buy a Business
                </Button>
              </Link>
              <Link to="/sell">
                <Button size="lg" className="w-full sm:w-auto bg-white text-startupPurple-600 hover:bg-gray-100">
                  Sell a Business
                </Button>
              </Link>
              <Link to="/fulfill-need">
                <Button size="lg" className="w-full sm:w-auto bg-white text-gray-800 hover:bg-gray-100">
                  Fulfill a Need
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-3">How StartupBridge Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We connect entrepreneurs, investors, and businesses to create successful ventures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <Card className="border-t-4 border-startupBlue-500 card-hover">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-startupBlue-100 rounded-full flex items-center justify-center mb-4 text-startupBlue-600 font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2">Register Your Business</h3>
                <p className="text-gray-600">
                  Create a profile for your business or startup. Share key metrics and what makes you unique.
                </p>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="border-t-4 border-startupPurple-500 card-hover">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-startupPurple-100 rounded-full flex items-center justify-center mb-4 text-startupPurple-600 font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2">Connect with Opportunities</h3>
                <p className="text-gray-600">
                  Browse listings to buy, sell, or find partners for specific business needs.
                </p>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="border-t-4 border-green-500 card-hover">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600 font-bold text-xl">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2">Secure Private Communication</h3>
                <p className="text-gray-600">
                  Message interested parties directly through our platform with privacy protection.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Featured Opportunities</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore some of our highlighted businesses currently available on the platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {businesses.slice(0, 3).map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/buy">
              <Button className="bg-startupBlue-600 hover:bg-startupBlue-700">
                View All Listings <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Success Stories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from entrepreneurs who have found success through StartupBridge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="card-hover">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                      <img 
                        src={testimonial.avatarUrl} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-gray-700 mb-4 italic">
                      "{testimonial.testimonial}"
                    </p>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.position}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-3">Stay Updated</h2>
            <p className="text-lg mb-6 opacity-90">
              Subscribe to our newsletter for the latest business opportunities and market insights.
            </p>
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="flex-grow bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" size="lg" className="bg-startupBlue-500 hover:bg-startupBlue-600">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
