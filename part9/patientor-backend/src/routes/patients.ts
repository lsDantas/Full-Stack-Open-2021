import express from 'express';
import { Request, Response } from 'express';

import patientsService from '../services/patientsService';
import utils from '../utils';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  return res.send(patientsService.getNonSensitiveEntries());
});

router.get('/:id', (req: Request, res: Response) => {
  try {
    const id = utils.toID(req.params.id);

    res.send(patientsService.getSpecificPatient(id));
  } catch (error) {
    res.status(404).json({ error: 'Invalid ID.'});
  }
});

router.post('/', (req: Request, res: Response) => {
  try {
    const NewPatientEntry = utils.toNewPatientEntry(req.body);

    const addedPatient = patientsService.addNewPatient(NewPatientEntry);
    res.json(addedPatient);
  } catch (error) {
    res.status(404).json({ error: 'Malformatted ID.' });
  }
});

export default router;