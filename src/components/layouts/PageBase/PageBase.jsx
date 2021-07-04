/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import DashboardLogo from '../../../assets/dashboard.svg';
import Header from '../../elements/Header';
import styles from './index.css';

const navs = [
  { name: 'Dashboard', icon: DashboardLogo, to: '/' },
];

export default function PageBase({ children }) {
  return (
    <>
      <Header />
      <aside className={styles.aside}>
        <div className={styles.menu}>
          {[...Array(3).keys()].map((n) => <span key={n} />)}
        </div>
        <nav>
          {navs.map((data, n) => <NavSider data={data} key={n} />)}
        </nav>
      </aside>
      <main className={styles.main}>{children}</main>
    </>
  );
}

PageBase.defaultProps = {
  children: null,
};

PageBase.propTypes = {
  children: PropTypes.node,
};

export function NavSider({ data }) {
  const { pathname } = useLocation();
  const isActive = data.to === `/${pathname.split('/')[1].toLowerCase()}`;
  const className = [
    isActive && styles.active,
    styles['nav-item'],
  ].filter(Boolean).join(' ');

  return (
    <Link className={className} to={data.to}>
      <figure>
        <img src={data.icon} alt={`${data.name}-advotics-icon`} />
      </figure>
    </Link>
  );
}

NavSider.defaultProps = {
  data: {},
};

NavSider.propTypes = {
  data: PropTypes.object,
};
