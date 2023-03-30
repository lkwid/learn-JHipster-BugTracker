export interface IProject {
  id: number;
  name?: string | null;
}

export type NewProject = Omit<IProject, 'id'> & { id: null };
