<template>
	<form-select
		v-model="value"
		v-bind="$attrs"
		:submit="submit"
		label="Город"
		placeholder="Выберите город"
	>
		<option v-for="city in store.getters.cities" :value="city.id">
			{{ city.name }}
		</option>
	</form-select>
</template>

<script lang="ts">
import { Props as BaseProps } from './Form/FormInput.vue';
import { CityID } from '../types';

interface Props extends Omit<BaseProps, 'label' | 'modelValue'> {
	modelValue: CityID;
	submit?: boolean;
}
</script>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from '../store';
import FormSelect from './Form/FormSelect.vue';

const store = useStore();
const props = withDefaults(defineProps<Props>(), {
	modelValue: -1,
});

const emit = defineEmits<{
	(e: 'update:modelValue', modelValue: CityID): void;
}>();

const value = computed({
	get(): string {
		return props.modelValue.toString();
	},
	set(value: string) {
		emit('update:modelValue', parseInt(value));
	},
});
</script>
