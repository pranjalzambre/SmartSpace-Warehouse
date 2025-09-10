import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Building2, Star, ArrowRight, Bot, Filter, Phone, Calendar, Truck, Package, TrendingUp, Users, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import AIRecommendations from "@/components/AIRecommendations";
import { maharashtraWarehouses, filterOptions, platformStats, type WarehouseData } from "@/data/warehouses";

interface FilterState {
  district: string;
  warehouseType: string;
  capacityRange: string;
  priceRange: string;
  occupancyRange: string;
  certificate: string;
  status: string;
}

export default function Warehouses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    district: "",
    warehouseType: "",
    capacityRange: "",
    priceRange: "",
    occupancyRange: "",
    certificate: "",
    status: ""
  });
  const [showFilters, setShowFilters] = useState(false);

  const filteredWarehouses = useMemo(() => {
    let result = maharashtraWarehouses;

    // Search filter
    if (searchQuery) {
      result = result.filter(warehouse => 
        warehouse.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        warehouse.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        warehouse.whId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        warehouse.warehouseType.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // District filter
    if (filters.district) {
      result = result.filter(warehouse => warehouse.district === filters.district);
    }

    // Warehouse type filter
    if (filters.warehouseType) {
      result = result.filter(warehouse => warehouse.warehouseType === filters.warehouseType);
    }

    // Capacity range filter
    if (filters.capacityRange) {
      const range = filterOptions.capacityRanges.find(r => r.label === filters.capacityRange);
      if (range) {
        result = result.filter(warehouse => 
          warehouse.capacity >= range.min && warehouse.capacity <= range.max
        );
      }
    }

    // Price range filter
    if (filters.priceRange) {
      const range = filterOptions.priceRanges.find(r => r.label === filters.priceRange);
      if (range) {
        result = result.filter(warehouse => 
          warehouse.pricing >= range.min && warehouse.pricing <= range.max
        );
      }
    }

    // Occupancy range filter
    if (filters.occupancyRange) {
      const range = filterOptions.occupancyRanges.find(r => r.label === filters.occupancyRange);
      if (range) {
        result = result.filter(warehouse => 
          warehouse.occupancy >= range.min && warehouse.occupancy <= range.max
        );
      }
    }

    // Certificate filter
    if (filters.certificate) {
      result = result.filter(warehouse => warehouse.ownershipCertificate === filters.certificate);
    }

    // Status filter
    if (filters.status) {
      result = result.filter(warehouse => warehouse.status === filters.status);
    }

    return result;
  }, [searchQuery, filters]);

  const clearFilters = () => {
    setFilters({
      district: "",
      warehouseType: "",
      capacityRange: "",
      priceRange: "",
      occupancyRange: "",
      certificate: "",
      status: ""
    });
    setSearchQuery("");
  };

  const getAvailabilityText = (occupancy: number) => {
    if (occupancy < 0.3) return { text: "Excellent Availability", color: "text-green-600" };
    if (occupancy < 0.7) return { text: "Good Availability", color: "text-blue-600" };
    return { text: "Limited Availability", color: "text-orange-600" };
  };

  const WarehouseCard = ({ warehouse }: { warehouse: WarehouseData }) => {
    const availability = getAvailabilityText(warehouse.occupancy);
    
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow relative">
        <div className="aspect-video overflow-hidden relative">
          <img
            src={warehouse.image}
            alt={warehouse.address}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <Badge className={`text-white text-xs ${
              warehouse.status === 'Active' ? 'bg-green-600' : 
              warehouse.status === 'Inactive' ? 'bg-yellow-600' : 'bg-red-600'
            }`}>
              {warehouse.status}
            </Badge>
          </div>
          {/* Certificate Badge */}
          {warehouse.ownershipCertificate === 'Verified' && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-blue-600 text-white text-xs">
                <Shield className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            </div>
          )}
          {/* Capacity Badge */}
          <div className="absolute bottom-3 right-3">
            <Badge className="bg-purple-600 text-white text-xs">
              {warehouse.capacity.toLocaleString()} MT
            </Badge>
          </div>
        </div>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg line-clamp-2">{warehouse.warehouseType}</CardTitle>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{warehouse.rating}</span>
              <span className="text-sm text-gray-500">({warehouse.reviews})</span>
            </div>
          </div>
          <CardDescription className="flex items-center">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="line-clamp-2">{warehouse.district}, {warehouse.state}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Capacity:</span>
              <div className="font-medium">{warehouse.capacity.toLocaleString()} MT</div>
            </div>
            <div>
              <span className="text-gray-500">Area:</span>
              <div className="font-medium text-blue-600">{warehouse.size.toLocaleString()} sq ft</div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <span className="text-2xl font-bold text-green-600">₹{warehouse.pricing}</span>
              <span className="text-gray-500">/sq ft/month</span>
            </div>
            <div className={`text-sm font-medium ${availability.color}`}>
              {availability.text}
            </div>
          </div>

          {/* Occupancy Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Occupancy</span>
              <span>{Math.round(warehouse.occupancy * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all ${
                  warehouse.occupancy < 0.3 ? 'bg-green-500' : 
                  warehouse.occupancy < 0.7 ? 'bg-blue-500' : 'bg-orange-500'
                }`}
                style={{ width: `${warehouse.occupancy * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1">
              {warehouse.amenities.slice(0, 3).map((amenity) => (
                <Badge key={amenity} variant="secondary" className="text-xs">
                  {amenity}
                </Badge>
              ))}
              {warehouse.amenities.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{warehouse.amenities.length - 3} more
                </Badge>
              )}
            </div>

            {/* Contact & Info */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center">
                <Phone className="w-3 h-3 mr-1" />
                {warehouse.contactNo}
              </span>
              <span className="flex items-center">
                <Users className="w-3 h-3 mr-1" />
                {warehouse.microRentalSpaces} micro spaces
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>ID: {warehouse.whId}</span>
              <span>Valid till {new Date(warehouse.registrationValidUpto).getFullYear()}</span>
            </div>
          </div>
          
          <Button className="w-full" asChild>
            <Link to={`/warehouse/${warehouse.whId}`}>
              View Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  };

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
            <Link to="/warehouses" className="text-blue-600 font-medium">Find Warehouses</Link>
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

      <div className="container mx-auto px-4 py-8">
        {/* Platform Stats */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Maharashtra Warehouse Directory</h1>
          <p className="text-gray-600 mb-6">Comprehensive database of verified warehouse facilities across Maharashtra</p>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-2xl font-bold text-blue-600">{platformStats.totalWarehouses.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Total Warehouses</div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-2xl font-bold text-green-600">{Math.round(platformStats.totalCapacity / 1000).toLocaleString()}K</div>
              <div className="text-sm text-gray-500">MT Capacity</div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-2xl font-bold text-purple-600">{Math.round(platformStats.totalArea / 1000000).toLocaleString()}M</div>
              <div className="text-sm text-gray-500">Sq Ft Area</div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-2xl font-bold text-orange-600">{platformStats.districtsCount}</div>
              <div className="text-sm text-gray-500">Districts</div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-2xl font-bold text-red-600">{Math.round(platformStats.averageOccupancy * 100)}%</div>
              <div className="text-sm text-gray-500">Avg Occupancy</div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-2xl font-bold text-cyan-600">{platformStats.verifiedWarehouses}</div>
              <div className="text-sm text-gray-500">Verified</div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="browse" className="flex items-center space-x-2">
              <Search className="h-4 w-4" />
              <span>Browse & Search</span>
            </TabsTrigger>
            <TabsTrigger value="ai-recommendations" className="flex items-center space-x-2">
              <Bot className="h-4 w-4" />
              <span>AI Recommendations</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai-recommendations">
            <AIRecommendations />
          </TabsContent>

          <TabsContent value="browse">
            {/* Search and Filter Bar */}
            <div className="mb-8 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by warehouse ID, type, district, or address..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2"
                >
                  <Filter className="h-4 w-4" />
                  <span>Advanced Filters</span>
                </Button>
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <Card className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">District</label>
                      <Select value={filters.district} onValueChange={(value) => 
                        setFilters(prev => ({ ...prev, district: value }))
                      }>
                        <SelectTrigger>
                          <SelectValue placeholder="All Districts" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Districts</SelectItem>
                          {filterOptions.districts.map(district => (
                            <SelectItem key={district} value={district}>{district}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Warehouse Type</label>
                      <Select value={filters.warehouseType} onValueChange={(value) => 
                        setFilters(prev => ({ ...prev, warehouseType: value }))
                      }>
                        <SelectTrigger>
                          <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Types</SelectItem>
                          {filterOptions.warehouseTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Capacity Range</label>
                      <Select value={filters.capacityRange} onValueChange={(value) => 
                        setFilters(prev => ({ ...prev, capacityRange: value }))
                      }>
                        <SelectTrigger>
                          <SelectValue placeholder="Any Capacity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any Capacity</SelectItem>
                          {filterOptions.capacityRanges.map(range => (
                            <SelectItem key={range.label} value={range.label}>{range.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Price Range</label>
                      <Select value={filters.priceRange} onValueChange={(value) => 
                        setFilters(prev => ({ ...prev, priceRange: value }))
                      }>
                        <SelectTrigger>
                          <SelectValue placeholder="Any Price" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any Price</SelectItem>
                          {filterOptions.priceRanges.map(range => (
                            <SelectItem key={range.label} value={range.label}>{range.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Availability</label>
                      <Select value={filters.occupancyRange} onValueChange={(value) => 
                        setFilters(prev => ({ ...prev, occupancyRange: value }))
                      }>
                        <SelectTrigger>
                          <SelectValue placeholder="Any Availability" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any Availability</SelectItem>
                          {filterOptions.occupancyRanges.map(range => (
                            <SelectItem key={range.label} value={range.label}>{range.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Certification</label>
                      <Select value={filters.certificate} onValueChange={(value) => 
                        setFilters(prev => ({ ...prev, certificate: value }))
                      }>
                        <SelectTrigger>
                          <SelectValue placeholder="Any Certificate" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any Certificate</SelectItem>
                          {filterOptions.certificateTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Status</label>
                      <Select value={filters.status} onValueChange={(value) => 
                        setFilters(prev => ({ ...prev, status: value }))
                      }>
                        <SelectTrigger>
                          <SelectValue placeholder="Any Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any Status</SelectItem>
                          {filterOptions.statusTypes.map(status => (
                            <SelectItem key={status} value={status}>{status}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-end">
                      <Button variant="outline" onClick={clearFilters} className="w-full">
                        Clear All Filters
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            {/* Results Summary */}
            <div className="mb-6 flex justify-between items-center">
              <span className="text-gray-600">
                <strong>{filteredWarehouses.length.toLocaleString()}</strong> of {maharashtraWarehouses.length.toLocaleString()} warehouses found
                {searchQuery && <span> for "{searchQuery}"</span>}
              </span>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <TrendingUp className="h-4 w-4" />
                <span>Real-time verified data</span>
              </div>
            </div>

            {/* Warehouses Grid */}
            {filteredWarehouses.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWarehouses.map(warehouse => (
                  <WarehouseCard key={warehouse.whId} warehouse={warehouse} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No warehouses found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
                <Button onClick={clearFilters}>Clear All Filters</Button>
              </div>
            )}

            {/* Load More Button - for pagination */}
            {filteredWarehouses.length > 0 && filteredWarehouses.length < maharashtraWarehouses.length && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Warehouses
                  <Package className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Quick Actions */}
            <div className="mt-12 text-center">
              <div className="bg-blue-50 rounded-lg p-6 max-w-2xl mx-auto">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Need help finding the perfect warehouse?</h3>
                <p className="text-gray-600 mb-4">Get personalized recommendations or list your own warehouse facility</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild>
                    <Link to="/contact">Contact Our Team</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/list-property">List Your Property</Link>
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
