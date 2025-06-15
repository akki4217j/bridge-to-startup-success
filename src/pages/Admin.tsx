
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { useBusinessContext } from "@/contexts/BusinessContext";
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search, 
  Filter,
  Download,
  Eye,
  Trash2,
  BarChart3,
  Shield,
  LogOut
} from "lucide-react";

interface AdminStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

interface AdminActivity {
  id: number;
  action: string;
  businessName: string;
  timestamp: string;
  adminName: string;
}

const Admin = () => {
  const { businesses, updateBusinessStatus, deleteBusiness } = useBusinessContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [adminActivities, setAdminActivities] = useState<AdminActivity[]>([
    {
      id: 1,
      action: 'Approved',
      businessName: 'TechStart Solutions',
      timestamp: '2024-06-15 10:30 AM',
      adminName: 'Admin'
    },
    {
      id: 2,
      action: 'Rejected',
      businessName: 'Invalid Business',
      timestamp: '2024-06-15 09:15 AM',
      adminName: 'Admin'
    }
  ]);

  const handleLogin = () => {
    if (password === 'admin123') {
      setIsAuthenticated(true);
      toast({
        title: "Login Successful",
        description: "Welcome to the admin dashboard",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid password",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  const addActivity = (action: string, businessName: string) => {
    const newActivity: AdminActivity = {
      id: adminActivities.length + 1,
      action,
      businessName,
      timestamp: new Date().toLocaleString(),
      adminName: 'Admin'
    };
    setAdminActivities([newActivity, ...adminActivities]);
  };

  const approveBusiness = (businessId: number) => {
    updateBusinessStatus(businessId, 'approved');
    const business = businesses.find(b => b.id === businessId);
    if (business) {
      addActivity('Approved', business.name);
      toast({
        title: "Business Approved",
        description: `${business.name} has been approved successfully`,
      });
    }
  };

  const rejectBusiness = (businessId: number) => {
    updateBusinessStatus(businessId, 'rejected');
    const business = businesses.find(b => b.id === businessId);
    if (business) {
      addActivity('Rejected', business.name);
      toast({
        title: "Business Rejected",
        description: `${business.name} has been rejected`,
        variant: "destructive",
      });
    }
  };

  const handleDeleteBusiness = (businessId: number) => {
    const business = businesses.find(b => b.id === businessId);
    deleteBusiness(businessId);
    if (business) {
      addActivity('Deleted', business.name);
      toast({
        title: "Business Deleted",
        description: `${business.name} has been permanently deleted`,
        variant: "destructive",
      });
    }
  };

  const getStats = (): AdminStats => {
    return {
      total: businesses.length,
      pending: businesses.filter(b => b.status === 'pending').length,
      approved: businesses.filter(b => b.status === 'approved').length,
      rejected: businesses.filter(b => b.status === 'rejected').length,
    };
  };

  const getFilteredBusinesses = () => {
    let filtered = businesses;
    
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(business => business.status === selectedStatus);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(business => 
        business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const exportData = () => {
    const dataStr = JSON.stringify(businesses, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'business_data.json';
    link.click();
    
    toast({
      title: "Data Exported",
      description: "Business data has been exported successfully",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle>Admin Access</CardTitle>
            <CardDescription>Enter password to access the admin dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            <Button 
              onClick={handleLogin}
              className="w-full"
            >
              Login
            </Button>
            <p className="text-sm text-gray-500 text-center">
              Demo password: admin123
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const stats = getStats();
  const filteredBusinesses = getFilteredBusinesses();

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage business listings and applications</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Businesses</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="businesses" className="space-y-6">
          <TabsList>
            <TabsTrigger value="businesses">Business Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
          </TabsList>

          {/* Business Management Tab */}
          <TabsContent value="businesses" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                  <div>
                    <CardTitle>Business Listings</CardTitle>
                    <CardDescription>Review and manage business applications</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={exportData}>
                      <Download className="mr-2 h-4 w-4" />
                      Export Data
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search businesses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value as any)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                {/* Business Table */}
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Business Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Country</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>Team Size</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBusinesses.map((business) => (
                        <TableRow key={business.id}>
                          <TableCell className="font-medium">{business.name}</TableCell>
                          <TableCell>{business.businessType}</TableCell>
                          <TableCell>{business.country}</TableCell>
                          <TableCell>{business.revenue}</TableCell>
                          <TableCell>{business.teamSize}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                business.status === 'approved' 
                                  ? 'default' 
                                  : business.status === 'rejected' 
                                  ? 'destructive' 
                                  : 'secondary'
                              }
                            >
                              {business.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              {business.status === 'pending' && (
                                <>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => approveBusiness(business.id)}
                                    className="text-green-600 hover:text-green-700"
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => rejectBusiness(business.id)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <XCircle className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open(`/business/${business.id}`, '_blank')}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteBusiness(business.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    Approval Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">
                    {stats.total > 0 ? Math.round((stats.approved / stats.total) * 100) : 0}%
                  </div>
                  <p className="text-gray-600">
                    {stats.approved} out of {stats.total} businesses approved
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">
                    {stats.pending}
                  </div>
                  <p className="text-gray-600">Businesses awaiting review</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Activity Log Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Admin Activities</CardTitle>
                <CardDescription>Track all admin actions and changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {adminActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.action === 'Approved' ? 'bg-green-500' :
                          activity.action === 'Rejected' ? 'bg-red-500' : 'bg-gray-500'
                        }`} />
                        <div>
                          <p className="font-medium">
                            {activity.action} "{activity.businessName}"
                          </p>
                          <p className="text-sm text-gray-500">by {activity.adminName}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">{activity.timestamp}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
