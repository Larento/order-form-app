<template>
	<div
		class="flex flex-col sm:flex-row items-stretch sm:items-start gap-2.5 sm:gap-5 px-2.5 sm:px-10 lg:px-20 py-2.5 sm:py-5"
	>
		<form-button
			:tabindex="noBgInteraction ? -1 : 0"
			@click="handleClickOrder(store.getters.cities[0].id)"
			class="bg-blue-500"
		>
			Заказать в Москву
		</form-button>
		<form-button
			:tabindex="noBgInteraction ? -1 : 0"
			@click="handleClickOrder(store.getters.cities[1].id)"
			class="bg-teal-600"
		>
			Заказать в Санкт-Петербург
		</form-button>
	</div>
	<modal v-if="showOrderForm" @close="handleCloseForm">
		<order-form />
	</modal>
	<modal v-if="showStatusPopup" @close="handleClosePopup">
		<div v-if="requestError">Ошибка запроса.</div>
		<div v-else v-html="store.getters.orderHtmlInfo"></div>
	</modal>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from './store';
import { RootActionTypes } from './store/actions';
import { CityID, OrderRequest } from './types';

import FormButton from './components/Form/FormButton.vue';
import OrderForm from './components/OrderForm.vue';
import Modal from './components/Modal.vue';
import { RootMutationTypes } from './store/mutations';

const store = useStore();

const showOrderForm = computed(() => {
	const status = store.getters.orderStatus;
	return status.ordering && !status.sent;
});

const showStatusPopup = computed(() => {
	const status = store.getters.orderStatus;
	return status.received !== OrderRequest.PENDING;
});

const requestError = computed(() => {
	const status = store.getters.orderStatus;
	return status.received === OrderRequest.REJECTED;
});

const noBgInteraction = computed(() => {
	return showOrderForm || showStatusPopup;
});

function handleClickOrder(cityID: CityID) {
	store.dispatch(RootActionTypes.BEGIN_ORDER, { cityID });
}

function handleCloseForm() {
	store.dispatch(RootActionTypes.CANCEL_ORDER);
}

function handleClosePopup() {
	store.commit(RootMutationTypes.CLEAR_ORDER_STATUS);
}
</script>
