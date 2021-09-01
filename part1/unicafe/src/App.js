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

const Statistics = (props) => {
  const [good, neutral, bad] = props.values;
  const all = good + neutral + bad;
  
  if( all === 0 ) {
    // No Feedback Situation
    return ( <> No feedback given. </>);
  } 
  else {
    // Statistics Board
    const average = (good - bad) / all;
    const positive = (good / all) * 100 + " %";

    return (
      <>
        <StatisticLine name="good" value={good} />
        <StatisticLine name="neutral" value={neutral} />
        <StatisticLine name="bad" value={bad} />
        <StatisticLine name="all" value={all} />
        <StatisticLine name="average" value={average} />
        <StatisticLine name="positive" value={positive} />
      </>
    );
  }
}

const StatisticLine = ({name, value}) => {
  return (
    <>
      {name} {value}
      <br></br>
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
      <Statistics values={[good, neutral, bad]} />
    </div>
  );
}

export default App;
