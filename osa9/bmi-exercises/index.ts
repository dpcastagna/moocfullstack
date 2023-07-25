import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  console.log(_req);
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  console.log(req.query);
  const height = req.query.height;
  const weight = req.query.weight;
  // console.log(height, weight, isNaN(Number(height)), isNaN(Number(weight)));
  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(400);
    res.send(
      {
        error: "malformatted parameters"
      });
  } else {
    const bmi: string = calculateBmi(Number(height), Number(weight));
    res.status(200);
    res.send({
      height: Number(height),
      weight: Number(weight),
      bmi: bmi
    });
  }
  // console.log(calculateBmi(Number(height), Number(weight)))
});

app.post('/exercises', (req, res) => {
  console.log(Object.keys(req.body), Object.values(req.body));
  // eslint-disable-next-line
  const days: number[] = req.body.daily_exercises;
  // eslint-disable-next-line
  const target: number = req.body.target;
  if (!target || !days || days.length === 0) {
    res.status(400).send({
      error: "parameters missing"
    });
  } else if (isNaN(Number(target)) || days.map(day => {isNaN(Number(day))})) { // eslint-disable-this-line
    res.status(400).send({
      error: "malformatted parameters"
    });
  } else {
    const result = calculateExercises(target, days);
    res.status(200).send(result);
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});