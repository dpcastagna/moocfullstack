type ratingRange = 1 | 2 | 3;

interface exerciseValues {
  target: number;
  days: number[];
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

const parseArguments = (args: string[]): exerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  // if (args.length > 4) throw new Error('Too many arguments');
  // console.log(args.slice(2));
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      target: Number(args[2]),
      days: args.slice(3).map(Number)
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateExercises = (target: number, days: number[]) : Result => {
  let trainingDays: number = 0;
  let trainingTime: number = 0;
  let average: number = 0;
  let desc: string = 'not too bad but could be better';

  days.map(day => {
    if (day > 0) {
      trainingDays += 1;
      trainingTime += day;
    }
  });

  average = trainingTime / days.length;
  const rating: ratingRange = average > target + 0.5 ? 3 : average < target - 0.5 ? 1 : 2;
  if (rating === 1) {
    desc = 'NOT great Bob!';
  } else if (rating === 3) {
    desc = 'GREAT Bob!';
  }

  // console.log(average, trainingDays, trainingTime, rating, desc);

  return {
    periodLength: days.length,
    trainingDays: trainingDays,
    success: average > target,
    rating: rating,
    ratingDescription: desc,
    target: target,
    average: average
  };
};

// console.log(calculateExercises(2, [3, 0, 2, 4.5, 0, 3, 1]))
// console.log(calculateExercises(2, [1, 0, 2, 4.5, 0, 3, 1, 0, 4]));
// console.log(process.argv)
if (process.argv.length > 2) {
  try {
    const { target, days } = parseArguments(process.argv);
    // console.log(height, mass)
    console.log(calculateExercises(target, days));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}

export { calculateExercises };