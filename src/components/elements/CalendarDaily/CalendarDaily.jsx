/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styles from './index.css';

export default function CalendarDaily(props) {
  const {
    date, disabledAfter, disabledBefore, name, onSelect,
  } = props;
  const objDay = date ? moment(date) : moment();
  const objAfter = moment(disabledAfter);
  const objBefore = moment(disabledBefore);
  const toYear = objDay.year();
  const toMonth = objDay.month();
  const [year, setYear] = useState(toYear);
  const [month, setMonth] = useState(toMonth);
  const months = moment.months();
  const weekdays = moment.weekdaysMin();
  const days = moment().year(year).month(month).daysInMonth();
  const firstDay = moment().year(year).month(month).date(1)
    .day();
  const firstDate = moment(firstDay).add(-1, 'days').date();
  const lastDay = 7 - moment().year(year).month(month + 1).date(1)
    .day();

  const onClickArrow = (next) => () => {
    if (next && month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else if (next) {
      setMonth(month + 1);
    } else if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  useEffect(() => {
    setMonth(toMonth);
    setYear(toYear);
  }, [date]);

  const onClickDate = (i) => () => onSelect(moment().year(year).month(month).date(i + 1)
    .format('YYYY-MM-DD'));

  return (
    <div className={styles.root}>
      <label>{name}</label>
      <button type="button" onClick={onClickArrow(false)}>
        <span className={styles['arrow-left']} />
      </button>
      <b>
        {`${months[month]} ${year}`}
      </b>
      <button type="button" onClick={onClickArrow(true)}>
        <span className={styles['arrow-right']} />
      </button>
      {weekdays.map((i) => <p key={i}>{i}</p>)}
      <span className={styles.horizontal} />
      {[...Array.from({ length: firstDay }).keys()]
        .map((i) => <span key={`prev-${i}`}>{firstDate + 1 - (firstDay - i)}</span>)}
      {[...Array.from({ length: days }).keys()].map((i, idx) => {
        const objDayLoop = moment().year(year).month(month).date(i + 1);
        const selected = objDay.isSame(objDayLoop, 'day');
        const isDisabledAfter = disabledAfter && objAfter.isBefore(objDayLoop, 'day');
        const isDisabledBefore = disabledBefore && objBefore.isAfter(objDayLoop, 'day');
        if (isDisabledAfter) {
          return <span key={idx}>{i + 1}</span>;
        }
        if (isDisabledBefore) {
          return <span key={idx}>{i + 1}</span>;
        }
        return (
          <button
            type="button"
            disabled={date && selected}
            key={idx}
            onClick={onClickDate(i)}
          >
            {i + 1}
          </button>
        );
      })}
      {[...Array.from({ length: lastDay }).keys()].map((i) => (
        lastDay < 7 && <span key={`next-${i}`}>{lastDay + 1 - (lastDay - i)}</span>
      ))}
    </div>
  );
}

CalendarDaily.defaultProps = {
  date: '',
  disabledAfter: '',
  disabledBefore: '',
  name: '',
  onSelect: () => { },
};

CalendarDaily.propTypes = {
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  disabledAfter: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  disabledBefore: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  name: PropTypes.string,
  onSelect: PropTypes.func,
};
