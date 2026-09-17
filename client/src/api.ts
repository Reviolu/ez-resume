import type { Review, RubricSummary } from "./types";

const BASE = "http://localhost:3000";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed (${res.status}).`);
  }

  return res.json() as Promise<T>;
}

export function fetchRubrics() {
  return request<RubricSummary[]>("/api/rubrics");
}

export function submitResume(resumeText: string, rubricId: string) {
  return request<Review>("/api/reviews", {
    method: "POST",
    body: JSON.stringify({ resumeText, rubricId }),
  });
}