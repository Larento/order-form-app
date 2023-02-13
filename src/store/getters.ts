import { GetterTree } from 'vuex';
import { City, OrderDetails, OrderStatus } from '../types';
import { RootState } from './state';

export type TypedGetters = {
	getters: {
		[K in keyof RootGetters]: ReturnType<RootGetters[K]>;
	};
};

export interface RootGetters {
	cities(state: RootState): City[];
	orderDetails(state: RootState): OrderDetails;
	orderStatus(state: RootState): OrderStatus;
	orderHtmlInfo(state: RootState): string;
}

export const getters: GetterTree<RootState, RootState> & RootGetters =
	{
		cities(state) {
			return state.cities;
		},
		orderDetails(state) {
			return state.order.details;
		},
		orderStatus(state) {
			return state.order.status;
		},
		orderHtmlInfo(state) {
			return state.order.status.htmlInfo;
		},
	};
