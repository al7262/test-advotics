import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import MoreIcon from '../../../assets/more.svg';

export default function Card({
  className, children, title, size, fixed,
}) {
  const rootStyles = [
    styles.root,
    className,
    styles[size],
    fixed && styles.fixed,
  ].filter(Boolean).join(' ');

  return (
    <div className={rootStyles}>
      <header>
        <h3 title={title}>{title}</h3>
        <img src={MoreIcon} alt="more-icon-advotics" />
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}

Card.defaultProps = {
  children: '',
  className: '',
  fixed: false,
  size: 'normal',
  title: '',
};

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  fixed: PropTypes.bool,
  size: PropTypes.string,
  title: PropTypes.string,
};
