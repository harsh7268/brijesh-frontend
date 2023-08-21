import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import './settings.css';

export default function Setting() {
  return (
    <div className="setting">
      <div className="settingsWrapper">
        <div className="settingTitle">
          <span className="settingUpdateTitle"> Update your account</span>
          <span className="settingDeleteTitle"> Delete your account</span>
        </div>
        <form className="settingsForm">
          <label htmlFor="profile">
            Profile Pictures
            {' '}
          </label>
          <div className="settingProfilePics" id="profile">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingPPIcon fa-regular fa-user" />
              {' '}
            </label>
            <input type="file" id="fileInput" style={{ display: 'none' }} />
          </div>
          <label htmlFor="username">
            UserName
            {' '}
          </label>
          <input type="text" id="username" placeholder="Briejsh" />
          <label htmlFor="email">
            Email
            {' '}
          </label>
          <input type="text" id="email" placeholder="brijesh@mailinator.como" />
          <label htmlFor="password">
            Password
            {' '}
          </label>
          <input type="password" placeholder="Briejsh" />
          <button type="button" className="settingsSubmit">Update</button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
