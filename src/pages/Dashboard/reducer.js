import { LOADING, DATA_FETCHED } from './constants';
import ProductImg from '../../assets/product2.webp';
import { sortByDescending } from '../../utils/format';

const bestSelling = sortByDescending([0, 1, 2, 3, 4].map((n) => ({
  name: `Produk ${n}`,
  id: n,
  image: ProductImg,
  price: 100000,
  quantity: Math.floor(Math.random() * 100),
})), 'quantity');

const topCompetitor = [0, 1, 2, 3, 4].map((n) => ({
  name: `Produk ${n}`,
  id: n,
  image: ProductImg,
  price: 100000,
  quantity: Math.floor(Math.random() * 100),
}));

const initialState = {
  averagePurchase: [],
  bestSelling,
  topCompetitor,
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
