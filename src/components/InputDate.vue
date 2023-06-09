<template>
    <div class="w-full md:col-span-1 lg:col-span-2 px-3 mb-6 md:mb-0">
        <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
            {{  props.name }}
        </label>
        <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            :id="props.value" type="date" placeholder="Jane" :name="props.value"
            v-model="inputValue">
    </div>
</template>
<script setup>
import {defineProps, ref} from 'vue'

const props = defineProps({
    name: String,
    value: String
})
const inputValue = ref('');
</script>