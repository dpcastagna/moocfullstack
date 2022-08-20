import { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import countryService from './services/countries'

const Filter = (props) => {
  //console.log(props)
  return (
    <div>
    find countries <input 
                  value={props.filter}
                  onChange={props.handleFilter}
                />
    </div>
  )
}

const Countries = (props) => {
  //console.log(props)
  if (props.countries.length > 10) {
    return(
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (props.countries.length > 1) {
    return (
      <div>
        {props.countries.map(country =>
        <div key={country.name.common}>
        <Togglable >
          <Country country={country} />
        </Togglable>
        </div>
      )}
      </div>
    )
  } else if (props.countries.length === 1) {
    return (
      <div>
        {props.countries.map(country =>
        <div key={country.name.common}>
          <Country country={country}/>
        </div>
      )}
      </div>
    )
  }

  return (
    <div>
      No matches found.
    </div>
  )
}

const Country = (props) => {
  const country = props.country
  const languages = Object.values(country.languages)
  console.log(languages)
  return (
    <div key={country.name.common}>
      <h1>{country.name.common}</h1>
      capital {country.capital}<br />
      area {country.area}<br />
      <h3>languages:</h3>
      <ul>
      {languages.map(language => 
        <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt="flag"></img>
    </div>
  )
}

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  //console.log(props.children.props.country)
  return (
    <div>
      <div style={hideWhenVisible}>
        {props.children.props.country.name.common} <button onClick={toggleVisibility}>show</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>hide</button>
      </div>
    </div>
  )
})

const App = () => {
  const [countries, setCountries] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    countryService
      .getAll()
      .then(response => {
        setCountries(response)
      })
  }, [])

  const countriesToShow = showAll
    ? countries
    : countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
  //console.log("countriesToShow", countriesToShow)

  const handleFilterChange = (event) => {
    //console.log(event.target.value)
    setNewFilter(event.target.value)
    setShowAll(false)
  }
  
  return (
    <div>
      <Filter handleFilter={handleFilterChange} filter={newFilter}/>
      <Countries countries={countriesToShow} />
    </div>
  )

}

export default App