/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './index.css';

export default function Button(props) {
  const {
    children,
    className,
    disabled,
    fixed,
    onClick,
    type,
    variant,
    color,
    rounded,
    size,
    icon,
    to,
    isLoading,
    ...otherProps
  } = props;
  const classes = [
    styles.root,
    styles[variant],
    styles[color],
    styles[size],
    isLoading && styles.loading,
    rounded && styles.rounded,
    fixed && styles.fixed,
    className,
  ].filter(Boolean).join(' ');

  const buttonContent = () => {
    const checkLoading = isLoading && !(['link', 'circle'].includes(variant)) && size !== 'mini';
    if (checkLoading) {
      return 'Loading...';
    }
    return (
      <>
        {icon && variant !== 'link' && icon}
        {variant === 'circle' ? !icon && children[0] : children}
      </>
    );
  };

  return (
    <button
      className={classes}
      disabled={disabled || isLoading}
      onClick={onClick}
      type={type}
      {...otherProps}
    >
      {to && !isLoading && <Link aria-label={typeof children === 'string' ? children : to.split('/')[1]} to={to} />}
      {buttonContent()}
    </button>
  );
}

Button.defaultProps = {
  children: null,
  className: '',
  color: 'primary',
  disabled: false,
  fixed: false,
  icon: null,
  isLoading: false,
  onClick: () => { },
  rounded: false,
  size: 'medium',
  to: '',
  type: 'button',
  variant: 'filled',
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'secondary', 'red', 'blue']),
  disabled: PropTypes.bool,
  fixed: PropTypes.bool,
  icon: PropTypes.element,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  rounded: PropTypes.bool,
  size: PropTypes.oneOf(['mini', 'small', 'medium', 'large']),
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
  variant: PropTypes.oneOf(['filled', 'ghost', 'circle', 'link', 'outline']),
};
