import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            meta: {
                title: "Home",
                requiresAuth: true
            },
            path: "/",
            component: () => import("@/layouts/MasterLayout.vue"),
            children: [
                {
                    name: "dashboard",
                    path: "",
                    component: () => import("@/views/DashboardView.vue"),
                },
                {
                    name: "reportes",
                    path: "reportes",
                    component: () => import("@/views/ReportesView.vue"),
                },
                {
                    name: "menu",
                    path: "menu",
                    component: () => import("@/views/MenuView.vue"),
                },
                {
                    name: "administrarcuentas",
                    path: "cuentas",
                    component: () => import("@/views/AdminCuentas.vue"),
                },
            ]
        },
        {
            meta: {
                title: "Login"
            },
            path: "/login",
            name: "login",
            component: () => import("@/views/LoginView.vue")
        },
    ]
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !store.state.statusLogin) {
        next({ name: 'login' }); // Redirige al inicio de sesión si statusLogin es falso
    } else if (to.name === 'login' && store.state.statusLogin) {
        next({ name: 'dashboard' }); // Redirige al dashboard1 si ya está autenticado y trata de acceder al login
    } else {
        next(); // Continúa con la navegación normalmente
    }
});

export default router;
