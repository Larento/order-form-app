<template>
	<form-label :class="$attrs.class">
		<template #default>
			<input
				ref="inputElemRef"
				v-model="value"
				v-bind="{ ...$attrs, class: {} }"
				:required="props.required"
				class="block px-3 py-1.5 border border-solid rounded-md border-gray-300 shadow-sm font-normal text-gray-900 placeholder:text-gray-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
				:class="{
					'focus:invalid:ring-red-900 focus:invalid:border-red-900 invalid:ring-1 invalid:ring-red-500 invalid:border-red-500 invalid:text-red-900 [&:invalid+*:after]:block':
						justSubmitted,
				}"
			/>
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
	required?: boolean;
	filter?: (value: string) => string;
	submit?: boolean;
}

export default {
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import FormLabel from './FormLabel.vue';

const props = withDefaults(defineProps<Props>(), {
	modelValue: '',
	filter: (value: string) => value,
	submit: false,
});

const emit = defineEmits<{
	(e: 'update:modelValue', modelValue: string): void;
}>();

const justSubmitted = ref(false);
const inputElemRef = ref<HTMLInputElement | null>(null);

const labelText = computed(() => {
	return `${props.label}${props.required ? '*' : ''}`;
});

const value = computed({
	get(): string {
		return props.modelValue;
	},
	set(value: string) {
		justSubmitted.value = false;
		const filteredValue = props.filter(value);
		(inputElemRef.value as HTMLInputElement).value =
			filteredValue;
		emit('update:modelValue', filteredValue);
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
