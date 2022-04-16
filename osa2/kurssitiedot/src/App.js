const Course = (props) => {
  console.log(props.course)
  const course = props.course
  console.log(course.name)
  return (
    <div>
      <Header course={course} />
      <Content course={course}  />
      <Total course={course} />
    </div>
  )
}

const Header = (props) => {
  const name = props.course.name
  console.log(props)
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Content = (props) => {
  //console.log(props.course.parts[1].exercises)
  const parts = props.course.parts
  console.log("parts", parts)
  return (
    <div>
      {parts.map(part => 
          <Part part={part} />
        )}
    </div>
  )
}

const Part = (props) => {
  //console.log(props.part.name)
  const part = props.part
  return (
    <div>
      <p>
        {part.name} {part.exercises}
      </p>
    </div>
  )
}

const Total = (props) => {
  const total = props.course.parts.reduce( (sum, part) => {
    console.log('what is happening', sum, part)
    return sum + part.exercises
  }, 0)
  console.log(total)
  return (
    <div>
      <p>
        <strong>total of {total} exercises</strong>
      </p>
    </div>
  )
}



const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App