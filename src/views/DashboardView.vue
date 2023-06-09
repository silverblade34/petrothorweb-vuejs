<template>
  <section class="section-dashboard h-full w-full">
    <h3 class="text-2xl font-semibold text-neutral-600">Dashbaord</h3>
    <div class="container-charts pt-5">
      <DashboardResumen v-if="dataTablaResumenReturn" :resumen="dataTablaResumenReturn" />
      <div class="charts doughnutChart">
        <h4 class="pb-3 font-semibold">GLNS Abastecidos</h4>
        <DoughnutChart :chartData="chartAbastecidosEmpresa" />
      </div>
      <div class="charts">
        <h4 class="pb-3 font-semibold">GLNS abastecidos por cisterna</h4>
        <BarChart :chartData="chartAbastecidosCisterna" />
      </div>
    </div>
    <div class="container-charts-2 w-full flex flex-row gap-3 pb-5">
      <div class="w-full bg-white basis-1/2 p-3 rounded-xl mt-3">
        <h4 class="pb-3 font-semibold text-center pt-2">GLNS abastecidos por día en el mes</h4>
        <BarChart :chartData="acumuladoDias" />
      </div>
      <div class="w-full bg-white basis-1/2 p-3 rounded-xl mt-3">
        <h4 class="pb-3 font-semibold text-center pt-2">GLNS abastecidos por mes en el año</h4>
        <LineChart :chartData="chartLineMeses" />
      </div>
    </div>
    <div class="w-full pb-10">
      <div class="w-full bg-white p-3 rounded-xl pb-5">
        <h4 class="font-semibold text-center mb-2">Abastecimientos concurrentes</h4>
        <HeatMap v-if="dataMapa.length > 0" :datalist="dataMapa" />
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent, onMounted, ref, computed } from 'vue';
import { DoughnutChart, BarChart, LineChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import { graficos_data, data_mapa } from '@/services/DashboardService';
import DashboardResumen from '@/components/DashboardResumen.vue';
import HeatMap from '@/components/HeatMap.vue';
import store from '@/store'

Chart.register(...registerables);

const obtenerLabelsDias = () => {
  const labelsDias = [];
  const currentDate = new Date();
  const numberOfDays = currentDate.getDate();
  for (let i = 1; i <= numberOfDays; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    const formattedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })}`;
    labelsDias.push(formattedDate);
  }
  return labelsDias;
};

export default defineComponent({
  name: "DashboardView",
  components: { DoughnutChart, BarChart, DashboardResumen, LineChart, HeatMap },
  setup() {
    const gnlsAbastecido = ref([]);
    const dataMapa = ref([]);
    const gnlsCisternaGalones = ref([]);
    const galonesMes = ref([]);
    const galonesDias = ref([]);
    const dataTablaResumenReturn = ref(null);
    const labelsDias = obtenerLabelsDias();

    const formarEstructuraFecha = (currentday) => {
      const year = currentday.getFullYear();
      const month = String(currentday.getMonth() + 1).padStart(2, '0');
      const day = String(currentday.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    const dataTablaResumen = (data) => {
      const dataResumen = {}
      dataResumen["clientesAbastecidos"] = data.clientegalones.filter(item => item.suma != 0).length;
      dataResumen["cisternasOperativas"] = data.cisternasoperativas.length;
      dataResumen["galonesTotales"] = data.galonestotales[0].suma;
      dataResumen["unidadesAbastecidas"] = data.equipounidades.length;
      dataResumen["ticketsEmitidos"] = data.numerotickets.length;
      return dataResumen
    }

    onMounted(() => {
      // Obtengo la fecha actual en formato 2023-05-25
      const currentDate = new Date();
      const Dateinicio = formarEstructuraFecha(currentDate);
      // Obtengo la fecha del dia siguiente en formato 2023-05-25
      const nextDay = new Date();
      nextDay.setDate(currentDate.getDate() + 1);
      const DateFin = formarEstructuraFecha(nextDay);

      graficos_data(Dateinicio, DateFin, store.state.codcliente)
        .then(response => {
          gnlsAbastecido.value = response.data.data.clientegalones;
          gnlsCisternaGalones.value = response.data.data.cisternagalones;
          dataTablaResumenReturn.value = dataTablaResumen(response.data.data);
        });
      data_mapa(store.state.codcliente, Dateinicio)
        .then(response => {
          dataMapa.value = response.data.data.dataMapacalor;
          galonesMes.value = response.data.data.galones_de_todos_los_meses;
          galonesDias.value = response.data.data.galones_de_todos_los_dias;
        });
    });

    const chartAbastecidosEmpresa = computed(() => ({
      labels: gnlsAbastecido.value.map(item => item.cliente),
      datasets: [
        {
          data: gnlsAbastecido.value.map(item => item.suma),
          backgroundColor: ["#EC7063", "#5DADE2", "#76D7C4", "#FAD7A0", "rgba(250, 163, 64, 0.815)", "#0AF2F9", "#A66E07", "#A61F7A", "#16F27D", "#458A8C", "#0A733B", "#F2BB16"],
        },
      ],
    }));

    const chartAbastecidosCisterna = computed(() => ({
      labels: gnlsCisternaGalones.value.map(item => item.cisterna),
      datasets: [
        {
          backgroundColor: ["#EC7063", "#5DADE2", "#76D7C4", "#FAD7A0", "rgba(250, 163, 64, 0.815)"],
          data: gnlsCisternaGalones.value.map(item => item.cantidad),
          label: ["Cisternas"]
        }
      ]
    }));

    const acumuladoDias = computed(() => ({
      labels: labelsDias,
      datasets: [
        {
          backgroundColor: ["#EC7063"],
          data: galonesDias.value.map(item => item[0].suma),
          label: ["Galones abastecidos por día"]
        }
      ]
    }))

    const chartLineMeses = computed(() => ({
      labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"],
      datasets: [
        {
          data: galonesMes.value.map(item => item[0].suma),
          backgroundColor: ["#5DADE2"],
          label: ["Galones Abastecidos por mes"]
        },
      ],
    }));

    return {
      chartAbastecidosEmpresa,
      chartAbastecidosCisterna,
      dataTablaResumenReturn,
      dataMapa,
      galonesDias,
      galonesMes,
      acumuladoDias,
      chartLineMeses
    };
  },
});

</script>

<style lang="scss" scoped>
.container-charts {
  display: flex;
  width: 100%;
  gap: 15px;

  .charts {
    text-align: center;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.815);
    padding: 25px;
    border-radius: 5%;
  }
}

@media screen and (min-width: 660px) and (max-width: 1200px) {
  .container-charts {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

@media screen and (max-width: 660px) {
  .section-dashboard {
    h4 {
      font-size: 13px;
    }

    .container-charts-2 {
      display: block;
    }

    .container-charts {
      display: block;

      .charts {
        margin-bottom: 10px;
      }
    }
  }

}</style>