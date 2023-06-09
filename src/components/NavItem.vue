<script setup>
import { defineProps } from 'vue';

// eslint-disable-next-line
const props = defineProps({
    item: Object,
    expandido: Boolean
})
</script>
<template>
    <router-link v-if="!item.children.length" :href="item.href" :class="{ 'active': isCurrentPage }" class="button-link flex cursor-pointer w-full items-center py-3 px-4
        text-l font-medium text-gray-600 hover:bg-gray-200" :to="item.to">
        <i :class="item.icon"></i>
        <span class="label">{{ item.label }}</span>
    </router-link>
    <!-- <Disclosure v-else v-slot="{ open }">
        <span class=""> 
            <DisclosureButton class="flex rounded-md text-left w-full items-center py-3
                px-4 text-l font-medium text-gray-600 hover:bg-gray-200">
                <i :class="item.icon"></i>
                <span class="flex-1 label">{{ item.label }}</span> -->
                <!-- <v-icon :class="[open ? '-rotate-180' : '']" name="md-keyboardarrowdown-sharp" /> -->
            <!-- </DisclosureButton>
            <DisclosurePanel class="text-gray-500 px-4">
                <NavItem v-for="child in item.children" :item="child" :key="child.label" />
            </DisclosurePanel>
        </span>
    </Disclosure> -->
</template>

<style lang="scss">
.active {
    background-color: #e5e5e5;
    font-weight: bold;
}

.button-link {
    border-radius: 10px;
    &.router-link-exact-active {
        background-color: var(--azulbajo);
        color: var(--white);
    }
}


</style>