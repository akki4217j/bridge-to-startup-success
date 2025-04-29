
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-startupBlue-600 mb-4">404</h1>
        <p className="text-3xl font-semibold mb-4">Page Not Found</p>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/">
            <Button className="bg-startupBlue-600 hover:bg-startupBlue-700">
              Return to Home
            </Button>
          </Link>
          <Link to="/buy">
            <Button variant="outline">
              Browse Businesses
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
