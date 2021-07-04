/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import moment from 'moment';
import calendar from '../../../assets/calendar.png';
import usePopper from '../../../hooks/usePopper';
import Button from '../Button';
import Popper from '../Popper';
import CalendarDaily from '../CalendarDaily';
import styles from './index.css';

export default function PeriodSelection() {
  const [startDate, setStartDate] = useState(moment().add(-7, 'days'));
  const [endDate, setEndDate] = useState(moment().add(-1, 'days'));
  const combinedDate = `${startDate.format('DD MMMM YYYY')} - ${endDate.format('DD MMMM YYYY')}`;
  const [date, setDate] = useState(combinedDate);
  const [open, setOpen] = useState(false);
  const [chosen, setChosen] = useState('Last 7 days');
  const disableAfterEndDate = moment(startDate).add(6, 'M').isAfter(moment()) ? moment().add(-1, 'd') : moment(startDate).add(6, 'M');

  const onClick = () => setOpen(!open);
  const onApply = () => {
    setOpen(false);
    setDate(combinedDate);
  };

  const updateDate = (choose, start, end) => {
    setStartDate(moment().add(-start, 'days'));
    setEndDate(moment().add(-end, 'days'));
    setChosen(choose);
  };

  const choices = [
    {
      label: 'Today',
      disabled: true,
      action: () => updateDate('Today'),
    },
    {
      label: 'Yesterday',
      action: () => updateDate('Yesterday', 1, 1),
    },
    {
      label: 'Last 7 days',
      action: () => updateDate('Last 7 days', 7, 1),
    },
    {
      label: 'Last 30 days',
      action: () => updateDate('Last 30 days', 30, 1),
    },
    {
      label: 'This Month',
      action: () => {
        setStartDate(moment().startOf('month'));
        setEndDate(moment());
        setChosen('This Month');
      },
    },
  ];

  const popperDate = usePopper();

  const rootStyles = [
    styles.root,
    open && styles.open,
  ].filter(Boolean).join(' ');

  return (
    <div className={rootStyles}>
      <div
        className={styles.summary}
        ref={popperDate.buttonRef}
        onClick={onClick}
      >
        <img src={calendar} alt="calendar" />
        <h5>Period</h5>
        <h5>
          {!open && date}
        </h5>
        <Button variant="link" onClick={onClick}>
          <span />
        </Button>
      </div>
      <Popper
        className={styles.popper}
        onClose={() => setOpen(false)}
        open={open}
        {...{ ...popperDate, style: {} }}
      >
        <section className={styles.choice}>
          {choices.map((data, key) => (
            <Button
              className={[styles['choice-item'], data.label === chosen ? styles.active : ''].join(' ')}
              variant="link"
              onClick={data.action}
              key={`choices-${key + 1}`}
              disabled={data.disabled}
            >
              <p>{data.label}</p>
            </Button>
          ))}
          <Button size="small" fixed onClick={onApply}>
            <p>Apply</p>
          </Button>
        </section>
        <CalendarDaily
          onSelect={(v) => { setStartDate(moment(v)); setChosen(''); }}
          date={startDate}
          disabledAfter={endDate}
          disabledBefore={moment(endDate).add(-6, 'M')}
        />
        <CalendarDaily
          onSelect={(v) => { setEndDate(moment(v)); setChosen(''); }}
          date={endDate}
          disabledAfter={disableAfterEndDate}
          disabledBefore={startDate}
        />
      </Popper>
    </div>
  );
}
