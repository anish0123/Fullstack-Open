import { useState } from "react";

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const StatisticLine = ({ text, value }) => (
  <tbody>
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  </tbody>
);

const Statistics = ({ good, bad, neutral }) => {
  let sum = good + bad + neutral;
  let average = ((good - bad) / sum).toFixed(1);
  let positive = ((good / sum) * 100).toFixed(1);
  if (sum === 0) {
    return (
      <div>
        <p>no feedback given</p>
      </div>
    );
  } else {
    return (
      <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={sum} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive + "%"} />
      </table>
    );
  }
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="Bad" handleClick={() => setBad(bad + 1)} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
