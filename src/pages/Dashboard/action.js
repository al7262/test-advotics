/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import moment from 'moment';
import { LOADING, DATA_FETCHED } from './constants';
import Product1 from '../../assets/product1.webp';
import Product2 from '../../assets/product2.webp';
import { roundNumber, sortByDescending } from '../../utils/format';

// start of mock database

function getDates(startDate = moment().subtract(2, 'years'), stopDate = moment()) {
  const dateArray = [];
  let currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(moment(currentDate).format('YYYY-MM-DD'));
    currentDate = moment(currentDate).add(1, 'days');
  }
  return dateArray;
}

const image = [Product1, Product2];

const calcPrice = () => {
  const basePrice = Math.ceil(Math.random() * 50) + 50;
  const baseProfit = Math.ceil(basePrice * 0.5);
  return { price: basePrice * 1000, profit: baseProfit * 1000 };
};

const products = [...Array(10).keys()].map((n) => ({
  ...calcPrice(),
  name: `Produk ${n + 1}`,
  id: n + 1,
  image: image[Math.ceil(Math.random() * 2) - 1],
  competitor: Math.ceil(Math.random() * 100),
}));

const getProductSales = () => products
  .map((i) => ({ ...i, quantity: Math.ceil(Math.random() * 100) }));

const dates = getDates();
const startSlice = Math.ceil(Math.random() * 5) - 1;
const endSlice = Math.ceil(Math.random() * 5) + 4;
const sales = dates.map((date) => ({
  date,
  items: getProductSales().slice(startSlice, endSlice),
}));

const getSelectedData = ({ startDate, endDate }) => {
  const rangedDate = getDates(startDate, endDate);
  return sales.filter((i) => rangedDate.includes(i.date));
};

const getBestSellingAndCompetitor = (payload) => {
  const selectedData = getSelectedData(payload);
  const findQuantity = (items, id) => (items.find((i) => i.id === id)
    ? items.find((i) => i.id === id).quantity : 0);
  const productSales = products.map((i) => {
    const totalSales = selectedData.reduce((a, b) => (a + findQuantity(b.items, i.id)), 0);
    return {
      ...i,
      quantity: totalSales,
    };
  });
  return {
    bestSelling: sortByDescending(Array.from(productSales), 'quantity'),
    topCompetitor: sortByDescending(Array.from(productSales), 'competitor'),
  };
};

const getPurchaseValue = (payload) => {
  const selectedData = getSelectedData(payload);
  const length = selectedData.length > 7 ? 7 : selectedData.length;
  const numPerChart = Math.ceil(selectedData.length / length);
  const splittedData = new Array(Math.ceil(selectedData.length / numPerChart))
    .fill().map(() => selectedData.splice(0, numPerChart));

  const compileDetail = splittedData.map((data) => {
    const startDate = data[0].date;
    const endDate = data[data.length - 1].date;
    const combinedDate = `${moment(startDate).format('DD MMM')}-${moment(endDate).format('DD MMM')}`;
    const calcTransaction = (qty) => Math.ceil(qty / Math.ceil(Math.random() * 3));
    const compileQuantity = (item) => item.reduce((a, b) => a + b.quantity, 0);
    const compilePriceQty = (item) => item.reduce((a, b) => a + (b.quantity * b.price), 0);
    const compileProfitQty = (item) => item.reduce((a, b) => a + (b.quantity * b.profit), 0);
    const compileTransaction = (item) => item.reduce((a, b) => a + calcTransaction(b.quantity), 0);
    const totalRevenue = data.reduce((a, b) => a + compilePriceQty(b.items), 0);
    const totalProfit = data.reduce((a, b) => a + compileProfitQty(b.items), 0);
    const totalTransaction = data.reduce((a, b) => a + compileTransaction(b.items), 0);
    const totalQuantity = data.reduce((a, b) => a + compileQuantity(b.items), 0);

    return {
      name: startDate === endDate ? moment(startDate).format('DD MMM') : combinedDate,
      Gross: totalRevenue,
      Nett: totalProfit,
      APV: roundNumber(totalRevenue / totalTransaction / 10 ** 5),
      UPT: roundNumber(totalQuantity / totalTransaction),
    };
  });

  const checkLength = (item) => item.Gross.toString().length - 1;
  const lengthTotal = compileDetail.reduce((a, b) => {
    if (checkLength(b) > a) {
      return checkLength(b);
    }
    return a;
  }, 0);
  const convertedDetail = compileDetail.map((i) => ({
    ...i,
    Gross: roundNumber(i.Gross / 10 ** lengthTotal),
    Nett: roundNumber(i.Nett / 10 ** lengthTotal),
    length: lengthTotal,
  }));
  return convertedDetail;
};

function fetchFilteredData(payload) {
  return ({
    ...getBestSellingAndCompetitor(payload),
    averagePurchase: getPurchaseValue(payload),
  });
}

// end of mock database

function loadingAction(isLoading) {
  return { type: LOADING, isLoading };
}

function dataFetchedAction(data) {
  return { type: DATA_FETCHED, data };
}

export function fetchData(payload) {
  return (dispatch) => {
    dispatch(loadingAction(true));
    try {
      const data = fetchFilteredData(payload);
      dispatch(dataFetchedAction(data));
    } catch (err) {
      console.log(err);
    }
  };
}
