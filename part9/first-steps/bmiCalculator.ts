import { assertStrictPositivity } from './argumentParse';

interface BMICategory {
  index: number;
  description: string;
}

const calculateBmi = (height: number, weight: number): string => {

  try {
    // Check for Positive Values
    assertStrictPositivity([height, weight]);

    // Calculate BMI  
    const bmi: number = weight / (height / 100)**2;

    // Assign Category
    const bmiCategories: Array<BMICategory> = [
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
    ];
    let description = '';
    for (const category of bmiCategories) {
      if (bmi > category.index) {
        description = category.description;
      } else {
        break;
      }
    }

    // Check that a Category was Selected
    if(description === '') {
      throw new Error('Unable to find category.');
    }

    return description;
  } catch (error) {
    throw new Error('Invalid inputs for weight and height.');
  }  
};

export { calculateBmi };
