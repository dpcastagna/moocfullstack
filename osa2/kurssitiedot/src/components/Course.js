const Course = (props) => {
    console.log(props.course)
    const course = props.course
    console.log("course id", course.id, "importatussa componentissa")
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
            <Part key={part.id} part={part} />
          )}
      </div>
    )
  }
  
  const Part = (props) => {
    const part = props.part
    console.log("part id", part.id)
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
      //console.log('what is happening', sum, part)
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

  export default Course