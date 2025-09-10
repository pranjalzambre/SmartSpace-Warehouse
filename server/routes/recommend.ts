import type { Request, Response } from "express";
import type { RecommendationRequest, RecommendationResponse } from "../../shared/api";
import { recommendWarehouses } from "../../shared/recommendation";

export function handleRecommend(req: Request, res: Response) {
  try {
    const body = req.body as RecommendationRequest | undefined;
    const prefs = body?.preferences ?? {};
    const limit = body?.limit ?? 12;

    const items = recommendWarehouses(prefs, limit);
    const payload: RecommendationResponse = { items };
    res.json(payload);
  } catch (err) {
    console.error("/api/recommend error", err);
    res.status(500).json({ error: "Failed to generate recommendations" });
  }
}
