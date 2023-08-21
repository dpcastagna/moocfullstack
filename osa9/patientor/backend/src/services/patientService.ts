import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { Patient, PatientWithoutSsn, NewPatient, Entry } from '../types';

let patients: Patient[] = patientData;

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

const updatePatient = (id: string, entry: Entry) => {
  const patientToUpdate = patients.find(p => p.id === id);
  if (!patientToUpdate) {
    return undefined;
  }

  const newEntryId = uuid();
  const newEntry = {...entry, id: newEntryId};

  const updatedEntries = patientToUpdate.entries.concat(newEntry);
  const updatedPatient = { ...patientToUpdate, entries: updatedEntries, };

  const updatedPatients = patients.filter(p => p.id !== id)
  
  console.log('patients: ', patients);

  patients = updatedPatients;
  patients.push(updatedPatient);
  
  console.log('updatedPatients: ', patients);

  return updatedPatient;
}

export default {
  getEntries,
  getPatientsWithoutSsn,
  addPatient,
  findById,
  updatePatient
};