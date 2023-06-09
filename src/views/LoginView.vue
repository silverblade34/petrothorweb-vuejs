<template>
    <div class="container-login">
        <div class="login">
            <form @submit.prevent="submitLoginForm" class="form-animation">
                <h1>Login</h1>
                <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert">
                    <span class="block sm:inline">{{ errorMessage }}</span>
                    <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                        <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20">
                            <title>Close</title>
                            <path
                                d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                        </svg>
                    </span>
                </div>
                <div class="mb-3">
                    <label for="">Usuario</label>
                    <input type="text" v-model="username" placeholder="Username">
                </div>
                <div class="mb-1">
                    <label for="">Contraseña</label>
                    <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Password">
                </div>
                <div class="ver-contraseña">
                    <span @click="togglePasswordVisibility">Ver contraseña</span>
                </div>
                <div class="contain-button">
                    <button type="submit">Ingresar <v-icon name="bi-arrow-right" /></button>
                </div>
            </form>
        </div>
        <div class="contain-title">
            <div class="texto-title">
                <h1>Soluciones para el Servicio <br> de <span ref="typedText"></span> </h1>
                <p>
                    Soluciones integrales, atención especializada <br> y personalizada a todos nuestros clientes.
                </p>
            </div>
        </div>
    </div>
</template>
  
<script>
import { login } from '@/services/AuthService'
import Typed from 'typed.js';

export default {
    data() {
        return {
            username: '',
            password: '',
            errorMessage: '',
            showPassword: false
        };
    },
    mounted() {
        console.log(this.$store.state.statusLogin)

        // Configuración de Typed.js
        const options = {
            strings: ["Abastecimiento"],
            typeSpeed: 120,
            loop: false,
            showCursor: false
        };

        // Inicializar Typed.js en el elemento h1
        new Typed(this.$refs.typedText, options);
    },
    methods: {
        submitLoginForm() {
            login(this.username, this.password)
                .then(response => {
                    const data = response.data
                    if (data.status) {
                        // Login exitoso
                        this.$store.commit('setStatusLogin', data.status);
                        this.$store.commit('setUsername', data.data.username);
                        this.$store.commit('setCodEmpresa', data.data.codempresa);
                        this.$store.commit('setCodCliente', data.data.codcliente);
                        this.$store.commit('setTipousuario', data.data.tipousuario);
                        this.$router.push('/');
                    } else {
                        // Credenciales inválidas
                        this.errorMessage = 'Credenciales inválidas. Por favor, inténtalo de nuevo.';
                    }
                })
        },
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        }
    },
};

</script>
  
<style scoped lang="scss">
.container-login {
    display: grid;
    grid-template-columns: 40% 60%;
    width: 100%;
    height: 100vh;
    background-image: url(../assets/fondo-login.webp);
    background-position: center;
    background-size: cover;

    /* Añade el sombreado oscuro utilizando ::before */
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.404);
        /* Ajusta el nivel de opacidad según tus necesidades */
        /* Asegura que el sombreado esté por encima del contenido */
    }

    .login {
        width: 100%;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: center;

        .text-error {
            color: rgb(221, 63, 63);
        }

        form {
            background-color: #7979792d;
            padding: 2rem 2.5rem;
            border: 0.8px solid white;
            border-radius: 1.2rem;
            width: 60%;
            font-size: 15px;
            position: relative;
            color: white;
            z-index: 999;
            min-height: 40%;

            h1 {
                color: #ffffff;
                font-size: 30px;
                font-weight: bolder;
                text-align: start;
                margin-bottom: 20px;
            }

            div {
                width: 100%;

                input {
                    font-family: 'Poppins', sans-serif;
                    padding: 10px;
                    margin-top: 5px;
                    border: none;
                    font-size: 15px;
                    color: #666666;
                    border-radius: 4px;
                    width: 100%;
                    box-sizing: border-box;

                    &:focus {
                        outline: 2px solid #5e5e5e;
                    }
                }
            }

            .ver-contraseña {
                text-align: end;
                font-size: 13px;
                margin-bottom: 10px;

                span {
                    cursor: pointer;
                    transition: all 0.2s;

                    &:hover {
                        color: var(--anaranjado);
                    }
                }
            }

            .contain-button {
                display: flex;
                justify-content: center;
                padding-top: 15px;

                button {
                    width: 100%;
                    padding: 10px 25px;
                    border-radius: 8px;
                    border: none;
                    cursor: pointer;
                    font-family: 'Poppins', sans-serif;
                    background-color: rgb(255, 128, 69);
                    transition: all 0.4s;

                    &:hover {
                        background-color: rgb(212, 100, 48);

                    }
                }
            }
        }
    }

    .contain-title {
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-weight: bold;

        .texto-title {
            position: relative;
            text-align: end;
            padding: 0 100px;

            h1 {
                font-size: 50px;
            }

            p {
                font-size: 18px;
                font-weight: lighter;
            }
        }
    }
}

@media screen and (min-width: 1000px) and (max-width: 1250px) {
    .container-login {
        grid-template-columns: 40% 60%;

        .login {
            form {
                width: 78%;
            }
        }
    }
}

@media screen and (min-width: 560px) and (max-width: 1000px) {
    .container-login {
        display: block;

        .login {
            height: 100%;

            form {
                width: 55%;
            }
        }

        .contain-title {
            display: none;
        }
    }
}

@media screen and (max-width: 560px) {
    .container-login {
        display: block;
        background-size: cover;
        background-position: left;

        .login {
            width: 100%;
            margin: 0;
            height: 100%;

            form {
                background-color: #ffffff54;
                padding: 2.5rem 2rem;
                width: 90%;

                div {
                    width: 100%;

                    input {
                        color: #2c2c2c;
                    }
                }
            }
        }

        .contain-title {
            display: none;
        }
    }
}

.error-message {
    color: red;
}

@keyframes slideInFromBottom {
    0% {
        opacity: 0;
        transform: translateX(-100%);
    }

    100% {
        opacity: 1;
        transform: translateX(0);
    }
}

.form-animation {
    animation: slideInFromBottom 1s ease-out;
}
</style>
  