import React from 'react';
import Event from '../event/Event';
import './events.css';

export default function Events({ eventList }) {
  return (
    <div className="posts">
      {
                eventList.map((evnt) => <Event eventDetails={evnt} />)
            }
    </div>
  );
}
