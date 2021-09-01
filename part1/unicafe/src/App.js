import React, { useState } from "react";

const Header = ({ title }) => {
  return (
    <h1>{title}</h1>
  );
}

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  );
}

const Display = ({ name, count }) => {
  return (
    <>
      {name} {count}
    </>
  );
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header title="give feedback" />
      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />

      <Header title="statistics" />
      <Display name="good" count={good} />
      <br></br>
      <Display name="neutral" count={neutral} />
      <br></br>
      <Display name="bad" count={bad} />
    </div>
  );
}

export default App;
