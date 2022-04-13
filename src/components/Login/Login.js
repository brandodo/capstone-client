import React from "react";
import "./Login.scss";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function Login() {
  return (
    <div className="sidebar__container">
      <a className="sidebar__login" href={`${SERVER_URL}/auth/spotify`}>
        Login with Spotify
      </a>
    </div>
  );
}
