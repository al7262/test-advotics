/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import PeriodSelection from '../../components/elements/PeriodSelection';
import Card from '../../components/elements/Card';
import Chart from '../../components/elements/Chart';
import HelpIcon from '../../assets/help.png';
import DownArrow from '../../assets/down-arrow.svg';
import CartIcon from '../../assets/cart.svg';
import { currency, thousandSeparator } from '../../utils/format';
import styles from './index.css';

export default function Dashboard() {
  const { bestSelling, topCompetitor } = useSelector((s) => s.dashboard);
  return (
    <section className={styles.root}>
      <header className={styles.header}>
        <h1>Dashboard</h1>
        <PeriodSelection />
      </header>
      <div className={styles.snackbar}>
        <h2>Market Insight</h2>
        <img src={HelpIcon} alt="help-icon-advotics" />
        <h6>Click Here for Help</h6>
        <span />
      </div>
      <article className={styles.content}>
        <Card className={styles.sales} title="Sales Turnover" size="small">
          <b>{currency(3600000)}</b>
          <small>
            <img src={DownArrow} alt="down-arrow-advotics" />
            <b>13.8% </b>
            last period in products sold
          </small>
          <img src={CartIcon} alt="cart-icon-advotics" />
        </Card>
        <Card className={styles.chart} title="Average Purchase Value" fixed>
          <Chart />
        </Card>
        <Card className={styles.chart} title="Best Selling SKU" fixed>
          <ProductList data={bestSelling} />
        </Card>
        <Card className={styles.chart} title="Top Competitor SKU" fixed>
          <ProductList data={topCompetitor} />
        </Card>
      </article>
    </section>
  );
}

const ProductList = ({ data }) => {
  const slicedData = data.slice(0, 5);
  return (
    <div className={styles['product-list']}>
      {slicedData.map((item, key) => (
        <div className={styles['product-item']} key={`produk-${key + 1}`}>
          <img src={item.image} alt={`product-${item.name}`} />
          <h5 title={item.name}>{item.name}</h5>
          <p title={currency(item.price)}>{currency(item.price)}</p>
          <p title={`${thousandSeparator(item.quantity)} pcs`}>{`${thousandSeparator(item.quantity)} pcs`}</p>
        </div>
      ))}
    </div>
  );
};

ProductList.defaultProps = {
  data: [],
};

ProductList.propTypes = {
  data: PropTypes.array,
};
