import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, Star, MapPin, TrendingUp, Target, Zap, 
  Building2, ArrowRight, Sparkles, Brain, ChevronRight, RefreshCw, Settings
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSmartRecommendations } from "@/hooks/use-recommendations";
import RecommendationCustomizer from "./RecommendationCustomizer";

export default function AIRecommendations() {
  const {
    data,
    isLoading,
    error,
    refetch,
    preferences,
    customizeMode,
    setCustomizeMode,
    setPreferences,
  } = useSmartRecommendations();

  const recommendations = data?.items || [];

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-100";
    if (score >= 80) return "text-blue-600 bg-blue-100";
    if (score >= 70) return "text-orange-600 bg-orange-100";
    return "text-gray-600 bg-gray-100";
  };

  if (error) {
    return (
      <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bot className="h-6 w-6 text-red-600" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">AI Recommendations Unavailable</h3>
                <p className="text-sm text-gray-600">Unable to load personalized recommendations</p>
              </div>
            </div>
            <Button onClick={() => refetch()} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative">
              <Bot className="h-6 w-6 text-blue-600" />
              <Sparkles className="h-3 w-3 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">AI is analyzing warehouses for you...</h3>
          </div>
          <div className="space-y-3">
            <div className="animate-pulse">
              <div className="h-2 bg-blue-200 rounded mb-2"></div>
              <div className="text-sm text-gray-600">Analyzing preferences</div>
            </div>
            <div className="animate-pulse">
              <div className="h-2 bg-blue-300 rounded mb-2"></div>
              <div className="text-sm text-gray-600">Matching warehouses</div>
            </div>
            <div className="animate-pulse">
              <div className="h-2 bg-blue-400 rounded mb-2"></div>
              <div className="text-sm text-gray-600">Calculating scores</div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* AI Recommendations Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bot className="h-6 w-6 text-blue-600" />
                <Sparkles className="h-3 w-3 text-blue-400 absolute -top-1 -right-1" />
              </div>
              <div>
                <CardTitle className="text-lg text-gray-900">AI-Powered Recommendations</CardTitle>
                <CardDescription>
                  {recommendations.length > 0 
                    ? `Found ${recommendations.length} personalized warehouse suggestions`
                    : "Personalized warehouse suggestions based on your preferences"
                  }
                </CardDescription>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => refetch()}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCustomizeMode(true)}
              >
                <Settings className="h-4 w-4 mr-2" />
                Customize
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Active Preferences Summary */}
      {(preferences.district || preferences.targetPrice || preferences.minAreaSqft || preferences.preferredType) && (
        <Card className="bg-gray-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">Active Preferences:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {preferences.district && (
                  <Badge variant="secondary">{preferences.district}</Badge>
                )}
                {preferences.targetPrice && (
                  <Badge variant="secondary">₹{preferences.targetPrice}/sqft</Badge>
                )}
                {preferences.minAreaSqft && (
                  <Badge variant="secondary">{preferences.minAreaSqft.toLocaleString()} sqft min</Badge>
                )}
                {preferences.preferredType && (
                  <Badge variant="secondary">{preferences.preferredType}</Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendations Grid */}
      {recommendations.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((warehouse, index) => (
            <Card key={warehouse.whId} className="overflow-hidden hover:shadow-lg transition-all duration-300 relative">
              {index === 0 && (
                <div className="absolute top-3 right-3 z-10">
                  <Badge className="bg-green-500 text-white">
                    <Star className="h-3 w-3 mr-1" />
                    Best Match
                  </Badge>
                </div>
              )}

              <div className="aspect-video overflow-hidden relative">
                <img
                  src={warehouse.image}
                  alt={warehouse.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getMatchScoreColor(warehouse.matchScore)}`}>
                    {warehouse.matchScore}% match
                  </div>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{warehouse.name}</CardTitle>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{warehouse.rating}</span>
                  </div>
                </div>
                <CardDescription className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {warehouse.location}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">₹{warehouse.pricePerSqFt}</span>
                    <span className="text-gray-500 text-sm">/sq ft/month</span>
                  </div>
                  <Badge variant="outline">{warehouse.type}</Badge>
                </div>

                <div>
                  <span className="text-sm text-gray-500">Available Space</span>
                  <div className="font-medium text-green-600">{warehouse.availableAreaSqft.toLocaleString()} sq ft</div>
                </div>

                {/* AI Reasoning */}
                {warehouse.reasons.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Brain className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-600">Why this matches</span>
                    </div>
                    <div className="space-y-1">
                      {warehouse.reasons.slice(0, 2).map((reason, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-xs text-gray-600">
                          <ChevronRight className="h-3 w-3 text-green-500" />
                          <span>{reason.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button className="flex-1" asChild>
                    <Link to={`/warehouse/${warehouse.whId}`}>
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Target className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-gray-50">
          <CardContent className="p-8 text-center">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Recommendations Found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your preferences to find more warehouse options.
            </p>
            <Button onClick={() => setCustomizeMode(true)} variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Update Preferences
            </Button>
          </CardContent>
        </Card>
      )}

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-purple-600" />
            <span>AI Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {recommendations.length > 0 ? `${Math.round(recommendations[0]?.matchScore || 0)}%` : '0%'}
              </div>
              <div className="text-sm text-gray-600">Best match score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {recommendations.length}
              </div>
              <div className="text-sm text-gray-600">Recommendations found</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {recommendations.length > 0 
                  ? `₹${Math.round(recommendations.reduce((sum, w) => sum + w.pricePerSqFt, 0) / recommendations.length)}`
                  : '₹0'
                }
              </div>
              <div className="text-sm text-gray-600">Average price/sqft</div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-white rounded-lg border">
            <div className="flex items-start space-x-2">
              <Bot className="h-4 w-4 text-blue-600 mt-0.5" />
              <div className="text-sm text-gray-700">
                <strong>Smart Tip:</strong> {
                  recommendations.length > 0
                    ? `Your top match has ${recommendations[0].matchScore}% compatibility. Consider warehouses with 80%+ match scores for best results.`
                    : "Adjust your preferences using the Customize button to get personalized recommendations based on location, budget, and requirements."
                }
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customization Modal */}
      <RecommendationCustomizer
        isOpen={customizeMode}
        preferences={preferences}
        onPreferencesChange={setPreferences}
        onClose={() => setCustomizeMode(false)}
      />
    </div>
  );
}
