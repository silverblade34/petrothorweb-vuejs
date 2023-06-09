<template>
  <div class="w-full h-full flex">
    <SidebarLayout class="sidebarLayout" :dataOpenSideBar="openSidebar" :logo="logoImage"
      :logoReducido="logoReducidoImage" />
    <div class="w-full h-full overflow-hidden">
      <HeaderLayout class="headerLayout" :dataOpenSideBar="openSidebar" :username="username"
        :clickHambuger="toggleSidebar" />
      <div class="main-container w-full h-[calc(100vh-50px)] overflow-y-scroll">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import HeaderLayout from './HeaderLayout.vue'
import SidebarLayout from './SidebarLayout.vue'
import LogoExpanded from '../assets/logo-petrothor.png'
import LogoReducido from '../assets/logo-petrothor-comprimido.webp'

export default {
  components: { HeaderLayout, SidebarLayout },
  data() {
    const username = this.$store.state.username;
    return {
      username: username,
      openSidebar: true,
      logoImage: LogoExpanded,
      logoReducidoImage: LogoReducido
    }
  },
  mounted() {
    this.checkWindowWidth(); // Comprobar el ancho de la ventana al cargar el componente
    window.addEventListener('resize', this.checkWindowWidth); // Escuchar eventos de cambio de tamaño de ventana
  },
  unmounted() {
    window.removeEventListener('resize', this.checkWindowWidth); // Eliminar el evento de cambio de tamaño de ventana al desmontar el componente
  },
  methods: {
    toggleSidebar() {
      if (window.innerWidth >= 1000) {
        this.openSidebar = !this.openSidebar; // Abrir el sidebar solo si el ancho de la ventana es mayor o igual a 1000px
      }
    },
    checkWindowWidth() {
      if (window.innerWidth < 1000) {
        this.openSidebar = false; // Cerrar la barra lateral cuando el ancho de la ventana sea menor a 1000px
      } else {
        this.openSidebar = true; // Abrir la barra lateral cuando el ancho de la ventana sea mayor o igual a 1000px
      }
    }
  }
}
</script>

<style lang="scss">
.sidebarLayout {
  position: sticky;
  top: 0;
  left: 0;
}

.headerLayout {
  position: sticky;
  background-color: white;
  top: 0;
}

.main-container {
  background-color: #f8f4fc;
  padding: 2rem;
}

@media screen and (max-width: 660px) {
  
  .main-container {
    padding: 1rem;
  }
}
</style>