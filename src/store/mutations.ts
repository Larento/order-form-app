import {
	Store as VuexStore,
	CommitOptions,
	MutationTree,
} from 'vuex';
import { OrderDetails, OrderStatus } from '../types';
import { RootState, defaultOrder } from './state';

export type TypedCommit = {
	commit<
		K extends keyof RootMutations,
		P extends Parameters<RootMutations[K]>[1]
	>(
		key: K,
		payload?: P,
		options?: CommitOptions
	): ReturnType<RootMutations[K]>;
};

export enum RootMutationTypes {
	SET_ORDER_DETAILS = 'SET_ORDER_DETAILS',
	SET_ORDER_STATUS = 'SET_ORDER_STATUS',
	SET_ORDER_HTML_INFO = 'SET_ORDER_HTML_INFO',
	CLEAR_ORDER_DETAILS = 'CLEAR_ORDER_DETAILS',
	CLEAR_ORDER_STATUS = 'CLEAR_ORDER_STATUS',
}

export interface RootMutations {
	[RootMutationTypes.SET_ORDER_DETAILS](
		state: RootState,
		payload: Partial<OrderDetails>
	): void;
	[RootMutationTypes.SET_ORDER_STATUS](
		state: RootState,
		payload: Partial<OrderStatus>
	): void;
	[RootMutationTypes.SET_ORDER_HTML_INFO](
		state: RootState,
		payload: string
	): void;
	[RootMutationTypes.CLEAR_ORDER_DETAILS](state: RootState): void;
	[RootMutationTypes.CLEAR_ORDER_STATUS](state: RootState): void;
}

export const mutations: MutationTree<RootState> & RootMutations = {
	[RootMutationTypes.SET_ORDER_DETAILS](state, payload) {
		state.order.details = { ...state.order.details, ...payload };
	},
	[RootMutationTypes.SET_ORDER_STATUS](state, payload) {
		state.order.status = { ...state.order.status, ...payload };
	},
	[RootMutationTypes.SET_ORDER_HTML_INFO](state, payload) {
		state.order.status.htmlInfo = payload;
	},
	[RootMutationTypes.CLEAR_ORDER_DETAILS](state) {
		state.order.details = {
			...defaultOrder.details,
		};
	},
	[RootMutationTypes.CLEAR_ORDER_STATUS](state) {
		state.order.status = {
			...defaultOrder.status,
		};
	},
};
