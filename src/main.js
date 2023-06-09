import { createApp } from 'vue'
import App from './App.vue'

// Importamos estilos
import './index.css'
import './leaflet.css'
// Importamos las rutas
import router from './router'

// Importamos el store
import store from './store' 


// Llamar a la acción para inicializar el estado desde localStorage
store.dispatch('initializeStateFromLocalStorage');
// Inicializamos el app
const app = createApp(App);

app.use(router).use(store).mount('#app')