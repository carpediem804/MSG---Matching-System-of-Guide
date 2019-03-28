import Vue from 'vue';
import Router from 'vue-router'
import user from './components/user'
import Home from './components/HelloWorld'
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
      }

  ]
})
