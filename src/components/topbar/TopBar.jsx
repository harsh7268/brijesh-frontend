import './topbar.css';
import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { Context } from '../../context/Context';

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };
  return (
    <div className="top">
      <div className="topLeft">
        <i className="fa-brands topIcon fa-square-facebook" />
        <i className="fa-brands topIcon fa-square-twitter" />
        <i className="fa-brands topIcon fa-square-youtube" />
        <i className="fa-brands topIcon fa-square-pinterest" />
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link to="/" className="link">HOME </Link>
            {' '}

          </li>
          <li className="topListItem"><Link to="/" className="link">ABOUT US </Link></li>
          <li className="topListItem"><Link to="/" className="link">CONTACT </Link></li>
          <li className="topListItem"><Link to="/create_event" className="link">CREATE EVENT </Link></li>
          <li className="topListItem" aria-hidden="true" onClick={handleLogout}>
            {user && 'LOGOUT'}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {
          user ? (
            <img
              className="topImg"
              src="https://wallpapers.com/images/hd/cool-neon-blue-profile-picture-u9y9ydo971k9mdcf.jpg"
              alt=""
            />
          ) : (
            <ul className="topList">
              <li className="topListItem">
                <Link className="link" to="/login">LOGIN</Link>

              </li>
              <li className="topListItem"><Link className="link" to="/register">REGISTER</Link></li>

            </ul>
          )
        }
        <i className="topSearchIcon fa-solid fa-magnifying-glass" />
      </div>
    </div>
  );
}
