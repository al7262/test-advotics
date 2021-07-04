import React from 'react';
import styles from './index.css';
import logo from '../../../assets/logo-full.jpg';
import profile from '../../../assets/profile.svg';
import logout from '../../../assets/logout.png';

export default function Header() {
  return (
    <header className={styles.root}>
      <figure>
        <img src={logo} alt="advotics" />
      </figure>
      <figcaption>
        <span>powered by</span>
        <img src={logo} alt="advotics" />
      </figcaption>
      <div className={styles.profile}>
        <h6>Username</h6>
        <small>Company Name</small>
        <img src={profile} alt="profile-company" />
        <img src={logout} alt="logout-advotics" />
      </div>
    </header>
  );
}
