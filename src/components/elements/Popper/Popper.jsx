/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

export default function Popper(props) {
  const {
    children, className, onClose, open, popperRef, style,
  } = props;
  const [content, setContent] = useState(null);
  const customClass = [
    styles.root,
    !content && styles['popper-closed'],
    className,
  ].filter(Boolean).join(' ');

  const popperClose = (event) => {
    if (popperRef && !popperRef.contains(event.target)) {
      onClose();
      setContent(null);
    }
  };

  useEffect(() => {
    if (open) {
      setContent(children);
      window.addEventListener('click', popperClose);
    }

    return () => {
      setContent(null);
      window.removeEventListener('click', popperClose);
    };
  }, [open, children]);

  return (
    <section className={customClass} onClick={(e) => e.stopPropagation()} style={style}>
      {content}
    </section>
  );
}

Popper.defaultProps = {
  children: null,
  className: '',
  onClose: () => { },
  open: false,
  popperRef: null,
  style: {},
};

Popper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  popperRef: PropTypes.object,
  style: PropTypes.object,
};
