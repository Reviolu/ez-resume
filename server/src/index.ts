import express from 'express';
import cors from 'cors';
import { gradeResume } from './grade';
import { getRubric, listRubrics } from './store';

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/rubrics", (_req, res) => {
    res.json(listRubrics().map((r) => ({ id: r.id, field: r.field, author: r.author , criteriaCount: r.criteria.length ,})),
    );
});

app.post("/api/review", (req, res) => {
    const { resumeText, rubricId } = req.body ?? {};

    if (typeof resumeText !== "string" || resumeText.trim().length === 0) {
        return res.status(400).json({ error: "Paste at least a few lines of your resume." });
    }

    const rubric = getRubric(String(rubricId));
    if (!rubric) {
        return res.status(400).json({ error: "Choose a field to be reviewed against" });
    }

    res.json(gradeResume(resumeText, rubric));
});

app.listen(3000, () => {
    console.log("API on http://localhost:3000");
});

// const sample = `John Smith - john@example.com
// Built a chess GUI in Python with Stockfish integration.
// Developed a React dashboard used by 200 students.
// Reduced page load time by 40%. github.com/johnsmith`;

// console.log(gradeResume(sample, getRubric("swe")!));