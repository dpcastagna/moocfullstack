interface BmiValues {
  height: number;
  mass: number;
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  // console.log(args.slice(2).map(Number));

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      mass: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (height: number, mass: number) : string => {
    const bmi = mass / ((height /100) * (height / 100));
    // console.log(bmi)
    if (bmi < 18.5) {
      return 'Underweight';
    } else if (bmi < 25) {
      return 'Normal (Healthy weight)';
    } else if (bmi < 30) {
      return 'Overweight';
    } else {
      return 'Obese';
    }
}

try {
  const { height, mass } = parseArguments(process.argv);
  // console.log(height, mass)
  console.log(calculateBmi(height, mass));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}

export {}