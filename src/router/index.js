import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/auth/Login.vue'
import AdminLogin from '../views/admin/auth/Login.vue'
import AdminRegister from '../views/admin/auth/Register.vue'
import AdminSolvencias from '../views/admin/Solvencias.vue'
import AdminUsers from '../views/admin/Users.vue'
import AdminProfile from '../views/admin/Profile.vue'

const routes = [
    {
        path: '/',
        name: 'solicitar.solvencias',
        component: Login
    },
    {
        path: '/admin/gestion-usuarios',
        name: 'admin.usuarios',
        component: AdminUsers
    },
    {
        path: '/admin/solvencias',
        name: 'admin.solvencias',
        component: AdminSolvencias
    },
    {
        path: '/admin/login',
        name: 'admin.login',
        component: AdminLogin
    },
    {
        path: '/admin/register',
        name: 'admin.register',
        component: AdminRegister
    },
    {
        path: '/admin/profile',
        name: 'admin.profile',
        component: AdminProfile
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
