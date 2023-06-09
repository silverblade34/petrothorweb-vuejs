<template>
    <div id="side-bar" class="sidebar h-screen flex flex-col text-sm"
        :class="dataOpenSideBar == true ? 'side-bar-visible' : 'side-bar-close'">
        <div>
            <div class="h-full text-xl text-white text-center font-bold flex items-center justify-center">
                <div class="cont-logo">
                    <img :src="dataOpenSideBar ? logo : logoReducido" alt="">
                </div>
            </div>
        </div>
        <nav class="nav">
            <NavItem class="p-2 py-2" :item="item" v-for="item in navItems" :key="item.label"
                :expandido="dataOpenSideBar" />
        </nav>
        <div class="mt-auto mb-4 flex items-center justify-center p-2">
            <button class="btn-logout text-start text-white w-full py-3 px-4 rounded-lg" @click="logout">
                <i class="fa-solid fa-right-from-bracket mr-2"></i> <span v-show="dataOpenSideBar">Logout</span>
            </button>
        </div>
    </div>
    <div class="overflay" v-if="logoutProcessing">
        <span class="loader"></span>
    </div>
</template>
<script>
import NavItem from '@/components/NavItem.vue';

export default {
    props: {
        dataOpenSideBar: Boolean,
        logo: String,
        logoReducido: String
    },
    data() {
        return {
            logoutProcessing: false
        };
    },
    methods: {
        logout() {
            this.logoutProcessing = true;
            localStorage.clear();
            location.reload();
        }
    },
    components: { NavItem },
    setup() {
        const navItems = [
            {
                to: "/",
                label: "Dashboard",
                children: [],
                icon: "fa-solid fa-chart-line mr-2 "
            },
            {
                to: "/menu",
                label: "Menu",
                children: [],
                icon: "fa-solid fa-folder mr-2"
            },
            {
                to: "/reportes",
                label: "Reportes",
                children: [],
                icon: "fa-solid fa-chart-simple mr-2"
            },
            {
                to: "/cuentas",
                label: "Cuentas",
                children: [],
                icon: "fa-solid fa-user mr-2"
            }
        ]
        return { navItems };
    },
}
</script>
<style lang="scss">
.loader {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    position: relative;
    animation: rotate 1s linear infinite
}

.loader::before,
.loader::after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    inset: 0px;
    border-radius: 50%;
    border: 5px solid #FFF;
    animation: prixClipFix 2s linear infinite;
}

.loader::after {
    inset: 8px;
    transform: rotate3d(90, 90, 0, 180deg);
    border-color: #FF3D00;
}

@keyframes rotate {
    0% {
        transform: rotate(0deg)
    }

    100% {
        transform: rotate(360deg)
    }
}

@keyframes prixClipFix {
    0% {
        clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0)
    }

    50% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0)
    }

    75%,
    100% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%)
    }
}


.overflay {
    height: 100%;
    width: 100vw;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    right: 0;
    left: 0;
    background-color: #9191918f;
    z-index: 99999;
}

.sidebar {
    overflow: hidden;
    transition: 300ms;
    background-color: white;

    .nav {
        padding: 0 10px;
    }

    .button-link span {
        transition: all 0.3s;
    }

    .btn-logout {
        background-color: #5378a3;
        transition: all 0.5s;

        &:hover {
            background-color: #3d5c80;
        }
    }
}

.side-bar-visible {
    width: 230px !important;
    min-width: 230px !important;
    .cont-logo {
        margin: 20px 25px;

        img {
            width: 100%;
        }
    }

}

.side-bar-close {
    width: 70px !important;
    min-width: 70px !important;
    .btn-logout {
        transition: all 0.6s;
        overflow: hidden;

        span {
            transition: all 0.6s;
        }
    }

    .cont-logo {
        margin: 5px;
        margin-bottom: 50px;
        margin-top: 15px;

        img {
            width: 50px;
        }
    }

    .button-link {
        justify-content: center;
        i{
            font-size: 20px;
            margin-right: 0;
        }
    }

    .icono-sidebar {
        margin: 0;
    }

    .button-link span {
        display: none;
    }
}</style>