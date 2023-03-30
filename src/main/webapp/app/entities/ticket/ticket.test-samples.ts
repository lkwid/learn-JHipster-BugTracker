import dayjs from 'dayjs/esm';

import { ITicket, NewTicket } from './ticket.model';

export const sampleWithRequiredData: ITicket = {
  id: 65582,
  title: 'Sleek Centralized Fish',
};

export const sampleWithPartialData: ITicket = {
  id: 54408,
  title: 'Cheese AGP',
  done: false,
};

export const sampleWithFullData: ITicket = {
  id: 2511,
  title: 'Outdoors',
  description: 'Cambridgeshire Brand Optional',
  dueDate: dayjs('2023-03-27'),
  done: false,
};

export const sampleWithNewData: NewTicket = {
  title: 'Internal cutting-edge alliance',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
