import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  const entries = patientService.getPatientsWithoutSsn();
  res.send(entries);
});

router.post('/', (_req, res) => {
  res.send('Saving a patient!');
});

export default router;