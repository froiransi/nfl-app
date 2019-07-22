import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Crimes from './views/Crimes.vue'
import Teams from './views/Teams.vue'

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
      path: '/crimes/:crimeCategory',
      name: 'crimes',
      component: Crimes
    },
    {
      path: '/teams/:teamName',
      name: 'teams',
      component: Teams
    }
  ]
})
