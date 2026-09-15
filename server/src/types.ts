export interface Criterion {
    id: string;
    label: string;
    hint: string;
    weight: number;
    keywords: string[];
    minHits: number;
}

export interface Ruberic {
    id: string;
    field: string;
    author: string;
    criteria: Criterion[];
}

export interface CriterionResult {
    criterionId: string;
    label: string;
    weight: number;
    hits: number;
    passed: boolean;
    advice: string | null;
}

export interface Review {
    rubericId: string;
    field: string;
    score: number;
    wordCount: number;
    results: CriterionResult[];
}