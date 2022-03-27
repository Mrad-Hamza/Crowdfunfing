/*
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from '../../utils/history';
import productsReducer from './products.reducer';

const createReducer = (injectedReducers = {}): object | any => {
	const rootReducer = combineReducers({
		products: productsReducer,
		router: connectRouter(history),
		...injectedReducers
	});

	return rootReducer;
};
export default createReducer;
*/
