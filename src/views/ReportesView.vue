<template>
    <section class="h-full w-full">
        <h3 class="text-2xl font-bold mb-6">Reportes</h3>
        <section>
            <div class="w-full bg-white p-3 rounded-lg">
                <form @submit.prevent="obtenerDatosFormulario" class="w-full mt-3">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-9 gap-3 mb-6">
                        <SelectForm name="Cliente" :options="ListselectCliente" v-model="selectedCliente"
                            @selected="handleClienteSelected" class="col-span-2 md:col-span-1 lg:col-span-2 text-sm" />
                        <SelectForm name="Cisterna" :options="ListselectCisterna" v-model="selectedCisterna"
                            @selected="handleCisternaSelected" class="col-span-2 md:col-span-1 lg:col-span-2 text-sm" />
                        <InputDate name="Fecha desde" :value="fechaDesde" v-model="fechaDesde"
                            @input="handleFechaDesdeInput" class="col-span-2 md:col-span-1 lg:col-span-2 text-sm" />
                        <InputDate name="Fecha hasta" :value="fechaHasta" v-model="fechaHasta"
                            @input="handleFechaHastaInput" class="col-span-2 md:col-span-1 lg:col-span-2 text-sm" />
                        <div class="col-span-2 md:col-span-1 lg:col-span-1 flex items-center justify-center">
                            <button type="submit"
                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-auto rounded-full">
                                Buscar
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
        <section class="bg-white p-4 rounded-lg mt-5 mb-5">
            <button @click="exportarExcel"
                class="btn bg-lime-600 text-white p-3 text-sm rounded-full hover:bg-lime-700 transition duration-300 mb-3">
                Exportar excel
            </button>
            <DataTable :data="data" :headerList="headerList" class="overflow-x-scroll"/>
        </section>
        <!-- PRUEBA -->
    </section>
</template>


<script>
import { defineComponent, ref, onMounted } from 'vue';
import { reportesData, listClientesCisternas } from '../services/ReportsService';
import { exportarDatosAExcel } from '../services/ExcelService'; // Importa el servicio de exportación a Excel
import DataTable from '@/components/DataTable.vue';
import SelectForm from '@/components/SelectForm.vue';
import InputDate from '@/components/InputDate.vue';
import store from '@/store'
export default defineComponent({
    name: 'ReportesView',
    components: {
        DataTable,
        SelectForm,
        InputDate,
    },
    setup() {
        // Declarando nuestras variables reactivas
        const ListselectCliente = ref([]);
        const ListselectCisterna = ref([]);
        const selectedCliente = ref('');
        const selectedCisterna = ref('');
        const fechaDesde = ref('');
        const fechaHasta = ref('');
        const data = ref([]);
        const codempresa = store.state.codempresa;
        const codcliente = store.state.codcliente;
        // Lógica para obtener los datos de Vuex y asignarlos a las referencias
        onMounted(() => {
            listClientesCisternas(codempresa, codcliente)
                .then(response => {
                    ListselectCliente.value = transformDataClientes(response.data.clientes);
                    ListselectCisterna.value = transformDataCisternas(response.data.cisternas);
                })
        });
        // Datos simulados para DataTable
        const headerList = ref([
            'id',
            'Ticket',
            'Cisterna',
            'Nombre',
            'Cliente',
            'Detalle',
            'Conductor',
            'Equipo',
            'Facturación',
            'Fecha',
            'Galones',
            'Horometro',
            'Odometro',
            'Punto',
            'Recibido por',
            'Guia',
            'Latitud',
            'Longitud'
        ]);
        const handleClienteSelected = (value) => {
            selectedCliente.value = value;
        };

        const handleCisternaSelected = (value) => {
            selectedCisterna.value = value;
        };

        const handleFechaDesdeInput = (event) => {
            fechaDesde.value = event.target.value;
        };

        const handleFechaHastaInput = (event) => {
            fechaHasta.value = event.target.value;
        };

        const obtenerDatosFormulario = () => {
            if (selectedCliente.value == "") {
                selectedCliente.value = "ALL"
            }
            if (selectedCisterna.value == "") {
                selectedCisterna.value = "ALL"
            }
            reportesData(selectedCliente.value, selectedCisterna.value, fechaDesde.value, fechaHasta.value)
                .then(response => {
                    data.value = response.data.data;
                })
        }

        const exportarExcel = () => {
            const consulta = {
                cliente: selectedCliente.value,
                cisterna: selectedCisterna.value,
                fechaDesde: fechaDesde.value,
                fechaHasta: fechaHasta.value,
            };

            exportarDatosAExcel(consulta)
                .then(excelData => {
                    console.log(excelData);
                    // Aquí puedes manejar el archivo Excel generado, como descargarlo o abrirlo en una nueva ventana
                })
                .catch(error => {
                    console.error('Error al exportar a Excel:', error);
                });
        };

        return {
            ListselectCliente,
            ListselectCisterna,
            headerList,
            data,
            selectedCliente,
            selectedCisterna,
            fechaDesde,
            fechaHasta,
            handleClienteSelected,
            handleCisternaSelected,
            handleFechaDesdeInput,
            handleFechaHastaInput,
            obtenerDatosFormulario,
            exportarExcel
        };
    },
});


function transformDataClientes(data) {
    const transformedData = data.map(item => ({ key: item.codcliente, name: item.cliente }));
    transformedData.unshift({ key: 'ALL', name: 'Todos' });
    return transformedData;
}

function transformDataCisternas(data) {
    const transformedData = data.map(item => ({ key: item.codcisterna, name: item.codcisterna }));
    transformedData.unshift({ key: 'ALL', name: 'Todos' });
    return transformedData;
}
</script>

<style lang="scss"></style>