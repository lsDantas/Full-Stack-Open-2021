import express from 'express';
import { Request, Response } from 'express';
import { parseNumbers } from './argumentParse';
import { calculateBmi } from './bmiCalculator';
import { calculateExercise, ExerciseProfile } from './exerciseCalculator';

const app = express();

app.use(express.json());

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

app.post('/exercises', (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,  @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    const daily_exercises: any = req.body.daily_exercises;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,  @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    const target: any = req.body.target;

    if ( !(daily_exercises && target) ) {
      throw new Error('Parameters missing.');
    }

    const parsedTarget: number = parseNumbers([target])[0];
    const parsedExerciseHours: Array<number> = parseNumbers(daily_exercises);

    const result: ExerciseProfile = calculateExercise(parsedExerciseHours, parsedTarget);

    res.send(result);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (error.message && error.message === 'Parameters missing.') {
      res.status(400).send({ error: 'Parameters missing.' });
    } else { 
      res.status(400).send({ error: 'Malformatted parameters.' });
    }
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
