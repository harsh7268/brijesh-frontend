/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
import './sidebar.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default function Sidebar() {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    const getCategory = async () => {
      const resp = await axiosClient.get('/categories');
      setCats(resp.data);
    };
    getCategory();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">About Me</span>
        <img
          src="https://www.impactbnd.com/hubfs/blog-image-uploads/best-about-us-pages.jpg"
          className="sidebarImage"
          alt=""
        />
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {
            cats.map((c) => (
              <Link to={`/?cat=${c.name}`} className="link">
                <li className="sidebarListItem">{c.name}</li>
              </Link>
            ))
          }

        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US !</span>
        <div className="sidebarSocial">
          <i className="fa-brands sidebarIcon fa-square-facebook" />
          <i className="fa-brands sidebarIcon fa-square-twitter" />
          <i className="fa-brands sidebarIcon fa-square-youtube" />
          <i className="fa-brands sidebarIcon fa-square-pinterest" />
        </div>
      </div>
    </div>
  );
}
