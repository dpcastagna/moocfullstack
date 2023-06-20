const GenreSelected = ({ selectedGenre }) => {
  // console.log(selectedGenre)
  if (selectedGenre !== '') {
    return (
      <div>
        in genre <b>{selectedGenre}</b>
      </div>
    )
  }
  return null
}

export default GenreSelected