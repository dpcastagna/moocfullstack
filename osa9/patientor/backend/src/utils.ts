import { NewPatient, Gender, Entry, Diagnosis } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }

  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries || typeof entries !== 'object' || !Array.isArray(entries)) {
    throw new Error('Incorrect or missing entries');
  }
  entries.forEach(entry => {
    parseEntry(entry);
    parseDiagnosisCodes(entry);
  });

  return entries as Entry[];
};

const toNewPatient = (object: unknown): NewPatient => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }
  
  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries(object.entries),
    };

    return newPatient;
  }
  console.log(object)
  throw new Error('Incorrect data: some fields are missing');
};

const parseEntry = (entry: unknown): Entry => {
  if (!entry || typeof entry !== 'object') {
    throw new Error('Incorrect or missing entry');
  }
  if ('type' in entry) {
    if (entry.type === 'HealthCheck' && 'healthCheckRating' in entry) {
      return entry as Entry;
    } else if (entry.type === 'Hospital' && 'discharge' in entry) {
      return entry as Entry;
    } else if (entry.type === 'OccupationalHealthcare' && 'employerName' in entry) {
      return entry as Entry;
    }
  }
  throw new Error('Incorrect or missing entry type');
};

const toNewEntry = (object: unknown): Entry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }
  
  if ('specialist' in object && 'description' in object && 'date' in object) {
    const newEntry: Entry = parseEntry(object);

    return newEntry;
  }
  console.log('toNewEntry: ', object);
  throw new Error('Incorrect data: some fields are missing');
};

export default { toNewPatient, toNewEntry , parseDiagnosisCodes };