
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Store = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-16">
            <h1 className="text-4xl font-bold mb-6">StartupBridge Store</h1>
            <div className="relative inline-block">
              <span className="bg-startupPurple-100 text-startupPurple-800 text-sm font-medium px-4 py-1 rounded-full">
                Coming Soon
              </span>
            </div>
            <p className="text-xl text-gray-600 mt-6">
              A marketplace for startup tools and services to help your business grow.
            </p>
          </div>

          {/* Store Preview */}
          <div className="mb-16">
            <div className="bg-gradient-to-r from-startupBlue-500 to-startupPurple-500 p-10 rounded-lg text-white">
              <h2 className="text-2xl font-bold mb-4">Get Ready For Our Marketplace</h2>
              <p className="mb-8">
                We're building a curated collection of the best tools and services to help startups succeed.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Growth Tools</h3>
                  <p className="text-sm opacity-90">Marketing, analytics, and customer acquisition tools</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Business Services</h3>
                  <p className="text-sm opacity-90">Legal, accounting, and operational services</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Development</h3>
                  <p className="text-sm opacity-90">Software, design, and technical resources</p>
                </div>
              </div>
              
              <Button variant="outline" className="bg-white text-startupBlue-600 hover:bg-gray-100">
                Get Notified When We Launch
              </Button>
            </div>
          </div>

          {/* Interest Form */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-4">Interested in becoming a vendor?</h2>
            <p className="text-gray-600 mb-6">
              If you offer tools or services for startups and would like to be featured in our store when it launches, 
              register your interest now.
            </p>
            <Link to="/register">
              <Button className="bg-startupBlue-600 hover:bg-startupBlue-700">
                Register Interest
              </Button>
            </Link>
          </div>

          {/* Alternative Action */}
          <div className="border-t pt-12">
            <h2 className="text-2xl font-bold mb-4">In the meantime...</h2>
            <p className="text-gray-600 mb-6">
              Explore our platform to connect with startups and businesses today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/buy">
                <Button variant="outline">
                  Browse Businesses
                </Button>
              </Link>
              <Link to="/fulfill-need">
                <Button variant="outline">
                  Fulfill Business Needs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
