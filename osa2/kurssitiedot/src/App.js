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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map(course => 
          <Course course={course} />
        )}
      
    </div>
  )
}

export default App