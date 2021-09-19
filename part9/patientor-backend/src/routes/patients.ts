import express from 'express';
import { Request, Response } from 'express';

import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  return res.send(patientsService.getNonSensitiveEntries());
});

export default router;