import { useState, useEffect } from 'react';
import api from '../lib/api';
import { Project } from '../types/Project';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // make sure error exists

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const addProject = async (project: Partial<Project>) => {
    try {
      const res = await api.post('/projects', project);
      setProjects([...projects, res.data]);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add project');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ✅ Make sure to return error too
  return { projects, loading, error, addProject };
};
