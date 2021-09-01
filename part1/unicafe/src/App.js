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

const Statistics = (props) => {
  const [good, neutral, bad] = props.values;

  const all = good + neutral + bad;
  let average, positive;
  if( all === 0 ) {
    average = 0;
    positive = 0;
  } 
  else {
    average = (good - bad) / all;
    positive = (good / all) * 100 + " %";
  }

  return (
    <>
      <Display name="all" count={ all } />
      <br></br>
      <Display name="average" count={ average } />
      <br></br>
      <Display name="positive" count={ positive } />
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
      <br></br>
      <Statistics values={[good, neutral, bad]} />
    </div>
  );
}

export default App;
