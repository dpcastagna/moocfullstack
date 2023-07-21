interface exerciseValues {
  target: number;
  days: [number];
}

interface Result { 
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (target: number, days: number[]) : Result => {
  let trainingDays: number = 0;
  let trainingTime: number = 0;
  let average: number = 0;

  days.map(day => {
    if (day > 0) {
      trainingDays += 1 
      trainingTime += day
    }
  })
  average = trainingTime / days.length;
  console.log(average, trainingDays, trainingTime);

  return {
    periodLength: days.length,
    trainingDays: trainingDays,
    success: average > target,
    rating: 2,
    ratingDescription: 'jee',
    target: target,
    average: average
  }
}

console.log(calculateExercises(2, [3, 0, 2, 4.5, 0, 3, 1]))