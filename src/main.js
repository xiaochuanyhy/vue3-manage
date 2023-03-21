import { createApp } from 'vue'
import App from './views/App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import "./assets/css/commons.scss";
import cookie from 'js-cookie'


createApp(App)
  .use(Antd)
  .use(store)
  .use(router)
  .mount('#app')

  router.beforeEach((to, from, next) => {
    //判断token
    const token =cookie.get('token')
    if(!token && to.name !== 'login') {
      next({name : 'login'})
    } else if ( token && to.name === 'login') {
      next({name:'main'})
    } else {
      next()
    }
    next()
  });