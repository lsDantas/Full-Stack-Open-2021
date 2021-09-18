import { assertPositivity } from './argumentParse';

export type Rating = 1 | 2 | 3;

interface ExerciseCategory {
  rating: Rating,
  minThreshold: number,
  description: string,
}

export interface ExerciseProfile {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: Rating,
  ratingDescription: string,
  target: number,
  average: number,
}

export const parseRating = (entry: unknown): Rating => {
  const rating = Number(entry);

  if( isNaN(rating) ) {
    throw new Error('Rating not a number.');
  }

  if (rating !== 1 && rating !== 2 && rating !== 3) {
    throw new Error('Invalid rating. Rating must be 1, 2, or 3.');
  }

  return rating;
};

const calculateExercise = (exerciseHours: Array<number>, target: number): ExerciseProfile => {
  try {
    assertPositivity(exerciseHours);

    const isTrainingDay = (dailyHours: number): boolean => dailyHours !== 0;
    const totalHoursReducer = (sum: number, dailyHours: number): number => sum + dailyHours;

    // Generate Statistics
    const periodLength: number = exerciseHours.length;
    const trainingDays: number = exerciseHours.filter(isTrainingDay).length;
    const average: number = exerciseHours.reduce(totalHoursReducer) / periodLength;

    // Exercise Rating Definitions
    const tolerance= 0.2;
    const ratingDescriptions: Array<ExerciseCategory> = [
      { rating: 1, minThreshold: 0, description: 'Not exercising enough.' },
      { rating: 2, minThreshold: target - tolerance, description: 'Not bad, but could be better.' },
      { rating: 3, minThreshold: target + tolerance, description: 'Exercising really well!' },
    ];

    // Assign Rating
    const assignCategoryReducer = (assignedCategory: ExerciseCategory, category: ExerciseCategory): ExerciseCategory =>
      (average > category.minThreshold)
        ? category
        : assignedCategory;
    const assignedCategory: ExerciseCategory = ratingDescriptions.reduce(assignCategoryReducer);

    const rating: Rating = assignedCategory.rating;
    const ratingDescription: string = assignedCategory.description;
    const success: boolean = (average >= target) ? true : false;

    // Build Profile
    const profile: ExerciseProfile = {
      periodLength,
      trainingDays,
      success,
      rating,
      ratingDescription,
      target,
      average,
    };

    return profile;
  } catch(error) {
    throw new Error('Invalid input.');
  }
};

export { calculateExercise };
