<template>
    <section class="h-full w-full">
        <div class="mb-8 flex justify-between items-center">
            <h3 class="text-2xl font-semibold text-neutral-600">Administrar cuentas</h3>
            <button @click="openModal"
                class="p-3 rounded-xl bg-orange-600 text-white text-sm hover:bg-orange-700 transition duration-300">
                Crear cuenta
            </button>
        </div>
        <div class="relative text-sm overflow-x-auto shadow-md sm:rounded-2xl">
            <TableUsers :listaUsuarios="ListUsers" />
        </div>
        <!-- Modal -->
        <ModalCreateCuentaVue v-if="openModalV" @close-modal="closeModal" @save-datos="crearCuenta" />
    </section>
</template>
  
<script>
import { ref, onMounted } from 'vue';
import store from '@/store';
import { listarUsuarios, crearUsuarios } from '@/services/AdminUsers';
import TableUsers from '@/components/TableUsers.vue';
import ModalCreateCuentaVue from '@/components/ModalCreateCuenta.vue';

export default {
    name: 'AdminCuentas',
    components: { TableUsers, ModalCreateCuentaVue },
    setup() {
        const ListUsers = ref([]);
        const openModalV = ref(false);

        onMounted(() => {
            listarUsuarios(store.state.codempresa, store.state.tipousuario)
                .then(response => {
                    ListUsers.value = response.data.usuarios;
                });
        });

        const openModal = () => {
            openModalV.value = true;
        };

        const closeModal = () => {
            openModalV.value = false;
        };

        const crearCuenta = (dataformulario) => {
            const usuario = dataformulario.usuario;
            const empresa = dataformulario.empresa;
            const password = dataformulario.password;
            const codempresa_new = dataformulario.codempresa;
            crearUsuarios(store.state.codempresa, store.state.tipousuario, usuario, empresa, password, codempresa_new)
             .then(response => {
                console.log(response)
             })
        }

        return { ListUsers, openModalV, openModal, closeModal, crearCuenta };
    },
};
</script>
