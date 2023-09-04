import express from 'express';
import patientService from '../services/patientService';
import utils from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const entries = patientService.getPatientsWithoutSsn();
  res.send(entries);
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = utils.toNewPatient(req.body);
    
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req,res) => {
  try {
    const id = req.params.id;
    console.log('req.body: ', req.body);
    const newEntry = utils.toNewEntry(req.body);

    const newDiagnosisCodes = utils.parseDiagnosisCodes({ diagnosisCodes: newEntry.diagnosisCodes });
    console.log('post newEntry: ', newEntry, newDiagnosisCodes);
    
    const addedEntry = patientService.updatePatient(id, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;