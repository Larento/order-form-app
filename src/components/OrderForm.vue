<template>
	<form @submit="handleSubmit">
		<legend class="mb-7 text-2xl font-medium">
			Заказать звонок
		</legend>
		<fieldset
			class="grid gap-5 grid-flow-row sm:grid-cols-3 lg:grid-cols-4"
		>
			<form-input
				v-model="state.phone"
				:filter="filterPhoneInput"
				:submit="submit"
				type="tel"
				label="Телефон"
				:placeholder="phoneNumberPlaceholder"
				:pattern="phoneNumberPattern"
				required
			></form-input>
			<form-input
				v-model="state.name"
				:submit="submit"
				type="text"
				label="Имя"
				placeholder="Иван Иванов"
				pattern="[- а-яА-Я]+"
				required
			></form-input>
			<form-input
				v-model="state.email"
				:submit="submit"
				type="email"
				label="Email"
				placeholder="you@example.com"
				required
			></form-input>
			<city-select
				v-model="(state.cityID as CityID)"
				:submit="submit"
				required
				class="sm:col-span-2 lg:col-span-1"
			>
			</city-select>
			<form-button
				type="submit"
				@click="submitForm"
				class="self-end lg:col-[-2_/_-1] w-full bg-green-600"
			>
				Отправить
			</form-button>
		</fieldset>
	</form>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from 'vue';

import { OrderDetails, CityID } from '../types';
import { useStore } from '../store';
import {
	phoneNumberPlaceholder,
	phoneNumberPattern,
	formatPhoneNumber,
	stripFormat,
} from '../phone';

import FormButton from './Form/FormButton.vue';
import FormInput from './Form/FormInput.vue';
import CitySelect from './CitySelect.vue';
import { RootActionTypes } from '../store/actions';

const store = useStore();
const submit = ref(false);
const state: OrderDetails = reactive(store.getters.orderDetails);

function filterPhoneInput(value: string): string {
	return formatPhoneNumber(state.phone, value);
}

function submitForm() {
	submit.value = true;
	setTimeout(() => (submit.value = false));
}

function handleSubmit(event: Event) {
	store.dispatch(RootActionTypes.CONFIRM_ORDER);
	event.preventDefault();
}
</script>
