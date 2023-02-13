import { DispatchOptions, ActionTree, ActionContext } from 'vuex';
import axios from 'axios';

import { RootState } from './state';
import {
	RootMutations,
	RootMutationTypes,
	TypedCommit,
} from './mutations';
import {
	OrderDetails,
	OrderRequest,
	OrderRequestBody,
} from '../types';
import { stripFormat } from '../phone';

const API_URL =
	'http://hh.autodrive-agency.ru/test-tasks/front/task-7/';

export type TypedDispatch = {
	dispatch<K extends keyof RootActions>(
		key: K,
		payload?: Parameters<RootActions[K]>[1],
		options?: DispatchOptions
	): ReturnType<RootActions[K]>;
};

export enum RootActionTypes {
	BEGIN_ORDER = 'BEGIN_ORDER',
	CANCEL_ORDER = 'CANCEL_ORDER',
	CONFIRM_ORDER = 'CONFIRM_ORDER',
}

type AugmentedActionContext = Omit<
	ActionContext<RootState, RootState>,
	'commit'
> &
	TypedCommit;

export interface RootActions {
	[RootActionTypes.BEGIN_ORDER](
		{ commit }: AugmentedActionContext,
		details?: Partial<OrderDetails>
	): void;
	[RootActionTypes.CANCEL_ORDER]({
		commit,
	}: AugmentedActionContext): void;
	[RootActionTypes.CONFIRM_ORDER]({
		commit,
	}: AugmentedActionContext): void;
}

export const actions: ActionTree<RootState, RootState> & RootActions =
	{
		[RootActionTypes.BEGIN_ORDER]({ commit }, details) {
			commit(RootMutationTypes.CLEAR_ORDER_STATUS);
			commit(RootMutationTypes.SET_ORDER_DETAILS, details);
			commit(RootMutationTypes.SET_ORDER_STATUS, {
				ordering: true,
			});
		},

		[RootActionTypes.CANCEL_ORDER]({ commit }) {
			commit(RootMutationTypes.SET_ORDER_STATUS, {
				ordering: false,
				sent: false,
			});
		},

		async [RootActionTypes.CONFIRM_ORDER]({ commit, state }) {
			commit(RootMutationTypes.SET_ORDER_STATUS, {
				ordering: false,
				sent: true,
			});

			let response = {
				data: '',
			};

			let orderAnswer = OrderRequest.REJECTED;
			const order = state.order.details;
			const orderDetails: OrderRequestBody = {
				name: order.name,
				phone: stripFormat(state.order.details.phone),
				email: order.email,
				city_id: order.cityID.toString(),
			};

			try {
				response = await axios.post(API_URL, orderDetails);
				orderAnswer = OrderRequest.RESPONDED;
				console.log(response);
			} catch (error) {
				console.error(error);
			}

			commit(RootMutationTypes.SET_ORDER_STATUS, {
				received: orderAnswer,
			});

			if (orderAnswer == OrderRequest.RESPONDED) {
				commit(
					RootMutationTypes.SET_ORDER_HTML_INFO,
					response.data
				);
			}
		},
	};
