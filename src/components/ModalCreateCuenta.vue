<template>
    <div class="fixed inset-0 flex items-center justify-center z-50">
        <div class="absolute inset-0 bg-black opacity-30 pointer-events-none"></div>
        <div class="relative z-10 p-4 bg-slate-200 rounded-xl min-w-[350px]">
            <form class="p-2 text-gray-700 w-full h-full text-sm">
                <h3 class="text-center font-bold text-lg">Crear cuenta</h3>
                <p class="py-1">Usuario</p>
                <input type="text" name="usuario" v-model="usuario"
                    class="w-full text-sm p-2 px-3 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Usuario de cuenta" />
                <p class="py-1">Empresa</p>
                <input type="text" name="empresa" v-model="empresa"
                    class="w-full text-sm p-2 px-3 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Nombre de empresa" />
                <p class="py-1">Codigo Empresa</p>
                <input type="text" name="codempresa" v-model="codempresa"
                    class="w-full text-sm p-2 px-3 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Ejemplo: CX003" />
                <p class="py-1">Contraseña</p>
                <div class="relative">
                    <input :type="showPassword ? 'text' : 'password'" name="password" v-model="password"
                        class="w-full text-sm p-2 px-3 rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Ingrese contraseña" />
                    <!-- click.prevent, previene acciones-->
                    <button @click.prevent="togglePasswordVisibility"
                        class="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none">
                        <!-- Iconos para mostrar/ocultar la contraseña -->
                        <i v-if="showPassword" class="fa-solid fa-eye"></i>
                        <i v-else class="fa-solid fa-eye-slash fa-lg"></i>
                    </button>
                </div>
                <p class="py-1">Confirmar contraseña</p>
                <input type="password" name="repeatpassword"
                    class="w-full text-sm p-2 px-3 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Repita contraseña" @input="validatePassword" />
                <p :class="{ 'text-green-500 text-xs': msgValidacion === 'Las contraseñas coinciden', 'text-red-500 text-xs': msgValidacion === 'Las contraseñas no coinciden' }"
                    v-if="msgValidacion !== ''">{{ msgValidacion }}</p>
            </form>
            <div class="btns flex gap-2 justify-center items-center pt-2">
                <button @click="closeModal"
                    class="bg-gray-400 hover:bg-gray-500 text-white text-sm p-2 px-4 rounded-xl transition duration-300">Cerrar</button>
                <button @click="saveDatos"
                    class="bg-blue-400 hover:bg-blue-500 text-white text-sm p-2 px-4 rounded-xl transition duration-300">Crear</button>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'ModalCreateCuenta',
    data() {
        return {
            usuario: '',
            empresa: '',
            codempresa: '',
            password: '',
            showPassword: false, // Variable para controlar la visibilidad de la contraseña
            msgValidacion: '',
        };
    },
    methods: {
        closeModal() {
            // Emitir evento al componente padre para cerrar el modal
            this.$emit('close-modal');
        },
        saveDatos() {
            console.log('Usuario:', this.usuario);
            console.log('Empresa:', this.empresa);
            console.log('Contraseña:', this.password);
            console.log('CodEmpresa:', this.codempresa);
            // Emitir evento al componente padre con los datos del formulario
            this.$emit('save-datos', {
                /* datos del formulario */
                usuario: this.usuario,
                empresa: this.empresa,
                password: this.password,
                codempresa: this.codempresa
            });
        },
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword; // Alternar la visibilidad de la contraseña
        },
        validatePassword(event) {
            const password = document.querySelector('input[name="password"]').value;
            const repeatPassword = event.target.value;

            if (password === repeatPassword) {
                this.msgValidacion = 'Las contraseñas coinciden'
                console.log('Las contraseñas coinciden');
            } else {
                this.msgValidacion = 'Las contraseñas no coinciden'
                console.log('Las contraseñas no coinciden');
            }
        },
    },
};
</script>
  