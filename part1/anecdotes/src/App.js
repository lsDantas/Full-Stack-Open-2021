import React, { useState } from "react";

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}

const Button = ({name, handleClick}) => {
  return (
    <button onClick={handleClick}>{name}</button>
  );
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later.',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is the same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ];
  const num_anecdotes = anecdotes.length;
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(num_anecdotes).fill(0))

  // Randomly Select Anecdote
  const changeAnecdote = () => {
    setSelected(getRandomInt(num_anecdotes));
  }

  // Count Votes
  const updatePoints = () => {
    let new_points = [...points];
    new_points[selected] += 1;
    setPoints(new_points);
  }

  return (
    <div>
      {anecdotes[selected]}
      <br></br>
      Has {points[selected]} votes
      <br></br>
      <Button name="Vote" handleClick={updatePoints} />
      <Button name="Next Anecdote" handleClick={changeAnecdote} />
    </div>
  );
}

export default App;
