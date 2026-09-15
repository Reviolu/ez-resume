import express from 'express';
import cors from 'cors';
import { gradeResume } from './grade';
import { getRubric } from './store';

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/ping", (req, res) => {
    res.json({ message: "server is on" });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

const sample = `John Smith - john@example.com
Built a chess GUI in Python with Stockfish integration.
Developed a React dashboard used by 200 students.
Reduced page load time by 40%. github.com/johnsmith`;

console.log(gradeResume(sample, getRubric("swe")!));