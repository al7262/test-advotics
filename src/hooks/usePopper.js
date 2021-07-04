import { useEffect, useRef, useState } from 'react';

export default () => {
  const buttonRef = useRef(null);
  const [popperRef, setPopperRef] = useState(null);
  let minWidth = '0';
  let transform = 'translate(0px, 0px)';

  if (popperRef) {
    const el = popperRef.getBoundingClientRect();
    minWidth = `${el.width}px`;
    transform = `translate(${el.left}px, ${el.top + el.height + 5}px)`;
  }

  useEffect(() => {
    setPopperRef(buttonRef.current);
  }, [buttonRef]);

  return { buttonRef, popperRef, style: { minWidth, transform } };
};
