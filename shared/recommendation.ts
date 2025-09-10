import type { RecommendationPreferences, RecommendedWarehouse } from "./api";
import { maharashtraWarehouses, type WarehouseData } from "../client/data/warehouses";

// Normalize helper 0..1
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

function scoreWarehouse(w: WarehouseData, prefs: RecommendationPreferences): { score: number; reasons: string[]; rec: RecommendedWarehouse } {
  const reasons: string[] = [];

  // District score
  let districtScore = 0;
  if (prefs.district) {
    const exact = w.district.toLowerCase() === prefs.district.toLowerCase();
    const partial = w.address.toLowerCase().includes(prefs.district.toLowerCase());
    districtScore = exact ? 1 : partial ? 0.6 : 0;
    if (districtScore > 0) reasons.push(exact ? `Located in preferred district ${w.district}` : `Near ${prefs.district}`);
  } else {
    districtScore = 0.5; // neutral when not specified
  }

  // Price score (closer to target is better, within +/- 30%)
  let priceScore = 0.5;
  if (typeof prefs.targetPrice === "number" && prefs.targetPrice > 0) {
    const diff = Math.abs(w.pricing - prefs.targetPrice);
    const tolerance = prefs.targetPrice * 0.3 + 1; // avoid zero
    priceScore = clamp01(1 - diff / tolerance);
    if (priceScore >= 0.7) reasons.push(`Matches your budget (₹${w.pricing}/sqft)`);
    else if (w.pricing < prefs.targetPrice) reasons.push(`Under budget (₹${w.pricing}/sqft)`);
  }

  // Area score (prefer >= minArea, but allow up to 2x for diminishing returns)
  const totalArea = w.size;
  let areaScore = 0.5;
  if (typeof prefs.minAreaSqft === "number" && prefs.minAreaSqft > 0) {
    const ratio = totalArea / prefs.minAreaSqft;
    areaScore = clamp01(ratio / 2); // 1.0 at 2x area
    if (ratio >= 1) reasons.push(`Satisfies area need (${totalArea.toLocaleString()} sqft)`);
  }

  // Type preference
  let typeScore = 0.5;
  if (prefs.preferredType) {
    typeScore = w.warehouseType === prefs.preferredType ? 1 : 0;
    if (typeScore === 1) reasons.push(`Preferred type: ${w.warehouseType}`);
  }

  // Availability score (lower occupancy preferred)
  const availability = 1 - w.occupancy; // 1 means fully available
  let availabilityScore = prefs.preferAvailability ? availability : 0.5;
  if (prefs.preferAvailability && availability >= 0.3) reasons.push(`Good availability (${Math.round(availability * 100)}%)`);

  // Verified bonus
  const verifiedBonus = prefs.preferVerified ? (w.ownershipCertificate === "Verified" ? 0.1 : 0) : 0;
  if (verifiedBonus > 0) reasons.push("Verified facility");

  // Quality proxy from rating
  const ratingScore = clamp01((w.rating - 3) / 2); // map 3..5 -> 0..1

  // Weighted sum
  const score = clamp01(
    0.25 * districtScore +
    0.2 * priceScore +
    0.2 * areaScore +
    0.15 * typeScore +
    0.15 * availabilityScore +
    0.05 * ratingScore +
    verifiedBonus
  );

  const availableArea = Math.max(0, Math.round(w.size * (1 - w.occupancy)));

  const rec: RecommendedWarehouse = {
    whId: w.whId,
    name: `${w.warehouseType} • ${w.district}`,
    location: `${w.district}, ${w.state}`,
    district: w.district,
    state: w.state,
    pricePerSqFt: w.pricing,
    totalAreaSqft: w.size,
    availableAreaSqft: availableArea,
    rating: w.rating,
    reviews: w.reviews,
    image: w.image,
    type: w.warehouseType,
    matchScore: Math.round(score * 100),
    reasons: reasons.map((r) => ({ label: r })),
  };

  return { score, reasons, rec };
}

export function recommendWarehouses(prefs: RecommendationPreferences, limit = 12): RecommendedWarehouse[] {
  const scored = maharashtraWarehouses.map((w) => scoreWarehouse(w, prefs));
  // Sort by score desc then by price asc as tie breaker
  scored.sort((a, b) => b.score - a.score || a.rec.pricePerSqFt - b.rec.pricePerSqFt);
  return scored.slice(0, limit).map((s) => s.rec);
}
