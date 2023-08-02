interface HeaderProps {
  courseName: string;
}

interface ContentProps {
  courseParts: CoursePart[];
}

interface TotalProps {
  exercises: number;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;

const Header = (props: HeaderProps) => {
  return <h1>{props.courseName}</h1>
}

const Content = (props: ContentProps) => {
  const parts = props.courseParts;
  console.log(parts)
  return (
    <div>
      {parts.map(part => {
        switch (part.kind) {
          case 'basic':
            {part.name} {part.description} {part.exerciseCount}
            break;
            case 'background':
              {part.name} {part.exerciseCount} {part.backgroundMaterial}
              break;
            case 'group':
              {part.name} {part.exerciseCount} {part.groupProjectCount}
              break;
        }
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

const Part = (props: CoursePart) => {
  const part = props;
  return (
    <div>
      asdf
    </div>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
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