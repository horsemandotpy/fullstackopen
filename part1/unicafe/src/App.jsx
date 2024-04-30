import { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  );
};

const Statistic = ({ good, neutral, bad }) => {
  return (
    <>
      <StatisticLine text={"good"} value={good} />
      <StatisticLine text={"neutral"} value={neutral} />
      <StatisticLine text={"bad"} value={bad} />
      <StatisticLine text={"all"} value={good + bad + neutral} />
      <StatisticLine
        text={"average"}
        value={(good + neutral * 0 - bad) / (good + neutral + bad)}
      />
      <StatisticLine
        text={"positive"}
        value={(good / (good + neutral + bad)) * 100}
      />
    </>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feed back</h1>
      <button onClick={() => setGood((prev) => prev + 1)}>good</button>
      <button onClick={() => setNeutral((prev) => prev + 1)}>neutral</button>
      <button onClick={() => setBad((prev) => prev + 1)}>bad</button>
      <h2>Statistic</h2>
      {good > 0 || bad > 0 || neutral > 0 ? (
        <Statistic good={good} neutral={neutral} bad={bad} />
      ) : (
        <p>No feedback have been given</p>
      )}
    </div>
  );
}

export default App;
