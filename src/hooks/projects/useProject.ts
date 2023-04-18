import { useEffect, useState } from 'react';
import { IProject } from '../../models';
import api from '../../services/api';

export function useProject(id: number | string | undefined) {
  const [project, setProject] = useState<IProject | null>(null);
  const getProject = async () => {
    const { data } = await api.get(`projects/${id}`);
    setProject(data);
  };

  useEffect(() => {
    getProject();
  }, [id]);

  return { project, tasks: project?.tasks };
}
