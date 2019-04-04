import Vue from 'vue';
import Router from 'vue-router'
import user from './components/user'
import search from './components/search'
import Home from './components/views/Home'
import toursearch from './components/toursearch.vue'
import Login from './components/login/Login.vue'
import SignUp from './components/login/SignUp.vue'
import Login_test from './components/login/Logintest.vue'
import Temp from './components/login/temp.vue'

Vue.use(Router)


export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/user',
            name: 'user',
            component: user
        },
        {
            path: '/search',
            name: 'search',
            component: search
        },
        {
            path: '/toursearch',
            name: 'toursearch',
            component: toursearch
        },
        {
            path: '/login/signUp',
            name: 'SignUp',
            component: SignUp

        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/login/test',
            name: 'Login_test',
            component: Login_test
        },
        {
            path: '/temp',
            name: 'Temp',
            component: Temp
        }

    ]

})
