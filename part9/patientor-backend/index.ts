import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req: Request, res: Response) => {
  console.log('Someone pinged here.');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
