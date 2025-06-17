
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { useBusinessContext } from "@/contexts/BusinessContext";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search, 
  Download,
  Eye,
  Trash2,
  BarChart3,
  LogOut,
  Mail,
  Settings,
  Calendar,
  Globe,
  DollarSign,
  Building
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

const AdminDashboard = () => {
  const { businesses, updateBusinessStatus, deleteBusiness } = useBusinessContext();
  const { currentAdmin, logout } = useAdminAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null);
  const [adminActivities, setAdminActivities] = useState<AdminActivity[]>([
    {
      id: 1,
      action: 'Approved',
      businessName: 'TechStart Solutions',
      timestamp: new Date().toLocaleString(),
      adminName: currentAdmin?.name || 'Admin'
    }
  ]);

  const addActivity = (action: string, businessName: string) => {
    const newActivity: AdminActivity = {
      id: adminActivities.length + 1,
      action,
      businessName,
      timestamp: new Date().toLocaleString(),
      adminName: currentAdmin?.name || 'Admin'
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

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
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

  const stats = getStats();
  const filteredBusinesses = getFilteredBusinesses();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, {currentAdmin?.name}</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="businesses">📦 Manage Businesses</TabsTrigger>
            <TabsTrigger value="users">✅ Manage Users</TabsTrigger>
            <TabsTrigger value="analytics">📈 Analytics</TabsTrigger>
            <TabsTrigger value="messages">📬 Messages</TabsTrigger>
            <TabsTrigger value="settings">⚙️ Settings</TabsTrigger>
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
                              
                              {/* Details Button */}
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setSelectedBusiness(business)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2">
                                      <Building className="h-5 w-5" />
                                      {business.name}
                                    </DialogTitle>
                                    <DialogDescription>
                                      Business details and information
                                    </DialogDescription>
                                  </DialogHeader>
                                  
                                  <div className="space-y-6">
                                    {/* Status Badge */}
                                    <div className="flex justify-between items-center">
                                      <Badge
                                        variant={
                                          business.status === 'approved' 
                                            ? 'default' 
                                            : business.status === 'rejected' 
                                            ? 'destructive' 
                                            : 'secondary'
                                        }
                                        className="text-sm"
                                      >
                                        {business.status}
                                      </Badge>
                                      <span className="text-sm text-gray-500">ID: {business.id}</span>
                                    </div>

                                    {/* Business Description */}
                                    <div>
                                      <h4 className="font-semibold mb-2">Description</h4>
                                      <p className="text-gray-700">{business.description}</p>
                                    </div>

                                    {/* Business Details Grid */}
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                          <Building className="h-4 w-4 text-gray-500" />
                                          <div>
                                            <p className="text-sm text-gray-500">Business Type</p>
                                            <p className="font-medium">{business.businessType}</p>
                                          </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                          <Globe className="h-4 w-4 text-gray-500" />
                                          <div>
                                            <p className="text-sm text-gray-500">Country</p>
                                            <p className="font-medium">{business.country}</p>
                                          </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                          <Calendar className="h-4 w-4 text-gray-500" />
                                          <div>
                                            <p className="text-sm text-gray-500">Year Established</p>
                                            <p className="font-medium">{business.yearEstablished}</p>
                                          </div>
                                        </div>
                                      </div>
                                      
                                      <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                          <DollarSign className="h-4 w-4 text-gray-500" />
                                          <div>
                                            <p className="text-sm text-gray-500">Revenue</p>
                                            <p className="font-medium">{business.revenue}</p>
                                          </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                          <Users className="h-4 w-4 text-gray-500" />
                                          <div>
                                            <p className="text-sm text-gray-500">Team Size</p>
                                            <p className="font-medium">{business.teamSize}</p>
                                          </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                          <BarChart3 className="h-4 w-4 text-gray-500" />
                                          <div>
                                            <p className="text-sm text-gray-500">Industry</p>
                                            <p className="font-medium">{business.industry}</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Action Buttons for Pending Businesses */}
                                    {business.status === 'pending' && (
                                      <div className="flex gap-2 pt-4 border-t">
                                        <Button
                                          onClick={() => {
                                            approveBusiness(business.id);
                                            setSelectedBusiness(null);
                                          }}
                                          className="flex-1 bg-green-600 hover:bg-green-700"
                                        >
                                          <CheckCircle className="mr-2 h-4 w-4" />
                                          Approve Business
                                        </Button>
                                        <Button
                                          variant="destructive"
                                          onClick={() => {
                                            rejectBusiness(business.id);
                                            setSelectedBusiness(null);
                                          }}
                                          className="flex-1"
                                        >
                                          <XCircle className="mr-2 h-4 w-4" />
                                          Reject Business
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                </DialogContent>
                              </Dialog>
                              
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

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage registered users and their permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">User Management</h3>
                  <p className="text-gray-500">User management features will be implemented here</p>
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

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="mr-2 h-5 w-5" />
                  Message Inbox
                </CardTitle>
                <CardDescription>Contact requests and user messages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Mail className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No New Messages</h3>
                  <p className="text-gray-500">All messages will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  Site Settings
                </CardTitle>
                <CardDescription>Configure application settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Settings className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Settings Panel</h3>
                  <p className="text-gray-500">Site configuration options will be available here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
