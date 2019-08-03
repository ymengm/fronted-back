import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/pages/Index'
import Game from '@/components/pages/Game'
function route (path, name, url) {
  return {
    path: path,
    name: name,
    component: resolve => import(`@/components/${url}.vue`).then(resolve)
  }
}

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    route('/login', 'login', 'Login'),

    {
      path: '/operation',
      component: Index,
      children: [
        route('categary', 'categary', 'pages/Categary'),
        {
          path: 'game',
          component: Game,
          children: [
            {
              path: '',
              redirect: 'game_list'
            },
            route('game_list', 'game_list', 'pages/GameList'),
            route(':g_id/group', 'group', 'pages/Group'),
            route(':g_id/:p_id/grade', 'grade', 'pages/Grade')
          ]
        }
      ]
    }
  ]
})
// router.beforeEach((to, from, next) => {
//   if (to.fullPath !== '/login' && !localStorage.getItem('username')) {
//     router.push('/login')
//   }
//   next()
// })
export default router
