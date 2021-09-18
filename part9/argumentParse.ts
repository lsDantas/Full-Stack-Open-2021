export const parseNumbers = (entries: Array<unknown>): Array<number> => {
  const numbers: Array<number> = entries.map((entry: string)  => {
    const number = Number(entry);
    if ( isNaN(number) ) {
      throw new Error('Input is not a number');
    }
    return number;
  });

  return numbers;
};

export const assertPositivity = (values: Array<number>): void => {
  values.forEach((value: number) => {
    if (value < 0) {
      throw new Error('Input is negative.');
    }
  })
};

export const assertStrictPositivity = (values: Array<number>): void => {
  values.forEach((value: number) => {
    if (value <= 0) {
      throw new Error('Input is non-positive.');
    }
  })
};