interface BMIValues{
  value1: number;
  value2: number;
};

const validateNumber = (value: any): number => {
  if ( isNaN( Number(value) ) ) {
    throw new Error('Input is not a number.');
  }

  return Number(value);
}

const assertStrictlyPositiveNumber = (value: number): void => {
  if(value <= 0 ){ 
    throw new Error('Input is non-positive.');
  }
}

const calculateBmi = (heightVal: number, weightVal: number): string => {

  try {
    // Input Validation
    const height: number = validateNumber(heightVal);
    const weight: number = validateNumber(weightVal);
    assertStrictlyPositiveNumber(height);
    assertStrictlyPositiveNumber(weight);

    // Calculate BMI  
    const bmi: number = weight / (height / 100)**2;

    // Assign Category
    const bmiCategories: Array<any> = [
      {
        index: 0,
        description: 'Underweight (unhealthy weight)'
      },
      {
        index: 18.5,
        description: 'Normal (healthy weight)'
      },
      {
        index: 25,
        description: 'Overweight (unhealthy weight)'
      },
      {
        index: 30,
        description: 'Obese (unhealthy weight)'
      },
    ]
    let description: string;
    for (const category of bmiCategories) {
      if (bmi > category.index) {
        description = category.description;
      } else {
        break;
      }
    }

    return description;
  } catch (error) {
    throw new Error('Invalid inputs for weight and height.');
  }  
};

try {
  console.log('Valid:', calculateBmi(180, 74));
} catch (error) {
  console.log('Invalid inputs for weight and height.');
}

