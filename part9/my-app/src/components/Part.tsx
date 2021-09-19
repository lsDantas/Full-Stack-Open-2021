import React from 'react';
import { CoursePart } from '../types';

const Part = ({ part }: { part: CoursePart }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (part.type) {
    case "normal":
      return (
        <div> 
          <b>{part.name} {part.exerciseCount}</b>
          <br></br>
          <i>{part.description}</i>
          <br></br>
          <br></br>
        </div>
      );
    case "groupProject":
      return (
        <div>
          <b>{part.name} {part.exerciseCount}</b>
          <br></br>
          Group project count: {part.groupProjectCount}
          <br></br>
          <br></br>
        </div>
      );
    case "submission":
      return (
        <div>
          <b>{part.name} {part.exerciseCount}</b>
          <br></br>
          <i>{part.description}</i>
          <br></br>
          <a href={part.exerciseSubmissionLink}>{part.exerciseSubmissionLink}</a>
          <br></br>
          <br></br>
        </div>
      );
    case "special":
      return (
        <div>
          <b>{part.name} {part.exerciseCount}</b>
          <br></br>
          Required Skills: {part.requirements.map((skill: string) => `${skill} `)}
          <br></br>
          <br></br>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
