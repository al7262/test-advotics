import { LOADING, DATA_FETCHED } from './constants';

// const bestSelling = sortByDescending([...Array(5).keys()].map((n) => ({
//   name: `Produk ${n}`,
//   id: n,
//   image: ProductImg,
//   price: 100000,
//   quantity: Math.floor(Math.random() * 100),
// })), 'quantity');

// const topCompetitor = [...Array(5).keys()].map((n) => ({
//   name: `Produk ${n}`,
//   id: n,
//   image: ProductImg,
//   price: 100000,
//   quantity: Math.floor(Math.random() * 100),
// }));

const initialState = {
  averagePurchase: [],
  bestSelling: [],
  topCompetitor: [],
  isLoading: false,
};

export default function reducer(state = initialState, action = {}) {
  const {
    data, isLoading, type,
  } = action;

  switch (type) {
    case LOADING:
      return {
        ...state,
        isLoading,
      };
    case DATA_FETCHED:
      return {
        ...state,
        ...data,
        isLoading: false,
      };
    default:
      return state;
  }
}
