import { Rubric } from './types';

const rubrics : Rubric[] = [
    {
        id: 'swe',
        field: 'Software Engineering',
        author: 'John Doe',
        criteria: [
            {
                id: 'swe-lang',
                label: 'Names specific languages or frameworks',
                hint: 'List the languages you actually work in. Recruiters will filter on these',
                weight: 5,
                keywords: ["javascript", "typescript", "python", "java", "c++", "rust", "react", "node", "sql"],
                minHits: 2
            },
            {
                id: "swe-impact",
                label: "Quantifies the effect of your work",
                hint: "Attach a number to at least two bullet points — users served, latency cut, hours saved.",
                weight: 5,
                keywords: ["%", "reduced", "improved", "increased", "users", "faster", "saved"],
                minHits: 2,
            },
            {
                id: "swe-ship",
                label: "Points to something you shipped",
                hint: "Add a GitHub or live project link. A working URL beats a paragraph describing the same project.",
                weight: 4,
                keywords: ["github", "deployed", "launched", "live", "portfolio", "published"],
                minHits: 2,
            },
        ],
    },
    {
        id: "data",
        field: "Data Analytics",
        author: "Seed data",
        criteria: [
            {
                id: "data-tools",
                label: "Names the analysis tools you use",
                hint: "SQL plus one of Python, R, or Excel at minimum. Tool names are what recruiters search for first.",
                weight: 5,
                keywords: ["sql", "python", "excel", "tableau", "power bi", "pandas"],
                minHits: 2,
            },
            {
                id: "data-outcome",
                label: "Ties analysis to a decision",
                hint: "Say what changed because of your analysis, not just what you built.",
                weight: 5,
                keywords: ["insight", "recommendation", "decision", "informed", "identified"],
                minHits: 1,
            },
        ],
    },
];

export function listRubrics(): Rubric[] {
  return rubrics;
}

export function getRubric(id: string): Rubric | undefined {
  return rubrics.find((r) => r.id === id);
}

export function addRubric(rubric: Rubric): Rubric {
  rubrics.push(rubric);
  return rubric;
}