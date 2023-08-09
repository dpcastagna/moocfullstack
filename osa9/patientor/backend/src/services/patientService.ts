import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { Patient, PatientWithoutSsn, NewPatient } from '../types';

const patients: Patient[] = patientData;

const getEntries = (): Patient[] => {
  return patients;
};

const getPatientsWithoutSsn = (): PatientWithoutSsn[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find(p => p.id === id);
  return entry;
};

const addPatient = (patient: NewPatient) => {
  const id = uuid();
  const newPatient = {
    id: id,
    ...patient
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  getPatientsWithoutSsn,
  addPatient,
  findById
};