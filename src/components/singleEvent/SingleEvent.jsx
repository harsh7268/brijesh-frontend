import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './singleEvent.css';
import axios from 'axios';
import { Context } from '../../context/Context';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default function SingleEvent() {
  const location = useLocation();
  const eventId = location.pathname.split('/')[2];
  const [event, setEvent] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [updateMode, setUpdateMode] = useState(false);
  const [isError, setIserror] = useState(false);
  const isEditedUser = !!(user && event.username === user.username);
  useEffect(() => {
    const getEvent = async () => {
      const resp = await axiosClient.get(`/events/${eventId}`);
      setTitle(resp.data.title);
      setDesc(resp.data.desc);
      setEvent(resp.data);
    };
    getEvent();
  }, [eventId]);
  const handleDeleteEvent = async () => {
    try {
      await axiosClient.delete(`/events/${event._id}`, {
        data: { username: user.username },
      });
      window.location.replace('/');
    } catch (err) {
      setIserror(true);
    }
  };

  const handleUpdate = async () => {
    try {
      await axiosClient.put(`/events/${event._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (err) {
      setIserror(true);
    }
  };
  const EventImg = `${process.env.REACT_APP_API_URL}/images/${event.photo}`;
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img
          src={event.photo ? EventImg : 'https://khqa.com/resources/media/e0db4d6c-cfb7-41eb-9591-f1b82cffcd91-jumbo16x9_worldtravelguy.jpg?1641239930038'}
          alt=""
          className="singlePostImg"
        />
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {event.title}
            {isEditedUser && (
            <div className="singlePostEdit">
              <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={() => setUpdateMode(true)} aria-hidden="true" />
              <i className="singlePostIcon fa-solid fa-trash" onClick={handleDeleteEvent} aria-hidden="true" />
            </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostName">
            Author:
            <Link to={`/?user=${event.username}`} className="link">
              <b>{event.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">{new Date(event.createdAt).toDateString()}</span>
        </div>
        <div className="pcat">
          {updateMode ? (
            <textarea
              className="singlePostDescInput"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          ) : (
            <p className="singlePostDesc">
              {event.desc}
            </p>
          )}
        </div>

        {updateMode && (
        <button type="button" className="singlePostButton" onClick={handleUpdate}>
          Update
        </button>
        )}
        {isError && <span className="errormsg"><h4>Something went wrong !!</h4></span>}
      </div>
    </div>
  );
}
