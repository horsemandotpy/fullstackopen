function Header({ course }) {
  return <h1>{course}</h1>;
}

function Part({ part, exercise }) {
  return (
    <p>
      {part} {exercise}
    </p>
  );
}

function Total({ total }) {
  return <p>Number of exercise {total}</p>;
}

function Coutse({ course }) {
  return (
    <div>
      <Header course={course.name} />
      {course.parts.map((part) => (
        <Part key={part.name} part={part.name} exercise={part.exercise} />
      ))}
      <Total
        total={course.parts.reduce((acc, curr) => acc + curr.exercise, 0)}
      />
    </div>
  );
}

function App() {
  const course = {
    name: "Half stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercise: 10,
      },
      {
        name: "Using props to pass data",
        exercise: 7,
      },
      {
        name: "State of a component",
        exercise: 14,
      },
    ],
  };

  return <Coutse course={course} />;
}

export default App;
