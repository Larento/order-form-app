<template>
	<form-label :class="$attrs.class">
		<template #default>
			<select
				v-model="value"
				v-bind="$attrs"
				:required="props.required"
				class="block px-3 py-1.5 border border-solid rounded-md border-gray-300 appearance-none bg-[center_right_12px] bg-no-repeat bg-[length:20px] shadow-sm font-normal text-gray-900 placeholder:text-gray-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 invalid:text-gray-500"
				:style="{
					backgroundImage: `url(${imagePath})`,
				}"
				:class="{
					'focus:invalid:ring-red-900 focus:invalid:border-red-900 invalid:ring-1 invalid:ring-red-500 invalid:border-red-500 invalid:text-red-900 [&:invalid+*:after]:block':
						justSubmitted,
				}"
			>
				<option value="" disabled selected>
					{{ props.placeholder }}
				</option>
				<slot></slot>
			</select>
		</template>
		<template #invalid-message>
			{{ labelText }}
		</template>
	</form-label>
</template>

<script lang="ts">
export interface Props {
	label: string;
	modelValue?: string;
	placeholder?: string;
	required?: boolean;
	submit?: boolean;
}

export default {
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import FormLabel from './FormLabel.vue';
import imagePath from '../../assets/icons/chevron-down.svg';

const emit = defineEmits<{
	(e: 'update:modelValue', modelValue: string): void;
}>();

const props = withDefaults(defineProps<Props>(), {
	modelValue: '',
	placeholder: 'Выберите из списка',
	submit: false,
});

const justSubmitted = ref(false);

const labelText = computed(() => {
	return `${props.label}${props.required ? '*' : ''}`;
});

const value = computed({
	get(): string {
		return props.modelValue;
	},
	set(value: string) {
		justSubmitted.value = false;
		emit('update:modelValue', value);
	},
});

watch(
	() => props.submit,
	(newValue) => {
		if (newValue === true) {
			justSubmitted.value = true;
		}
	}
);
</script>
