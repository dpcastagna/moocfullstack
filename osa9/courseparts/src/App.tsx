interface HeaderProps {
  courseName: string;
}

interface ContentProps {
  courseParts: {
    name: string;
    exerciseCount: number;
  }[];
}

interface TotalProps {
  exercises: number;
}

const Header = (props: HeaderProps) => {
  return <h1>{props.courseName}</h1>
}

const Content = (props: ContentProps) => {
  const parts = props.courseParts;
  console.log(parts)
  return (
    <div>
      {parts.map((part) => {
        return (
        <p key={part.name}>
          {part.name} {part.exerciseCount}
        </p>
        )
      })}
    </div>
  )
}

const Total = (props: TotalProps) => {
  const exercises = props.exercises;

  return <div>Number of exercises {exercises}</div>
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];
  const exercises = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total exercises={exercises} />
    </div>
  );
};

export default App;