import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

function App() {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const [selected, setSelected] = useState(0);
  const [anecdotesPoints, setAnecdotesPoints] = useState(
    Array(anecdotes.length).fill(0),
  );
  const [mostVotesAnecdotes, setMostVotesAnecdotes] = useState(0);
  // Find most votes anecdotes
  // Set state the most votes anecdotes inital 0
  // Each time you vote you look for the most votes and set a new most votes anecdotes

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * anecdotes.length);
  };

  const handleNextAnecdote = () => {
    const newSelected = generateRandomNumber();
    setSelected(newSelected);
  };

  const handleVoteAnecdote = () => {
    const newPoints = [...anecdotesPoints];
    newPoints[selected] += 1;

    for (let i = 0; i < newPoints.length; i++) {
      if (newPoints[mostVotesAnecdotes] < newPoints[i]) {
        setMostVotesAnecdotes(i);
      }
    }

    setAnecdotesPoints(newPoints);
  };

  return (
    <>
      <div>{anecdotes[selected]}</div>
      <p>has {anecdotesPoints[selected]} votes</p>
      <Button handleClick={handleVoteAnecdote} text="Vote" />
      <Button handleClick={handleNextAnecdote} text="Next anecdotes" />
      <h2>Anecdotes of the day</h2>
      <p>{anecdotes[mostVotesAnecdotes]}</p>
      <p>has {anecdotesPoints[mostVotesAnecdotes]} votes</p>
    </>
  );
}

export default App;
