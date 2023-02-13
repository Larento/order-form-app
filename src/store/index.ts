import { createStore, Store as VuexStore } from 'vuex';

import { RootState, state } from './state';
import { TypedGetters, getters } from './getters';
import { TypedCommit, mutations } from './mutations';
import { TypedDispatch, actions } from './actions';

export const store = createStore({
	state,
	getters,
	mutations,
	actions,
});

export type Store = Omit<
	VuexStore<RootState>,
	'getters' | 'commit' | 'dispatch'
> &
	TypedGetters &
	TypedCommit &
	TypedDispatch;

export function useStore(): Store {
	return store;
}
