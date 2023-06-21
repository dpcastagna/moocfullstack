const GenreButtons = ({ genres, setSelectedGenre }) => {
  // console.log(genres, setSelectedGenre)
  return (
    <div>
      <br />
      {genres.map((g) => {
        return(
        <button key={g} onClick={() => setSelectedGenre(g)}>{g}</button>
        )
      })}
      <button onClick={() => setSelectedGenre('')}>all genres</button>
    </div>
  )
}

export default GenreButtons