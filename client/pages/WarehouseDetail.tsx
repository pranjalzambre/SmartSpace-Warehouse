import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import InquiryModal from "@/components/InquiryModal";
import { maharashtraWarehouses, type WarehouseData } from "@/data/warehouses";
import {
  Building2, MapPin, Star, ArrowLeft, Share2, Heart, Calendar,
  Phone, Mail, MessageSquare, CheckCircle, Shield, Package,
  Factory, Calendar as CalendarIcon, Users, Truck, TrendingUp, Zap
} from "lucide-react";

interface Review {
  id: number;
  user: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
}

export default function WarehouseDetail() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  // Find warehouse from real data
  const warehouse = maharashtraWarehouses.find(w => w.whId === id);

  if (!warehouse) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Warehouse Not Found</h1>
          <p className="text-gray-600 mb-6">The warehouse you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/warehouses">Back to Warehouses</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Generate mock reviews for the warehouse
  const mockReviews: Review[] = [
    {
      id: 1,
      user: `${warehouse.district} Trading Co.`,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
      rating: warehouse.rating > 4.5 ? 5 : 4,
      date: "2024-01-15",
      comment: `Excellent ${warehouse.warehouseType.toLowerCase()} facility with professional management. The ${warehouse.capacity}MT capacity meets our requirements perfectly.`,
      helpful: Math.floor(Math.random() * 20) + 5
    },
    {
      id: 2,
      user: "Maharashtra Logistics",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80",
      rating: warehouse.rating > 4.0 ? Math.ceil(warehouse.rating) : 4,
      date: "2024-01-10",
      comment: `Good facility with proper infrastructure. The pricing at ₹${warehouse.pricing}/sq ft is competitive and the location in ${warehouse.district} is strategic.`,
      helpful: Math.floor(Math.random() * 15) + 3
    },
    {
      id: 3,
      user: "Regional Distributor",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
      rating: Math.floor(warehouse.rating),
      date: "2023-12-28",
      comment: `Been using this facility for several months. The ${warehouse.ownershipCertificate.toLowerCase()} status gives confidence and the micro rental spaces (${warehouse.microRentalSpaces}) are very useful.`,
      helpful: Math.floor(Math.random() * 25) + 8
    }
  ];

  // Create additional warehouse images 
  const warehouseImages = [
    warehouse.image,
    "https://images.unsplash.com/photo-1601980169411-4c0d37967c2e?w=800&q=80",
    "https://images.unsplash.com/photo-1553864250-05b20249ee6c?w=800&q=80",
    "https://images.unsplash.com/photo-1565610222536-ef2bdc4a7fd2?w=800&q=80",
    "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&q=80"
  ];

  // Generate mock owner data
  const owner = {
    name: warehouse.warehouseType.includes('APMC') ? "APMC Management" : 
           warehouse.warehouseType.includes('MSWC') ? "MSWC Authority" :
           warehouse.warehouseType.includes('Central') ? "Central Warehousing Corp" :
           `${warehouse.district} Warehousing Pvt Ltd`,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    joined: new Date(warehouse.registrationDate).getFullYear().toString(),
    properties: Math.floor(Math.random() * 15) + 3,
    rating: warehouse.rating,
    verified: warehouse.ownershipCertificate === 'Verified',
    phone: warehouse.contactNo,
    email: warehouse.emailId,
    whatsapp: warehouse.contactNo
  };

  // Calculate availability
  const availableArea = Math.floor(warehouse.size * (1 - warehouse.occupancy));
  const occupancyPercentage = warehouse.occupancy * 100;

  return (
    <div className="min-h-screen bg-white">
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
            <Button variant="ghost" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link to="/warehouses" className="hover:text-blue-600">Warehouses</Link>
          <span>/</span>
          <span className="text-gray-900">{warehouse.whId}</span>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Section */}
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/warehouses">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Search
                    </Link>
                  </Button>
                  <Badge>{warehouse.warehouseType}</Badge>
                  <Badge className={`${
                    warehouse.status === 'Active' ? 'bg-green-100 text-green-800' :
                    warehouse.status === 'Inactive' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {warehouse.status}
                  </Badge>
                  {warehouse.ownershipCertificate === 'Verified' && (
                    <Badge className="bg-blue-100 text-blue-800">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{warehouse.warehouseType}</h1>
                <p className="text-gray-600 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {warehouse.address}, {warehouse.district}, {warehouse.state} - {warehouse.pincode}
                </p>
                <div className="flex items-center space-x-4 mt-3">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{warehouse.rating}</span>
                    <span className="text-gray-500">({warehouse.reviews} reviews)</span>
                  </div>
                  <Separator orientation="vertical" className="h-4" />
                  <span className="text-sm text-gray-600">
                    <Package className="h-4 w-4 inline mr-1" />
                    {warehouse.capacity.toLocaleString()} MT capacity
                  </span>
                  <Separator orientation="vertical" className="h-4" />
                  <span className="text-sm text-gray-600">ID: {warehouse.whId}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => setIsFavorited(!isFavorited)}>
                  <Heart className={`h-4 w-4 mr-2 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                  Save
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-video rounded-lg overflow-hidden">
                <img
                  src={warehouseImages[selectedImage]}
                  alt={warehouse.warehouseType}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-5 gap-2">
                {warehouseImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-video rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Tabs Section */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="specifications">Details</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">{warehouse.description}</p>
                    <div className="mt-4 grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <span className="text-sm text-gray-500">Registration Date:</span>
                        <div className="font-medium">{warehouse.registrationDate}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Valid Until:</span>
                        <div className="font-medium">{warehouse.registrationValidUpto}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">License Number:</span>
                        <div className="font-medium">{warehouse.licenceNumber}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Micro Rental Spaces:</span>
                        <div className="font-medium">{warehouse.microRentalSpaces}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Amenities & Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {(showAllAmenities ? warehouse.amenities : warehouse.amenities.slice(0, 9)).map((amenity) => (
                        <div key={amenity} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{amenity}</span>
                        </div>
                      ))}
                    </div>
                    {warehouse.amenities.length > 9 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setShowAllAmenities(!showAllAmenities)}
                        className="mt-4"
                      >
                        {showAllAmenities ? 'Show Less' : `Show ${warehouse.amenities.length - 9} More`}
                      </Button>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Capacity & Availability</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-500">Total Capacity</span>
                        <div className="text-2xl font-bold text-blue-600">
                          {warehouse.capacity.toLocaleString()} MT
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Total Area</span>
                        <div className="text-2xl font-bold text-green-600">
                          {warehouse.size.toLocaleString()} sq ft
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-500">Available Area</span>
                        <div className="text-xl font-bold text-green-600">
                          {availableArea.toLocaleString()} sq ft
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Occupancy Rate</span>
                        <div className="text-xl font-bold text-orange-600">
                          {occupancyPercentage.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Current Occupancy</span>
                        <span>{occupancyPercentage.toFixed(1)}%</span>
                      </div>
                      <Progress value={occupancyPercentage} className="h-3" />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="specifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Facility Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">Physical Specifications</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Area</span>
                            <span className="font-medium">{warehouse.size.toLocaleString()} sq ft</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Capacity</span>
                            <span className="font-medium">{warehouse.capacity.toLocaleString()} MT</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Warehouse Type</span>
                            <span className="font-medium">{warehouse.warehouseType}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-3">Operational Details</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Current Occupancy</span>
                            <span className="font-medium">{(warehouse.occupancy * 100).toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Micro Spaces</span>
                            <span className="font-medium">{warehouse.microRentalSpaces} units</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Certification</span>
                            <span className="font-medium">{warehouse.ownershipCertificate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Pricing Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Rate (per sq ft/month)</span>
                          <span className="font-medium">₹{warehouse.pricing}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Estimated per MT/month</span>
                          <span className="font-medium">₹{warehouse.pricePerMT}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Minimum Storage</span>
                          <span className="font-medium">100 MT</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Minimum Period</span>
                          <span className="font-medium">3 months</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="location" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Location Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Address</h4>
                        <p className="text-gray-600">{warehouse.address}</p>
                        <p className="text-gray-600">{warehouse.district}, {warehouse.state} - {warehouse.pincode}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Area Information</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">{warehouse.district} District</Badge>
                          <Badge variant="secondary">{warehouse.state}</Badge>
                          <Badge variant="secondary">{warehouse.warehouseType}</Badge>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Connectivity</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div className="flex items-center space-x-2">
                            <Truck className="h-4 w-4 text-blue-600" />
                            <span className="text-sm">Highway Access</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Factory className="h-4 w-4 text-blue-600" />
                            <span className="text-sm">Industrial Area</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Map placeholder */}
                <Card>
                  <CardHeader>
                    <CardTitle>Map View</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Interactive map will be integrated here</p>
                        <p className="text-sm text-gray-400">Showing {warehouse.district}, {warehouse.state}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Reviews</CardTitle>
                    <CardDescription>
                      {warehouse.reviews} reviews • Average rating {warehouse.rating}/5
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {mockReviews.map((review) => (
                        <div key={review.id} className="border-b pb-6 last:border-b-0">
                          <div className="flex items-start space-x-4">
                            <Avatar>
                              <AvatarImage src={review.avatar} />
                              <AvatarFallback>{review.user[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="font-medium">{review.user}</span>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500">{review.date}</span>
                              </div>
                              <p className="text-gray-600 mb-2">{review.comment}</p>
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <span className="text-sm text-gray-500">Helpful ({review.helpful})</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Booking & Owner Info */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl text-green-600">₹{warehouse.pricing}</CardTitle>
                    <CardDescription>per sq ft / month</CardDescription>
                  </div>
                  <Badge className={`${
                    warehouse.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {warehouse.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Available Area</span>
                    <div className="font-bold text-blue-600">{availableArea.toLocaleString()} sq ft</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Capacity</span>
                    <div className="font-medium">{warehouse.capacity.toLocaleString()} MT</div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => setShowInquiryModal(true)}
                  >
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Send Inquiry
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`https://wa.me/${owner.whatsapp}?text=${encodeURIComponent(`Hi! I'm interested in your warehouse facility: ${warehouse.warehouseType} in ${warehouse.district}. Capacity: ${warehouse.capacity}MT, Area: ${warehouse.size} sq ft`)}`, '_blank')}
                      className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                    >
                      <MessageSquare className="mr-1 h-4 w-4" />
                      WhatsApp
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`tel:${owner.phone}`, '_self')}
                    >
                      <Phone className="mr-1 h-4 w-4" />
                      Call
                    </Button>
                  </div>
                  <Button variant="outline" className="w-full" size="lg">
                    <Calendar className="mr-2 h-5 w-5" />
                    Schedule Visit
                  </Button>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-sm">Verified Contact</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Contact: {warehouse.contactNo}<br/>
                    Email: {warehouse.emailId}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Owner Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>Facility Manager</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={owner.avatar} />
                    <AvatarFallback>{owner.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-sm">{owner.name}</h3>
                      {owner.verified && (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                    <div className="flex items-center space-x-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{owner.rating}</span>
                      <span className="text-sm text-gray-500">• {owner.properties} properties</span>
                    </div>
                    <p className="text-sm text-gray-600">Member since {owner.joined}</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Button variant="outline" className="w-full" size="sm">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                  <Button variant="ghost" className="w-full" size="sm">
                    View All Properties
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Similar Properties */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Properties</CardTitle>
                <CardDescription>In {warehouse.district}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {maharashtraWarehouses
                    .filter(w => w.district === warehouse.district && w.whId !== warehouse.whId && w.warehouseType === warehouse.warehouseType)
                    .slice(0, 2)
                    .map((similarWarehouse) => (
                    <div key={similarWarehouse.whId} className="flex space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={similarWarehouse.image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm line-clamp-1">{similarWarehouse.warehouseType}</h4>
                        <p className="text-xs text-gray-500">{similarWarehouse.district}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs font-medium text-green-600">₹{similarWarehouse.pricing}/sq ft</span>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs ml-1">{similarWarehouse.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-4" size="sm" asChild>
                  <Link to={`/warehouses?district=${warehouse.district}`}>
                    View More in {warehouse.district}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={showInquiryModal}
        onClose={() => setShowInquiryModal(false)}
        warehouse={{
          id: warehouse.whId,
          name: warehouse.warehouseType,
          location: `${warehouse.district}, ${warehouse.state}`,
          pricePerSqFt: warehouse.pricing,
          availableArea: availableArea,
          owner: owner
        }}
      />
    </div>
  );
}
