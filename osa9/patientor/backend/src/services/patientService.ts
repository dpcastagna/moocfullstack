import patientData from '../../data/patients';

import { Patient, PatientWithoutSsn } from '../types';

const patients: Patient[] = patientData;
// const patientsWithoutSsn: PatientWithoutSsn[] = patientData;

const getEntries = (): Patient[] => {
  return patients;
};

const getPatientsWithoutSsn = (): PatientWithoutSsn[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = () => {
  return null;
};

export default {
  getEntries,
  getPatientsWithoutSsn,
  addPatient
};