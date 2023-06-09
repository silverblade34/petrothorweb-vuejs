<template>
    <div class="overflow-x-auto">
        <div class="inline-block min-w-full overflow-hidden">
            <div class="table-container">
            <table class="min-w-full">
                <thead>
                    <tr>
                        <th class="border px-4 py-2 text-xs" v-for="header in headerList" :key="header">{{
                            header }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in paginatedItems" :key="index">
                        <td class="border px-4 py-2 text-xs">{{ item.id }}</td>
                        <td class="border px-4 py-2 text-xs">{{ item.idticket }}</td>
                        <td class="border px-4 py-2 text-xs">{{ item.codcisterna }}</td>
                        <td class="border px-4 py-2 text-xs">{{ item.nombre }}</td>
                        <td class="border px-4 py-2 text-xs">{{ item.cliente }}</td>
                        <td class="border px-4 py-2 text-xs">{{ item.detalle }}</td>
                        <td class="border px-4 py-2 text-xs">{{ item.conductor }}</td>
                        <td class="border px-4 py-2 text-xs">{{ item.equipo }}</td>
                        <td class="border px-4 py-2 text-xs">{{ item.facturacion }}</td>
                        <td class="border px-4 py-2 text-xs">{{ item.fecha }}</td>
                        <td class="border px-4 py-2 text-xs">{{ item.galones }}</td>
                        <td class="border px-4 py-2 text-xs">{{ item.horometro }}</td>
                        <td class="border px-4 py-2 text-xs">{{ item.odometro }}</td>
                        <td class="border px-4 py-2 text-xs">{{ item.punto }}</td>
                        <td class="border px-4 py-2 text-xs">{{ item.recibido }}</td>
                        <td class="border px-4 py-2 text-xs">{{ item.guia }}</td>
                        <td class="border px-4 py-2 text-xs">{{ item.latitud }}</td>
                        <td class="border px-4 py-2 text-xs">{{ item.longitud }}</td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>

        <div class="mt-4">
            <button class="bg-sky-500 hover:bg-sky-700 text-white text-xs font-bold py-2 px-4 rounded-lg transition duration-300" @click="previousPage"
                :disabled="currentPage === 1">
                Anterior
            </button>

            <span class="mx-2">
                Página {{ currentPage }} de {{ totalPages }}
            </span>

            <button class="bg-sky-500 hover:bg-sky-700 text-white text-xs font-bold py-2 px-4 rounded-lg transition duration-300" @click="nextPage"
                :disabled="currentPage === totalPages">
                Siguiente
            </button>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        data: Array,
        headerList: Array,
    },
    data() {
        return {
            itemsPerPage: 10,
            currentPage: 1,
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.data.length / this.itemsPerPage);
        },
        paginatedItems() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.data.slice(startIndex, endIndex);
        },
    },
    methods: {
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
    },
};
</script>

<style>
.table-container {
  overflow-x: auto;
}
</style>