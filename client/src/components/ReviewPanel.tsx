import { useEffect, useState } from "react";
import { fetchRubrics, submitResume } from "../api";
import type { CriterionResult, Review, RubricSummary } from "../types";

function Note({ result }: { result: CriterionResult }) {
  return (
    <li>
      <span aria-hidden="true">{result.passed ? "✓" : "✗"}</span>
      <div>
        <p>{result.label} — {result.passed ? "met" : "missing"}</p>
        {result.advice && <p>{result.advice}</p>}
      </div>
    </li>
  );
}

export default function ReviewPanel() {
  const [rubrics, setRubrics] = useState<RubricSummary[]>([]);
  const [rubricId, setRubricId] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [review, setReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRubrics()
      .then((list) => {
        setRubrics(list);
        if (list.length > 0) setRubricId(list[0].id);
      })
      .catch(() => setError("Can't reach the server"));
  }, []);

  async function handleSubmit() {
    setLoading(true);
    setError(null);
    try {
      setReview(await submitResume(resumeText, rubricId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setReview(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <label>
        <p>Field you're applying to</p>
        <select value={rubricId} onChange={(e) => setRubricId(e.target.value)}>
          {rubrics.map((r) => (
            <option key={r.id} value={r.id}>{r.field}</option>
          ))}
        </select>
      </label>

    <div>
      <textarea
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        placeholder="Paste your resume here."
        rows={20}
      />

    </div>


      <button onClick={handleSubmit} disabled={loading || !rubricId}>
        {loading ? "Reviewing…" : "Review my resume"}
      </button>

      {error && <p>{error}</p>}

      {review && (
        <>
          <h2>{review.score} out of 100 against {review.field}</h2>

          <h3>What recruiters in this field look for</h3>
          <ul>
            {review.results.map((r) => <Note key={r.criterionId} result={r} />)}
          </ul>

          <h3>Basics every resume needs</h3>
          <ul>
            {review.structural.map((r) => <Note key={r.criterionId} result={r} />)}
          </ul>
        </>
      )}
    </div>
  );
}