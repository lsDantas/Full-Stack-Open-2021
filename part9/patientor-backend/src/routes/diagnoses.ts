import express from 'express';
import { Request, Response } from 'express';

import diagnosesService from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
    return res.send(diagnosesService.getEntries());
});

export default router;