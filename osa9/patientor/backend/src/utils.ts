import { NewPatient } from './types';

const toNewPatient = (object: unknown): NewPatient => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }
  console.log(object);
  const newEntry: NewPatient = {
    name: 'test',
    dateOfBirth: '1234-12-12',
    ssn: '1234212',
    gender: 'male',
    occupation: 'tester',
  };

  return newEntry;
};

export default toNewPatient;