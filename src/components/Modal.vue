<template>
	<div
		@click.self="handleClose"
		class="grid place-items-center justify-items-stretch sm:justify-items-center fixed inset-0 p-2.5 sm:p-10 bg-gray-500/75"
	>
		<div class="sm:max-w-fit p-5 sm:p-6 rounded-xl bg-white">
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
	(e: 'close'): void;
}>();

function handleClose() {
	emit('close');
}
</script>
