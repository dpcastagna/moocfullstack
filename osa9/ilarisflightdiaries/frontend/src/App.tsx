import { useState, useEffect } from 'react';
import { Diary, Weather, Visibility } from './types';
import axios from 'axios';

const Notification = (props: { error: string }) => {

  return <div>{props.error}</div>
}


const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newVisibility, setNewVisibility] = useState<Visibility | string>('');
  const [newWeather, setNewWeather] = useState<Weather | string>('');
  const [newComment, setNewComment] = useState('');
  const [notification, setNotification] = useState('');

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
    }

    try {
      await axios.post<Diary>('http://localhost:3001/api/diaries', diaryToAdd).then(response => {
        console.log(response);
      })
      setDiaries(diaries.concat(diaryToAdd as Diary));
      setNewDate('');
      setNewVisibility('');
      setNewWeather('');
      setNewComment('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.status)
        console.error(error.response);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <Notification error={notification} />
      <h2>Add new entry</h2>
      <form onSubmit={diaryCreation}>
        date <input value={newDate} onChange={(event) => setNewDate(event.target.value)} /><br/>
        visibility <input value={newVisibility} onChange={(event) => setNewVisibility(event.target.value)} /><br/>
        weather <input value={newWeather} onChange={(event) => setNewWeather(event.target.value)} /><br/>
        comment <input value={newComment} onChange={(event) => setNewComment(event.target.value)} /><br/>
        <button type='submit'>add</button>
      </form>

      <h2>Diary entries</h2>
      <ul>
        {diaries.map(diary =>
          <li key={diary.id}>
            <h3>{diary.date}</h3>
            visibility: {diary.visibility}<br/>
            weather: {diary.weather}
          </li>
        )}
      </ul>
    </div>
  )
}

export default App;