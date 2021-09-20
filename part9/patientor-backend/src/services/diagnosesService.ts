import diagnosesData from '../../data/diagnoses.json';

import { Diagnosis } from '../types';

const diagnoses: Array<Diagnosis> = diagnosesData;

const getEntries = (): Array<Diagnosis> => {
  return diagnoses;
};

export default {
  getEntries
};