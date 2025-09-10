import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// Define types locally to avoid import issues during development
interface RecommendationPreferences {
  district?: string;
  targetPrice?: number;
  minAreaSqft?: number;
  preferredType?: string;
  preferVerified?: boolean;
  preferAvailability?: boolean;
}

interface RecommendationReason {
  label: string;
}

interface RecommendedWarehouse {
  whId: string;
  name: string;
  location: string;
  district: string;
  state: string;
  pricePerSqFt: number;
  totalAreaSqft: number;
  availableAreaSqft: number;
  rating: number;
  reviews: number;
  image: string;
  type: string;
  matchScore: number;
  reasons: RecommendationReason[];
}

interface RecommendationRequest {
  preferences: RecommendationPreferences;
  limit?: number;
}

interface RecommendationResponse {
  items: RecommendedWarehouse[];
}

interface UseRecommendationsOptions {
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
}

export function useRecommendations(
  preferences: RecommendationPreferences,
  limit: number = 12,
  options: UseRecommendationsOptions = {}
) {
  const { enabled = true, refetchOnWindowFocus = false } = options;

  return useQuery({
    queryKey: ['recommendations', preferences, limit],
    queryFn: async (): Promise<RecommendationResponse> => {
      const request: RecommendationRequest = {
        preferences,
        limit
      };

      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`Recommendation API failed: ${response.status}`);
      }

      return response.json();
    },
    enabled,
    refetchOnWindowFocus,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useSmartRecommendations() {
  const [preferences, setPreferences] = useState<RecommendationPreferences>({
    // Default preferences for general recommendations
    preferVerified: true,
    preferAvailability: true,
  });

  const [limit, setLimit] = useState(6);
  const [customizeMode, setCustomizeMode] = useState(false);

  const query = useRecommendations(preferences, limit);

  return {
    ...query,
    preferences,
    setPreferences,
    limit,
    setLimit,
    customizeMode,
    setCustomizeMode,
    updatePreference: <K extends keyof RecommendationPreferences>(
      key: K,
      value: RecommendationPreferences[K]
    ) => {
      setPreferences(prev => ({ ...prev, [key]: value }));
    },
    clearPreferences: () => {
      setPreferences({
        preferVerified: true,
        preferAvailability: true,
      });
    },
  };
}
