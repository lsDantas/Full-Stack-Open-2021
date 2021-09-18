import express from 'express';
import { Request, Response } from 'express';
import { parseNumbers } from './argumentParse';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request, res: Response) => {
  try {
    const [height, weight]: number[] = parseNumbers([req.query.height, req.query.weight]);
    const result: string = calculateBmi(height, weight);

    res.send(result);
  } catch (error) {
    res.status(400).send( { error: 'Malformatted parameters.'} );
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
