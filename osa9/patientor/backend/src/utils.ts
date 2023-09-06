import { NewPatient, Gender, Entry, EntryWithoutId, Diagnosis, Discharge, HealthCheckRating, SickLeave } from './types';

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
    console.log('parsediagnosiscodes: ', object);
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

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description) || typeof description !== 'string') {
    throw new Error('Incorrect or missing description');
  }
  if (description !== '') {
    return description;
  }
  throw new Error('Description is empty!');
}

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist) || typeof specialist !== 'string') {
    throw new Error('Incorrect or missing specialist');
  }
  if (specialist === '') {
    throw new Error('Specialist is empty!');
  }
  return specialist;
}

const parseDischarge = (object: unknown): Discharge => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing Discharge data');
  }
  if ('date' in object && 'criteria' in object && object.criteria !== '') {
    parseDate(object.date);
    return object as Discharge;
  }
  throw new Error('Incorrect Discharge data: some fields are missing');
}

const isHealthCheckEntry = (param: number): param is HealthCheckRating => {
  // console.log('isHealthCheckRating param: ', param, typeof param);
  return Object.values(HealthCheckRating).map(v => v as number).includes(param);
};

const parseHealthCheckRating = (num: number): HealthCheckRating => {
  if(!isHealthCheckEntry(num) || typeof num !== 'number') {
    // console.log(num, typeof num);
    throw new Error('Incorrect or missing HealthCheckRating data');
  }
  if (typeof num === 'number' && isHealthCheckEntry(num)) {
    // console.log('parserating: ', num, typeof num);
    return Number(num as HealthCheckRating);
  }
  throw new Error('Incorrect HealthCheckRating data');
}

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName) || typeof employerName !== 'string') {
    throw new Error('Incorrect or missing employername');
  }
  if (employerName === '') {
    throw new Error('Employername is empty!');
  }
  return employerName;
}

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || typeof sickLeave !== 'object') {
    throw new Error('Incorrect or missing sickleave');
  };
  if (('startDate' in sickLeave) && ('endDate' in sickLeave)) {
    if (sickLeave.startDate === '' && sickLeave.endDate === '') {
      return sickLeave as SickLeave;
    };
    if (sickLeave.startDate === '' || sickLeave.endDate === '') {
      throw new Error('Sick leave start or end missing.');
    };
    if (!isDate(sickLeave.startDate as string) || !isDate(sickLeave.endDate as string)) {
      throw new Error('Sick leave start or end is not a date.')
    };
  };
  return sickLeave as SickLeave;
}

const parseEntry = (entry: unknown): EntryWithoutId => {
  if (!entry || typeof entry !== 'object') {
    throw new Error('Incorrect or missing entry');
  }
  
  if ('type' in entry && 'description' in entry && 'specialist' in entry && 'date' in entry) {
    parseDescription(entry.description);
    parseDate(entry.date);
    parseSpecialist(entry.specialist);
    if (entry.type === 'HealthCheck' && 'healthCheckRating' in entry) {
      console.log('parseEntry: ', entry, entry.healthCheckRating as number, typeof entry.healthCheckRating)
      if ('diagnosisCodes' in entry) {
        return {
          description: parseDescription(entry.description),
          date: parseDate(entry.date),
          specialist: parseSpecialist(entry.specialist),
          type: entry.type,
          healthCheckRating: parseHealthCheckRating(Number(entry.healthCheckRating)),
          diagnosisCodes: parseDiagnosisCodes(entry),
        };
      }
      return {
        description: parseDescription(entry.description),
        date: parseDate(entry.date),
        specialist: parseSpecialist(entry.specialist),
        type: entry.type,
        healthCheckRating: parseHealthCheckRating(Number(entry.healthCheckRating)),
        // diagnosisCodes: parseDiagnosisCodes([]),
      };
    } else if (entry.type === 'Hospital' && 'discharge' in entry) {
      parseDischarge(entry.discharge as Discharge);
      return entry as Entry;
    } else if (entry.type === 'OccupationalHealthcare' && 'employerName' in entry) {
      parseEmployerName(entry.employerName);
      if ('sickLeave' in entry) {
        parseSickLeave(entry.sickLeave);
        return entry as Entry;
      }
      return entry as Entry;
    }
  }

  throw new Error('Incorrect or missing entry type');
};

const toNewEntry = (object: unknown): EntryWithoutId => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }
  
  console.log('toNewEntry: ', object);

  if ('specialist' in object && 'description' in object && 'date' in object) {
    const newEntry: EntryWithoutId = parseEntry(object);

    return newEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};

export default { toNewPatient, toNewEntry , parseDiagnosisCodes };