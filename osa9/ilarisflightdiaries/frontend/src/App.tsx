import { useState, useEffect } from 'react';
import { Diary, Weather, Visibility } from './types';
import axios from 'axios';

const Notification = (props: { error: string }) => {

  return <div style={{color: 'red'}}>{props.error}</div>
}


const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDate, setNewDate] = useState<string>('');
  const [newVisibility, setNewVisibility] = useState<Visibility | string>('');
  const [newWeather, setNewWeather] = useState<Weather | string>('');
  const [newComment, setNewComment] = useState<string>('');
  const [notification, setNotification] = useState<string>('');

  useEffect(() => {
    axios.get<Diary[]>('http://localhost:3001/api/diaries').then(response => {
      console.log(response.data);
      setDiaries(response.data);
    })
  }, [])

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const diaryToAdd = {
      date: newDate,
      visibility: newVisibility,
      weather: newWeather,
      comment: newComment,
      id: diaries.length + 1
    };

    try {
      await axios.post<Diary>('http://localhost:3001/api/diaries', diaryToAdd).then(response => {
        console.log(response);
      })
      setDiaries(diaries.concat(diaryToAdd as Diary));
      setNewDate('');
      // setNewVisibility('');
      // setNewWeather('');
      setNewComment('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.status)
        console.error(error.response);
        if (error.response) {
          setNotification(error.response.data)
        }
        setTimeout(() => {
          setNotification('')
        }, 5000)
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <Notification error={notification} />
      <form onSubmit={diaryCreation}>
        date <input type="date" value={newDate} onChange={(event) => setNewDate(event.target.value)} /><br/>
        visibility: 
        great <input type="radio" name="visibility"
          onChange={() => setNewVisibility('great')} />
        good <input type="radio" name="visibility"
          onChange={() => setNewVisibility('good')} />
        ok <input type="radio" name="visibility"
          onChange={() => setNewVisibility('ok')} />
        poor <input type="radio" name="visibility"
          onChange={() => setNewVisibility('poor')} /><br/>
        weather: 
        sunny <input type="radio" name="weather"
          onChange={() => setNewWeather('sunny')} />
        rainy <input type="radio" name="weather"
          onChange={() => setNewWeather('rainy')} />
        cloudy <input type="radio" name="weather"
          onChange={() => setNewWeather('cloudy')} />
        stormy <input type="radio" name="weather"
          onChange={() => setNewWeather('stormy')} />
        windy <input type="radio" name="weather"
          onChange={() => setNewWeather('windy')} /><br/>
        comment <input value={newComment} onChange={(event) => setNewComment(event.target.value)} /><br/>
        <button type='submit'>add</button>
      </form>

      <h2>Diary entries</h2>
      <ul>
        {diaries.map(diary =>
          <li key={diary.id}>
            <h3>{diary.date.toString()}</h3>
            visibility: {diary.visibility}<br/>
            weather: {diary.weather}
          </li>
        )}
      </ul>
    </div>
  )
}

export default App;