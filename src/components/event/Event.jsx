import React from 'react';
import './event.css';
import { Link } from 'react-router-dom';

export default function Event({ eventDetails }) {
  const EventImg = `${process.env.REACT_APP_API_URL}/images/${eventDetails.photo}`;

  return (

    <div className="post">
      <Link to={`/event/${eventDetails._id}`} className="link">
        <img
          src={eventDetails.photo ? EventImg : 'https://media.istockphoto.com/id/1198931639/photo/writing-a-blog-blogger-influencer-reading-text-on-screen.jpg?s=612x612&w=0&k=20&c=4FJ_fzzZYqBoGG-RY8fcohpaOKKwnnI-ik58cPy6t-g='}
          alt=""
          className="postImg"
        />
        <div className="postInfo">
          <div className="postCats">
            {
                            eventDetails.categories.map((cat) => (
                              <span className="postCat">
                                {' '}
                                {cat.name}
                              </span>
                            ))
                        }

          </div>

          <span className="postTitle">{eventDetails.title}</span>

          <hr />
          <span className="postDate">
            {' '}
            {new Date(eventDetails.createdAt).toDateString()}
          </span>
        </div>
        <p className="postDesc">
          {eventDetails.desc}
        </p>
      </Link>
    </div>

  );
}
