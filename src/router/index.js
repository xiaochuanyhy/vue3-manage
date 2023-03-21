import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home/index.vue'),
    children:[
      {
        path:'',
        name:'main',
        component: () => import('../views/home/main.vue'),
      },
      {
        path:'/student',
        name:'student',
        component:() => import('../views/student/index.vue'),
      },
      {
        path:'/subject',
        name:'subject',
        component:() => import('../views/subject/index.vue'),
      },
      {
        path:'/teacher',
        name:'teacher',
        component:() => import('../views/teacher/index.vue'),
      },
      {
        path:'/users',
        name:'users',
        component:() => import('../views/user/index.vue'),
      },
    ]
  },{
    path:'/login',
    name:'login',
    component:() => import('../views/login/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
