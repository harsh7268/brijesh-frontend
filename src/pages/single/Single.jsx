import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import SingleEvent from '../../components/singleEvent/SingleEvent';
import './single.css';

export default function Single() {
  return (
    <div className="single">
      <SingleEvent />
      <Sidebar />
    </div>
  );
}
