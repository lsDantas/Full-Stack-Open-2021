import express from 'express';
import { Request, Response } from 'express';

import patientsService from '../services/patientsService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  return res.send(patientsService.getNonSensitiveEntries());
});

router.post('/', (req: Request, res: Response) => {
  try {
    const NewPatientEntry = toNewPatientEntry(req.body);

    const addedPatient = patientsService.addNewPatient(NewPatientEntry);
    res.json(addedPatient);
  } catch (error) {
    res.status(404).json({ error: 'Malformatted id.' });
  }
});

export default router;