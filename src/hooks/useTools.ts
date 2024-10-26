import { useState, useEffect } from 'react';
import { getAllTools, getToolById, getToolReviews } from '../lib/services/toolService';
import type { AITool, UserReview } from '../types';

export function useTools() {
  const [tools, setTools] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const data = await getAllTools();
        setTools(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  return { tools, loading, error };
}

export function useTool(id: string) {
  const [tool, setTool] = useState<AITool | null>(null);
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchToolAndReviews = async () => {
      try {
        const [toolData, reviewsData] = await Promise.all([
          getToolById(id),
          getToolReviews(id)
        ]);
        setTool(toolData);
        setReviews(reviewsData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchToolAndReviews();
  }, [id]);

  return { tool, reviews, loading, error };
}