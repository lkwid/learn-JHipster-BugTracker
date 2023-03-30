import dayjs from 'dayjs/esm';
import { IProject } from 'app/entities/project/project.model';
import { IUser } from 'app/entities/user/user.model';
import { ILabel } from 'app/entities/label/label.model';

export interface ITicket {
  id: number;
  title?: string | null;
  description?: string | null;
  dueDate?: dayjs.Dayjs | null;
  done?: boolean | null;
  project?: Pick<IProject, 'id' | 'name'> | null;
  assignedTo?: Pick<IUser, 'id' | 'login'> | null;
  labels?: Pick<ILabel, 'id' | 'label'>[] | null;
}

export type NewTicket = Omit<ITicket, 'id'> & { id: null };
