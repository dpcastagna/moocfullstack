import { useState, useEffect } from 'react'
import countryService from './services/countries'

const Filter = (props) => {
  //console.log(props)
  return(
    <div>
    find countries <input 
                  value={props.filter}
                  onChange={props.handleFilter}
                />
    </div>
  )
}

const Countries = (props) => {
  console.log(props)
  if (props.countries.length > 10) {
    return(
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (props.countries.length > 1) {
    return(
      <div>
        {props.countries.map(country =>
        <p key={country.name.common}>{country.name.common} <img src={country.flags.png} alt="flag"></img> &nbsp;
        <button onClick={() => props.remove(country.id)}>delete</button></p>
      )}
      </div>
    )
  } else if (props.countries.length === 1) {
    return(
      <div>
        {props.countries.map(country =>
        <Country country={country}/>
      )}
      </div>
    )
  }
  return(
    <div>
      {props.countries.map(country =>
        <p key={country.name.common}>{country.name.common} <img src={country.flags.png} alt="flag"></img> &nbsp;
        <button onClick={() => props.remove(country.id)}>delete</button></p>
      )}
    </div>
  )
}

const Country = (props) => {
  const country = props.country
  const languages = Object.values(country.languages)
  console.log(languages)
  return(
    <div key={country.name.common}>
      <h1>{country.name.common}</h1>
      capital {country.capital}<br />
      area {country.area}<br />
      <h3>languages:</h3><br />
      <ul>
      {languages.map(language => 
        <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt="flag"></img>
    </div>
  )
}

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