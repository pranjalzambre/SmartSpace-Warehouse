import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Building2, Plus, Eye, MessageSquare, Calendar, TrendingUp, 
  Users, MapPin, Star, BarChart3, DollarSign, Clock, 
  Settings, Bell, Heart, Search, Filter, ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

interface Property {
  id: number;
  name: string;
  location: string;
  totalArea: number;
  availableArea: number;
  pricePerSqFt: number;
  rating: number;
  reviews: number;
  status: 'active' | 'pending' | 'inactive';
  image: string;
  inquiries: number;
  monthlyRevenue: number;
}

interface Inquiry {
  id: number;
  warehouseName: string;
  requesterName: string;
  requesterCompany: string;
  areaRequired: number;
  message: string;
  date: string;
  status: 'new' | 'responded' | 'closed';
  avatar: string;
}

interface SavedProperty {
  id: number;
  name: string;
  location: string;
  pricePerSqFt: number;
  availableArea: number;
  rating: number;
  image: string;
  savedDate: string;
}

export default function Dashboard() {
  const [userType] = useState<'owner' | 'seeker'>('owner'); // In real app, get from auth context
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for owner
  const ownerProperties: Property[] = [
    {
      id: 1,
      name: "Prime Industrial Hub",
      location: "Bhiwandi, Mumbai",
      totalArea: 50000,
      availableArea: 12000,
      pricePerSqFt: 25,
      rating: 4.8,
      reviews: 24,
      status: 'active',
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=200&q=80",
      inquiries: 8,
      monthlyRevenue: 850000
    },
    {
      id: 2,
      name: "Metro Storage Center",
      location: "Gurgaon, Delhi NCR",
      totalArea: 30000,
      availableArea: 5000,
      pricePerSqFt: 30,
      rating: 4.6,
      reviews: 15,
      status: 'active',
      image: "https://images.unsplash.com/photo-1601980169411-4c0d37967c2e?w=200&q=80",
      inquiries: 12,
      monthlyRevenue: 750000
    }
  ];

  const inquiries: Inquiry[] = [
    {
      id: 1,
      warehouseName: "Prime Industrial Hub",
      requesterName: "Amit Patel",
      requesterCompany: "TechFlow Logistics",
      areaRequired: 5000,
      message: "Looking for climate-controlled space for electronics storage. Need immediate availability.",
      date: "2024-01-15",
      status: 'new',
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
    },
    {
      id: 2,
      warehouseName: "Metro Storage Center",
      requesterName: "Priya Sharma",
      requesterCompany: "QuickCommerce Pvt Ltd",
      areaRequired: 3000,
      message: "Require warehouse space for e-commerce fulfillment center. Flexible lease terms preferred.",
      date: "2024-01-14",
      status: 'responded',
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80"
    }
  ];

  // Mock data for seeker
  const savedProperties: SavedProperty[] = [
    {
      id: 1,
      name: "Gateway Storage Solutions",
      location: "Pune, Maharashtra",
      pricePerSqFt: 22,
      availableArea: 8500,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1553864250-05b20249ee6c?w=200&q=80",
      savedDate: "2024-01-10"
    },
    {
      id: 2,
      name: "Industrial Park Warehouse",
      location: "Chennai, Tamil Nadu",
      pricePerSqFt: 20,
      availableArea: 15000,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1565610222536-ef2bdc4a7fd2?w=200&q=80",
      savedDate: "2024-01-08"
    }
  ];

  const ownerStats = {
    totalProperties: 2,
    totalInquiries: 20,
    monthlyRevenue: 1600000,
    occupancyRate: 76,
    avgRating: 4.7
  };

  const seekerStats = {
    savedProperties: 5,
    activeSearches: 3,
    inquiriesSent: 12,
    responseRate: 85
  };

  const OwnerDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Properties</p>
                <p className="text-2xl font-bold text-gray-900">{ownerStats.totalProperties}</p>
              </div>
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{(ownerStats.monthlyRevenue / 100000).toFixed(1)}L</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New Inquiries</p>
                <p className="text-2xl font-bold text-gray-900">{ownerStats.totalInquiries}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Occupancy Rate</p>
                <p className="text-2xl font-bold text-gray-900">{ownerStats.occupancyRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
            <Progress value={ownerStats.occupancyRate} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Inquiries</CardTitle>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <CardDescription>New requests from potential tenants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inquiries.slice(0, 3).map((inquiry) => (
                <div key={inquiry.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={inquiry.avatar} />
                    <AvatarFallback>{inquiry.requesterName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">{inquiry.requesterName}</h4>
                      <Badge variant={inquiry.status === 'new' ? 'default' : 'secondary'}>
                        {inquiry.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{inquiry.requesterCompany}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Needs {inquiry.areaRequired.toLocaleString()} sq ft • {inquiry.warehouseName}
                    </p>
                    <p className="text-sm text-gray-700 mt-2 line-clamp-2">{inquiry.message}</p>
                    <div className="flex space-x-2 mt-3">
                      <Button size="sm" variant="outline">Respond</Button>
                      <Button size="sm" variant="ghost">View Details</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Properties Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Property Performance</CardTitle>
            <CardDescription>Your active warehouse listings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ownerProperties.map((property) => (
                <div key={property.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    <img src={property.image} alt={property.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{property.name}</h4>
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {property.location}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-green-600 font-medium">
                          {property.availableArea.toLocaleString()} sq ft available
                        </span>
                        <span className="text-gray-500">
                          {property.inquiries} inquiries
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{property.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Settings className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const SeekerDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Saved Properties</p>
                <p className="text-2xl font-bold text-gray-900">{seekerStats.savedProperties}</p>
              </div>
              <Heart className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Searches</p>
                <p className="text-2xl font-bold text-gray-900">{seekerStats.activeSearches}</p>
              </div>
              <Search className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Inquiries Sent</p>
                <p className="text-2xl font-bold text-gray-900">{seekerStats.inquiriesSent}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Response Rate</p>
                <p className="text-2xl font-bold text-gray-900">{seekerStats.responseRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <Progress value={seekerStats.responseRate} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Saved Properties */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Saved Properties</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link to="/warehouses">Browse More</Link>
              </Button>
            </div>
            <CardDescription>Properties you've bookmarked</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {savedProperties.map((property) => (
                <div key={property.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    <img src={property.image} alt={property.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{property.name}</h4>
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {property.location}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-medium text-blue-600">
                        ₹{property.pricePerSqFt}/sq ft
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{property.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {property.availableArea.toLocaleString()} sq ft available
                    </p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Button size="sm" asChild>
                      <Link to={`/warehouse/${property.id}`}>View</Link>
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Inquire
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">New warehouse match found</p>
                  <p className="text-xs text-gray-600">Industrial space in Pune matches your criteria</p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Inquiry response received</p>
                  <p className="text-xs text-gray-600">Gateway Storage Solutions responded to your inquiry</p>
                  <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-gray-600 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Search alert updated</p>
                  <p className="text-xs text-gray-600">Your "Mumbai Warehouses" search criteria was updated</p>
                  <p className="text-xs text-gray-500 mt-1">3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Properties */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended for You</CardTitle>
          <CardDescription>AI-powered recommendations based on your preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="border rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="aspect-video rounded-lg overflow-hidden mb-3">
                  <img 
                    src={`https://images.unsplash.com/photo-${item === 1 ? '1586528116311-ad8dd3c8310d' : item === 2 ? '1601980169411-4c0d37967c2e' : '1553864250-05b20249ee6c'}?w=400&q=80`}
                    alt="Warehouse"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-medium mb-1">Smart Logistics Hub {item}</h4>
                <p className="text-sm text-gray-600 flex items-center mb-2">
                  <MapPin className="h-3 w-3 mr-1" />
                  {item === 1 ? 'Mumbai' : item === 2 ? 'Delhi' : 'Bangalore'}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-600">₹{20 + item * 5}/sq ft</span>
                  <Button size="sm">View Details</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="font-bold text-xl text-gray-900">SmartWarehouse</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/warehouses" className="text-gray-600 hover:text-gray-900 font-medium">Find Warehouses</Link>
            <Link to="/list-property" className="text-gray-600 hover:text-gray-900 font-medium">List Your Property</Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900 font-medium">About</Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900 font-medium">Contact</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {userType === 'owner' ? 'Owner Dashboard' : 'Your Dashboard'}
            </h1>
            <p className="text-gray-600 mt-1">
              {userType === 'owner' 
                ? 'Manage your warehouse properties and track performance' 
                : 'Track your warehouse search and manage saved properties'
              }
            </p>
          </div>
          <div className="flex space-x-3">
            {userType === 'owner' ? (
              <Button asChild>
                <Link to="/list-property">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Property
                </Link>
              </Button>
            ) : (
              <Button asChild>
                <Link to="/warehouses">
                  <Search className="mr-2 h-4 w-4" />
                  Find Warehouses
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Dashboard Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value={userType === 'owner' ? 'properties' : 'saved'}>
              {userType === 'owner' ? 'Properties' : 'Saved'}
            </TabsTrigger>
            <TabsTrigger value={userType === 'owner' ? 'inquiries' : 'activity'}>
              {userType === 'owner' ? 'Inquiries' : 'Activity'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            {userType === 'owner' ? <OwnerDashboard /> : <SeekerDashboard />}
          </TabsContent>

          <TabsContent value={userType === 'owner' ? 'properties' : 'saved'} className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {userType === 'owner' ? 'Your Properties' : 'Saved Properties'}
                </CardTitle>
                <CardDescription>
                  {userType === 'owner' 
                    ? 'Manage your warehouse listings and track their performance'
                    : 'Properties you have bookmarked for future reference'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {userType === 'owner' ? 'Manage Your Properties' : 'Your Saved Properties'}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {userType === 'owner' 
                      ? 'Detailed property management tools coming soon'
                      : 'Advanced saved properties management coming soon'
                    }
                  </p>
                  <Button asChild>
                    <Link to={userType === 'owner' ? '/list-property' : '/warehouses'}>
                      {userType === 'owner' ? 'Add Property' : 'Browse Warehouses'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value={userType === 'owner' ? 'inquiries' : 'activity'} className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {userType === 'owner' ? 'Inquiries & Messages' : 'Activity & Messages'}
                </CardTitle>
                <CardDescription>
                  {userType === 'owner' 
                    ? 'Respond to tenant inquiries and manage communications'
                    : 'Track your inquiries and communications with property owners'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {userType === 'owner' ? 'Inquiry Management' : 'Activity Tracking'}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Advanced messaging and communication tools coming soon
                  </p>
                  <Button variant="outline">
                    <Bell className="mr-2 h-4 w-4" />
                    Set Up Notifications
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
