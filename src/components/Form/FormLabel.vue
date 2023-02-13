<template>
	<label
		class="relative flex flex-col-reverse gap-1 font-medium text-gray-700"
	>
		<slot></slot>
		<div
			class="flex flex-row flex-wrap gap-x-4 justify-between after:hidden after:content-['Обязательное_поле'] after:text-red-900"
		>
			<slot name="invalid-message"></slot>
		</div>
	</label>
</template>
