interface HeaderProps {
  courseName: string;
}

interface ContentProps {
  courseParts: {
    name: string;
    exerciseCount: number;
  }[];
}

const Header = (props: HeaderProps) => {
  return <h1>{props.courseName}</h1>
}

const Content = (props: ContentProps) => {
  const parts = props.courseParts;
  console.log(parts)
  return (
    <div>
      {/* {parts.map((part) => {
        <div>
          {part.name} {part.exerciseCount}
        </div>
      })} */}
      <p>
        {parts[0].name} {parts[0].exerciseCount}
      </p>
      <p>
        {parts[1].name} {parts[1].exerciseCount}
      </p>
      <p>
        {parts[2].name} {parts[2].exerciseCount}
      </p>
    </div>
  )
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

  return (
    <div>
      <h1>{courseName}</h1>
      <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>
      <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
      </p>
      <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
      </p>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>

      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
    </div>
  );
};

export default App;