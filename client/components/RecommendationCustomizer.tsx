import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X, Settings, Zap, Target } from "lucide-react";
import { filterOptions } from "@/data/warehouses";

// Define types locally to avoid import issues
interface RecommendationPreferences {
  district?: string;
  targetPrice?: number;
  minAreaSqft?: number;
  preferredType?: string;
  preferVerified?: boolean;
  preferAvailability?: boolean;
}

interface RecommendationCustomizerProps {
  preferences: RecommendationPreferences;
  onPreferencesChange: (preferences: RecommendationPreferences) => void;
  onClose: () => void;
  isOpen: boolean;
}

export default function RecommendationCustomizer({
  preferences,
  onPreferencesChange,
  onClose,
  isOpen
}: RecommendationCustomizerProps) {
  const [localPrefs, setLocalPrefs] = useState<RecommendationPreferences>(preferences);

  if (!isOpen) return null;

  const updatePref = <K extends keyof RecommendationPreferences>(
    key: K,
    value: RecommendationPreferences[K]
  ) => {
    setLocalPrefs(prev => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    onPreferencesChange(localPrefs);
    onClose();
  };

  const handleReset = () => {
    const defaultPrefs: RecommendationPreferences = {
      preferVerified: true,
      preferAvailability: true,
    };
    setLocalPrefs(defaultPrefs);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-blue-600" />
              <CardTitle>Customize AI Recommendations</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>
            Personalize your warehouse recommendations by setting your preferences
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Location Preferences */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-orange-600" />
              <Label className="text-sm font-medium">Location</Label>
            </div>
            <div className="grid gap-3">
              <div>
                <Label htmlFor="district" className="text-sm">Preferred District</Label>
                <Select
                  value={localPrefs.district || ""}
                  onValueChange={(value) => updatePref('district', value || undefined)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any district" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any district</SelectItem>
                    {filterOptions.districts.map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          {/* Budget & Space */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-green-600" />
              <Label className="text-sm font-medium">Budget & Space</Label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="targetPrice" className="text-sm">Target Price (₹/sqft/month)</Label>
                <Input
                  id="targetPrice"
                  type="number"
                  placeholder="e.g. 6.5"
                  min="0"
                  step="0.1"
                  value={localPrefs.targetPrice || ""}
                  onChange={(e) => updatePref('targetPrice', e.target.value ? parseFloat(e.target.value) : undefined)}
                />
              </div>
              <div>
                <Label htmlFor="minArea" className="text-sm">Minimum Area (sqft)</Label>
                <Input
                  id="minArea"
                  type="number"
                  placeholder="e.g. 50000"
                  min="0"
                  value={localPrefs.minAreaSqft || ""}
                  onChange={(e) => updatePref('minAreaSqft', e.target.value ? parseInt(e.target.value) : undefined)}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Warehouse Type */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Warehouse Type</Label>
            <Select
              value={localPrefs.preferredType || ""}
              onValueChange={(value) => updatePref('preferredType', value || undefined)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any type</SelectItem>
                {filterOptions.warehouseTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Quality Preferences */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Quality Preferences</Label>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm">Prefer Verified Facilities</Label>
                <p className="text-xs text-gray-500">Prioritize warehouses with verified ownership certificates</p>
              </div>
              <Switch
                checked={localPrefs.preferVerified || false}
                onCheckedChange={(checked) => updatePref('preferVerified', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm">Prefer High Availability</Label>
                <p className="text-xs text-gray-500">Prioritize warehouses with more available space</p>
              </div>
              <Switch
                checked={localPrefs.preferAvailability || false}
                onCheckedChange={(checked) => updatePref('preferAvailability', checked)}
              />
            </div>
          </div>

          {/* Active Filters Summary */}
          {(localPrefs.district || localPrefs.targetPrice || localPrefs.minAreaSqft || localPrefs.preferredType) && (
            <>
              <Separator />
              <div className="space-y-2">
                <Label className="text-sm font-medium">Active Filters</Label>
                <div className="flex flex-wrap gap-2">
                  {localPrefs.district && (
                    <Badge variant="secondary">{localPrefs.district}</Badge>
                  )}
                  {localPrefs.targetPrice && (
                    <Badge variant="secondary">₹{localPrefs.targetPrice}/sqft</Badge>
                  )}
                  {localPrefs.minAreaSqft && (
                    <Badge variant="secondary">{localPrefs.minAreaSqft.toLocaleString()} sqft min</Badge>
                  )}
                  {localPrefs.preferredType && (
                    <Badge variant="secondary">{localPrefs.preferredType}</Badge>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Actions */}
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={handleReset}>
              Reset to Default
            </Button>
            <div className="space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleApply}>
                Apply Preferences
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
