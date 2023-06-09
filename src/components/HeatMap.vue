<template>
  <div id="map-container">
    <div id="map"></div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue';
import L from 'leaflet';
import 'leaflet.heat';

export default {
  props: {
    datalist: Array
  },
  mounted() {
    this.renderHeatmap();
  },
  setup(props) {
    const map = ref(null);

    onMounted(() => {
      map.value = L.map('map').setView([-12.0827586, -77.0618789], 13);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org">OpenStreetMap</a> contributors'
      }).addTo(map.value);
      // ...
    });

    onUnmounted(() => {
      // Limpiar y destruir el mapa cuando el componente se desmonte
      map.value?.remove();
      map.value = null;
    });

    const renderHeatmap = () => {
      const heatData = props.datalist.map(point => [parseFloat(point.latitud), parseFloat(point.longitud), point.intensidad]);
      // Utilizar map.value en lugar de map en todo el código
      // eslint-disable-next-line
      const heatLayer = L.heatLayer(heatData, {
        radius: 25, // Ajusta el tamaño del radio del mapa de calor
        blur: 15, // Ajusta el suavizado del mapa de calor
        gradient: {
          0.6: '#BC2EED',
          0.65: '#57ED2E',
          1: '#ED502E'
        }
      }).addTo(map.value);
    };

    const handleResize = () => {
      if (map.value) {
        const mapContainer = document.getElementById('map-container');
        mapContainer.style.height = `${window.innerHeight}px`;
        map.value.invalidateSize();
      }
    };
    return {
      renderHeatmap,
      handleResize
    };
  }
};
</script>

<style scoped>
#map-container {
  height: 500px;
  width: 100%;
  overflow: hidden;
}

#map {
  height: 100%;
}
</style>
