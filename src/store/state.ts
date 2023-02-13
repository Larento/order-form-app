import {
	City,
	Order,
	OrderRequest,
	OrderDetails,
	OrderStatus,
} from '../types';

export type RootState = {
	cities: City[];
	order: Order;
};

export const defaultOrder: Order = {
	details: {
		name: '',
		phone: '',
		email: '',
		cityID: '',
	},
	status: {
		ordering: false,
		sent: false,
		received: OrderRequest.PENDING,
		htmlInfo: '',
	},
};

export const state: RootState = {
	cities: [
		{
			id: 1,
			name: 'Москва',
		},
		{
			id: 2,
			name: 'Санкт-Петербург',
		},
		{
			id: 3,
			name: 'Казань',
		},
	],
	order: { ...defaultOrder },
};
