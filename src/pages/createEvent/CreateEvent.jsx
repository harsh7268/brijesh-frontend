import './createEvent.css';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Context } from '../../context/Context';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default function CreateEvent() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const [isError, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEvent = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('eventImage', file);
      newEvent.photo = filename;
      try {
        await axiosClient.post('/upload', data);
      } catch (err) {
        setError(true);
      }
    }
    try {
      const res = await axiosClient.post('/events', newEvent);
      window.location.replace(`/event/${res.data._id}`);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="write">
      <img
        src={file ? URL.createObjectURL(file) : 'https://khqa.com/resources/media/e0db4d6c-cfb7-41eb-9591-f1b82cffcd91-jumbo16x9_worldtravelguy.jpg?1641239930038'}
        alt=""
        className="writeImg"
      />
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus" />
            {' '}
          </label>
          <input type="file" id="fileInput" style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Explain the event details"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        {isError && (
          <span>Somehthing went wrong !!</span>
        )}
        <button type="button" className="writeSubmit">Publish</button>
      </form>
    </div>
  );
}
