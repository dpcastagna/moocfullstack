import diagnosisData from '../../data/diagnoses.ts';

import { Diagnose } from '../types';

const diagnoses: Diagnose[] = diagnosisData as Diagnose[];

const getEntries = (): Diagnose[] => {
  return diagnoses;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getEntries,
  addDiagnosis
};