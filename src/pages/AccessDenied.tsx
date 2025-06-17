
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Home } from "lucide-react";

const AccessDenied = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <Shield className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl text-red-600">Access Denied</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            You don't have permission to access this page. 
            Only authorized administrators can view this content.
          </p>
          
          <div className="space-y-2">
            <Link to="/">
              <Button className="w-full" variant="outline">
                <Home className="mr-2 h-4 w-4" />
                Return to Home
              </Button>
            </Link>
            
            <Link to="/admin-login">
              <Button className="w-full">
                Admin Login
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessDenied;
