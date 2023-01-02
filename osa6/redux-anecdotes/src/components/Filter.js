import { useEffect } from 'react'
import { connect } from 'react-redux'
import { createFilter, createFiltered } from '../reducers/filterReducer'

const Filter = (props) => {
  
  useEffect(() => {
    props.createFiltered(props.anecdotes)
  }, [props, props.anecdotes])
  

  const handleChange = (event) => {
    event.preventDefault()
    // input-kentän arvo muuttujassa event.target.value
    const input = event.target.value
    //console.log(input)
    props.createFilter(input)
    props.createFiltered(props.anecdotes)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
  }
}

const mapDispatchToProps = {
  createFilter,
  createFiltered,
}

const ConnectedFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)

export default ConnectedFilter