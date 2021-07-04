/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import styles from './index.css';
import { thousandSeparator } from '../../../utils/format';

export default function Chart({ data }) {
  const lengthUnit = ` (per ${thousandSeparator(10 ** data[0]?.length)})`;
  return (
    <div className={styles.root}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          width={600}
          height={400}
          data={data}
          margin={{
            top: 16,
            right: 0,
            bottom: 16,
            left: -16,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" interval="preserveStartEnd" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Gross" unit={lengthUnit} barSize={20} fill="var(--primary-color)" />
          <Bar dataKey="Nett" unit={lengthUnit} barSize={20} fill="var(--secondary-color)" />
          <Bar dataKey="APV" unit=" (per 100,000)" barSize={20} fill="var(--red-color)" />
          <Line type="monotone" dataKey="UPT" stroke="var(--secondary-color-dark)" strokeWidth={2} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

Chart.defaultProps = {
  data: [],
};

Chart.propTypes = {
  data: PropTypes.array,
};
