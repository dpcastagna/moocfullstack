const Course = (props) => {
  console.log(props.course)
  const course = props.course
  return (
    <div>
      <Header course={course} />
      <Content course={course}  />
      <Total course={course} />
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Content = (props) => {
  //console.log(props.course.parts[1].exercises)
  
  return (
    <div>
      <Part part={props.course.parts[0]} />
      <Part part={props.course.parts[1]} />
      <Part part={props.course.parts[2]} />
    </div>
  )
}

const Part = (props) => {
  //console.log(props.part.name)
  return (
    <div>
      <p>
        {props.part.name} {props.part.exercises}
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
        <strong>Number of exercises {total}</strong>
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