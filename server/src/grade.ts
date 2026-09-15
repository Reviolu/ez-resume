import { Criterion, CriterionResult, Review, Rubric } from './types';

const STRUCTURAL : Criterion[] = [
    {
        id: 'contact',
        label: 'Contact information is present',
        hint: 'Make sure your email and phone number are easy to find.',
        weight: 5,
        keywords: ['email', 'phone', 'contact', 'mobile', '@'],
        minHits: 1,
    },
    {
        id: "verbs",
        label: "Opens bullet points with action verbs",
        hint: "Start each bullet with a verb — built, led, designed. 'Responsible for' describes a job ad, not what you did.",
        weight: 3,
        keywords: ["built", "led", "designed", "developed", "created", "implemented", "delivered", "automated"],
        minHits: 3,
    },
    {
        id: "numbers",
        label: "Contains numbers",
        hint: "A resume with no digits reads as vague. Add dates, team sizes, volumes, or percentages.",
        weight: 3,
        keywords: [],
        minHits: 1,
    },
];

function countHits(text: string, critereon: Criterion): number {
    if (critereon.id === "numbers") {
        const regex = /\d+/g;
        const matches = text.match(regex);
        return matches ? matches.length : 0;
    }

    let hits = 0;
    for (const keyword of critereon.keywords) {
        if (text.toLowerCase().includes(keyword.toLowerCase())) {
            hits++;
        }
    }

    return hits;
}

function check(text: string, criterion: Criterion): CriterionResult {
    const hits = countHits(text, criterion);
    const passed = hits >= criterion.minHits;

    return {
        criterionId: criterion.id,
        label: criterion.label,
        weight: criterion.weight,
        hits,
        passed,
        advice: passed ? null : criterion.hint,
    };
}

export function gradeResume(resumeText: string, rubric: Rubric): Review {
  const text = resumeText.toLowerCase();

  const results = rubric.criteria.map((c) => check(text, c));
  const structural = STRUCTURAL.map((c) => check(text, c));

  const all = [...results, ...structural];
  const earned = all.filter((r) => r.passed).reduce((sum, r) => sum + r.weight, 0);
  const total = all.reduce((sum, r) => sum + r.weight, 0);

  return {
    rubricId: rubric.id,
    field: rubric.field,
    score: total === 0 ? 0 : Math.round((earned / total) * 100),
    wordCount: resumeText.trim().split(/\s+/).filter(Boolean).length,
    results,
    structural,
  };
}