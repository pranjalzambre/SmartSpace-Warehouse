import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin, Building2, Users, Star, ArrowRight, CheckCircle, TrendingUp, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  const [searchLocation, setSearchLocation] = useState("");

  const featuredWarehouses = [
    {
      id: 1,
      name: "Prime Industrial Hub",
      location: "Bhiwandi, Mumbai",
      totalArea: "50,000 sq ft",
      availableArea: "12,000 sq ft",
      pricePerSqFt: "₹25",
      rating: 4.8,
      reviews: 24,
      amenities: ["24/7 Security", "Loading Dock", "Climate Control"],
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80"
    },
    {
      id: 2,
      name: "Metro Logistics Center",
      location: "Gurgaon, Delhi NCR",
      totalArea: "75,000 sq ft",
      availableArea: "25,000 sq ft",
      pricePerSqFt: "₹30",
      rating: 4.9,
      reviews: 31,
      amenities: ["Rail Access", "Cold Storage", "Office Space"],
      image: "https://images.unsplash.com/photo-1601980169411-4c0d37967c2e?w=800&q=80"
    },
    {
      id: 3,
      name: "Gateway Storage Solutions",
      location: "Pune, Maharashtra",
      totalArea: "35,000 sq ft",
      availableArea: "8,500 sq ft", 
      pricePerSqFt: "₹22",
      rating: 4.7,
      reviews: 18,
      amenities: ["High Ceiling", "Truck Access", "Flexible Terms"],
      image: "https://images.unsplash.com/photo-1553864250-05b20249ee6c?w=800&q=80"
    }
  ];

  const stats = [
    { label: "Active Warehouses", value: "500+", icon: Building2 },
    { label: "Business Partners", value: "1,200+", icon: Users },
    { label: "Cities Covered", value: "15+", icon: MapPin },
    { label: "Space Matched", value: "2M+ sq ft", icon: TrendingUp }
  ];

  const features = [
    {
      title: "Smart Matching",
      description: "AI-powered algorithms match your requirements with the perfect warehouse space",
      icon: TrendingUp
    },
    {
      title: "Verified Properties",
      description: "All warehouses are verified and inspected for quality and compliance",
      icon: Shield
    },
    {
      title: "Quick Onboarding",
      description: "Get started in minutes with our streamlined verification process",
      icon: Clock
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="font-bold text-xl text-gray-900">SmartWarehouse</span>
          </div>
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

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="w-fit bg-blue-100 text-blue-800 hover:bg-blue-100">
                  🚀 India's #1 Warehouse Marketplace
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Find Perfect
                  <span className="block text-blue-600">Warehouse Space</span>
                  for Your Business
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Connect with verified warehouse owners across India. From small storage to large distribution centers, 
                  find the perfect space that fits your budget and requirements.
                </p>
              </div>

              {/* Search Bar */}
              <div className="bg-white p-6 rounded-xl shadow-lg border">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Enter city or location"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                  <Button size="lg" className="h-12 px-8" asChild>
                    <Link to="/warehouses">
                      <Search className="mr-2 h-5 w-5" />
                      Search Warehouses
                    </Link>
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="text-sm text-gray-500">Popular:</span>
                  {["Mumbai", "Delhi", "Bangalore", "Pune", "Chennai"].map((city) => (
                    <Button key={city} variant="ghost" size="sm" className="h-7 text-xs">
                      {city}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80"
                  alt="Modern warehouse facility"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Live Inventory Updates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Warehouses */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Warehouse Spaces
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover premium warehouse spaces available for immediate occupancy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredWarehouses.map((warehouse) => (
              <Card key={warehouse.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={warehouse.image}
                    alt={warehouse.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{warehouse.name}</CardTitle>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{warehouse.rating}</span>
                      <span className="text-sm text-gray-500">({warehouse.reviews})</span>
                    </div>
                  </div>
                  <CardDescription className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {warehouse.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Total Area:</span>
                      <div className="font-medium">{warehouse.totalArea}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Available:</span>
                      <div className="font-medium text-green-600">{warehouse.availableArea}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">{warehouse.pricePerSqFt}</span>
                      <span className="text-gray-500">/sq ft/month</span>
                    </div>
                    <Button size="sm" asChild>
                      <Link to={`/warehouse/${warehouse.id}`}>
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {warehouse.amenities.slice(0, 3).map((amenity) => (
                      <Badge key={amenity} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link to="/warehouses">
                View All Warehouses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose SmartWarehouse?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make warehouse discovery and leasing simple, secure, and efficient
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-8 border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
                <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-6" />
                <CardTitle className="text-xl mb-4">{feature.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Ready to Find Your Perfect Warehouse?
            </h2>
            <p className="text-xl text-blue-100">
              Join thousands of businesses already using SmartWarehouse to optimize their logistics
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/register">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
                <Link to="/list-property">List Your Warehouse</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Building2 className="h-8 w-8 text-blue-400" />
                <span className="font-bold text-xl">SmartWarehouse</span>
              </div>
              <p className="text-gray-400">
                India's leading marketplace for warehouse space. Connecting businesses with the perfect storage solutions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">For Businesses</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/warehouses" className="hover:text-white">Find Warehouses</Link></li>
                <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link to="/support" className="hover:text-white">Support</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">For Owners</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/list-property" className="hover:text-white">List Property</Link></li>
                <li><Link to="/dashboard" className="hover:text-white">Dashboard</Link></li>
                <li><Link to="/resources" className="hover:text-white">Resources</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SmartWarehouse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
