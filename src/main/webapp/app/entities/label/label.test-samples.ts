import { ILabel, NewLabel } from './label.model';

export const sampleWithRequiredData: ILabel = {
  id: 60049,
};

export const sampleWithPartialData: ILabel = {
  id: 54633,
  label: 'Investment Optimization',
};

export const sampleWithFullData: ILabel = {
  id: 97387,
  label: 'Pizza Data EXE',
};

export const sampleWithNewData: NewLabel = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
