import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import dashboard from '../pages/Dashboard/reducer';

const rootReducer = combineReducers({
  dashboard,
  routing: routerReducer,
});

export default rootReducer;
