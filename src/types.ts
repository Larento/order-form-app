export type CityID = number;

export type City = {
	id: CityID;
	name: string;
};

export type OrderDetails = {
	name: string;
	phone: string;
	email: string;
	cityID: CityID | '';
};

export type OrderRequestBody = Omit<OrderDetails, 'cityID'> & {
	city_id: string;
};

export enum OrderRequest {
	PENDING,
	RESPONDED,
	REJECTED,
}

export type OrderStatus = {
	ordering: boolean;
	sent: boolean;
	received: OrderRequest;
	htmlInfo: string;
};

export type Order = {
	details: OrderDetails;
	status: OrderStatus;
};
