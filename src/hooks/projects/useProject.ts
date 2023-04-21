import { useEffect, useState } from 'react';
import { IProject } from '../../models';
import ProjectProvider from '../../services/ProjectProvider';

export function useProject(id: number | string | undefined) {
  const [project, setProject] = useState<IProject | null>(null);
  const getProject = async () => {
    if (!id) return null;
    const { data } = await ProjectProvider.fetchProject(id);
    setProject(data);
  };

  useEffect(() => {
    getProject();
  }, [id]);

  return { project, tasks: project?.tasks };
}
