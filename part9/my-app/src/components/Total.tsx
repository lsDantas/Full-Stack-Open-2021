import React from 'react';
import { Part } from '../types';

const Total = ({ courseParts }: { courseParts: Array<Part> })  => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
}

export default Total;
