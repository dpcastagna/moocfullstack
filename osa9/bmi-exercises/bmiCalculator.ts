interface BmiValues {
  mass: number;
  height: number;
}

// type Operation = 'multiply' | 'add' | 'divide';

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      mass: Number(args[2]),
      height: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (height: number, mass: number) : string => {
    const bmi = mass / ((height / 100) * (height / 100));
    console.log(bmi)
    if (bmi < 18.5) {
      return 'Underweight (Unhealthy weight)';
    } else if (bmi < 25) {
      return 'Normal (Healthy weight)';
    } else if (bmi < 30) {
      return 'Overweight (Unhealthy weight)';
    } else {
      return 'Obese (Unhealthy weight)';
    }
}

try {
  // console.log(calculateBmi(1, 5));
  console.log(calculateBmi(180, 74));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}