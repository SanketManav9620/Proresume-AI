import { useState, useRef, useEffect } from "react";
import { analyzeResumeApi } from "../services/api";
import { demoAnalysisData } from "../data/demoData";

export function useResumeAnalysis() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const resultsRef = useRef(null);

  const fileUp = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const data = await analyzeResumeApi(file);
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = () => {
    setLoading(true);
    setError(null);
    setResults(null);

    setTimeout(() => {
      setResults(demoAnalysisData);
      setLoading(false);
    }, 1200);
  };

  useEffect(() => {
    if (results && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [results]);

  return {
    results,
    loading,
    error,
    resultsRef,
    fileUp,
    handleDemo,
  };
}
 