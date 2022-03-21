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
Nour
Nour El Houda
import produce from 'immer';
import ActionTypes from '../constants/products.constants';
import { ProductsActions, ProductsState } from '../types/products.types';
import {
	handleAddProduct,
	handleIncrementQuantity,
	handleDecrementQuantity,
	createBasketProductsIdsList
} from '../../utils/reducer.helper';

// The initial state of the reducer
export const initialState: ProductsState = {
	data: {
		productsList: [],
		itemsCount: 0,
		brandsList: [],
		tags: [],
		productsTypes: [],
		basket: {
			productsList: [],
			totalPrice: 0
		}
	},
	local: {
		loading: {
			fetchingProducts: false,
			fetchingCompanies: false,
			fetchingTags: false,
			fetchingProductsTypes: false,
			addingProduct: false,
			incrementQuantity: false,
			calculateTotalCost: false,
			decrementQuantity: false
		},
		basketProductsIdsList: [ '' ],
		hasError: false,
		errors: {
			fetchingProducts: '',
			fetchingCompanies: '',
			fetchingTags: '',
			fetchingProductsTypes: '',
			addingProduct: '',
			incrementQuantity: '',
			calculateTotalCost: '',
			decrementQuantity: ''
		}
	}
};

const productListingReducer = (state: ProductsState = initialState, action: ProductsActions | any): ProductsState =>
	produce(state, (draft: ProductsState) => {
		switch (action.type) {
			//Search products by page with sort and filter
			case ActionTypes.SEARCH_PRODUCTS.request:
				draft.local.loading.fetchingProducts = true;
				draft.local.hasError = false;
				draft.local.errors.fetchingProducts = '';
				break;
			case ActionTypes.SEARCH_PRODUCTS.success:
				draft.local.loading.fetchingProducts = false;
				draft.local.hasError = false;
				draft.local.errors.fetchingProducts = '';
				draft.data.productsList = action.data.data;
				draft.data.itemsCount = action.data.productsCount;
				break;
			case ActionTypes.SEARCH_PRODUCTS.failure:
				draft.local.loading.fetchingProducts = false;
				try {
					draft.local.errors.fetchingProducts = action.errors.response.data;
				} catch (e) {
					draft.local.hasError = true;
					draft.local.errors.fetchingProducts = 'Server error';
				}
				break;

			//Fetch companies
			case ActionTypes.FETCH_COMPANIES.request:
				draft.local.loading.fetchingCompanies = true;
				draft.local.hasError = false;
				draft.local.errors.fetchingCompanies = '';
				break;
			case ActionTypes.FETCH_COMPANIES.success:
				draft.local.loading.fetchingCompanies = false;
				draft.local.hasError = false;
				draft.local.errors.fetchingCompanies = '';
				draft.data.brandsList = action.data;
				break;
			case ActionTypes.FETCH_COMPANIES.failure:
				draft.local.loading.fetchingCompanies = false;
				try {
					draft.local.errors.fetchingCompanies = action.errors.response.data;
				} catch (e) {
					draft.local.hasError = true;
					draft.local.errors.fetchingCompanies = 'Server error';
				}
				break;
			//Fetch tags
			case ActionTypes.FETCH_TAGS.request:
				draft.local.loading.fetchingTags = true;
				draft.local.hasError = false;
				draft.local.errors.fetchingTags = '';
				break;
			case ActionTypes.FETCH_TAGS.success:
				draft.local.loading.fetchingTags = false;
				draft.local.hasError = false;
				draft.local.errors.fetchingTags = '';
				draft.data.tags = action.data;
				break;
			case ActionTypes.FETCH_TAGS.failure:
				draft.local.loading.fetchingTags = false;
				try {
					draft.local.errors.fetchingTags = action.errors.response.data;
				} catch (e) {
					draft.local.hasError = true;
					draft.local.errors.fetchingTags = 'Server error';
				}
				break;
			//Fetch products types
			case ActionTypes.FETCH_PRODUCTS_TYPES.request:
				draft.local.loading.fetchingProductsTypes = true;
				draft.local.hasError = false;
				draft.local.errors.fetchingProductsTypes = '';
				break;
			case ActionTypes.FETCH_PRODUCTS_TYPES.success:
				draft.local.loading.fetchingProductsTypes = false;
				draft.local.hasError = false;
				draft.local.errors.fetchingProductsTypes = '';
				draft.data.productsTypes = action.data;
				break;
			case ActionTypes.FETCH_PRODUCTS_TYPES.failure:
				draft.local.loading.fetchingProductsTypes = false;
				try {
					draft.local.errors.fetchingProductsTypes = action.errors.response.data;
				} catch (e) {
					draft.local.hasError = true;
					draft.local.errors.fetchingProductsTypes = 'Server error';
				}
				break;
			//add product to basket
			case ActionTypes.ADD_PRODUCT.request:
				draft.local.loading.addingProduct = true;
				draft.local.errors.addingProduct = '';
				break;
			case ActionTypes.ADD_PRODUCT.success:
				draft.local.loading.addingProduct = false;
				draft.local.errors.addingProduct = '';
				draft.data.basket = handleAddProduct(state.data.basket, action.payload);
				draft.local.basketProductsIdsList = createBasketProductsIdsList(
					state.local.basketProductsIdsList,
					action.payload.slug
				);
				break;
			case ActionTypes.ADD_PRODUCT.failure:
				draft.local.loading.addingProduct = false;
				try {
					draft.local.errors.addingProduct = action.errors.response.data;
				} catch (e) {
					draft.local.errors.addingProduct = 'Server error';
				}
				break;
			//Increment product quantity
			case ActionTypes.INCREMENT_PRODUCT_QUANTITY.request:
				draft.local.loading.incrementQuantity = true;
				draft.local.errors.incrementQuantity = '';
				break;
			case ActionTypes.INCREMENT_PRODUCT_QUANTITY.success:
				draft.local.loading.incrementQuantity = false;
				draft.local.errors.incrementQuantity = '';
				const { newProductsList, totPrice } = handleIncrementQuantity(state.data.basket, action.payload);
				draft.data.basket.productsList = newProductsList;
				draft.data.basket.totalPrice = totPrice;
				break;
			case ActionTypes.INCREMENT_PRODUCT_QUANTITY.failure:
				draft.local.loading.incrementQuantity = false;
				try {
					draft.local.errors.incrementQuantity = action.errors.response.data;
				} catch (e) {
					draft.local.errors.incrementQuantity = 'Server error';
				}
				break;
			//decrement product quantity
			case ActionTypes.DECREMENT_PRODUCT_QUANTITY.request:
				draft.local.loading.decrementQuantity = true;
				draft.local.errors.decrementQuantity = '';
				break;
			case ActionTypes.DECREMENT_PRODUCT_QUANTITY.success:
				draft.local.loading.decrementQuantity = false;
				draft.local.errors.decrementQuantity = '';
				const { productsList, totalPrice } = handleDecrementQuantity(state.data.basket, action.payload);
				draft.data.basket.productsList = productsList;
				draft.data.basket.totalPrice = totalPrice;
				break;
			case ActionTypes.DECREMENT_PRODUCT_QUANTITY.failure:
				draft.local.loading.decrementQuantity = false;
				try {
					draft.local.errors.decrementQuantity = action.errors.response.data;
				} catch (e) {
					draft.local.errors.decrementQuantity = 'Server error';
				}
				break;
		}
	});

export default productListingReducer;


*/
