<template>
  <div class="container">
    <a-layout>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible :width = 222 >
      <div class="logo">
        教学管理平台
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="/" @click="menuClick('/')">
          <home-outlined />
          <span>首页</span>
        </a-menu-item>
        <a-menu-item key="/student" @click="menuClick('/student')">
          <user-outlined />
          <span>学生管理</span>
        </a-menu-item>
        <a-menu-item key="/subject" @click="menuClick('/subject')">
          <reconciliation-outlined />
          <span>课程管理</span>
        </a-menu-item>
        <a-menu-item key="/teacher" @click="menuClick('/teacher')">
          <user-outlined />
          <span>教师管理</span>
        </a-menu-item>
        <a-menu-item key="/users" @click="menuClick('/users')" v-if="visit">
          <user-outlined />
          <span>用户管理</span>
        </a-menu-item>
        
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <div class="out">
          <div class="title">欢迎您登入本系统{{name}}</div>
          <a @click="goOut">退出账号</a>
        </div>
        
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
  </div>
</template>

<script>
import { UserOutlined, VideoCameraOutlined, UploadOutlined, MenuUnfoldOutlined, MenuFoldOutlined, HomeOutlined,ReconciliationOutlined} from '@ant-design/icons-vue';
import { defineComponent, ref ,watch} from 'vue';
import {store} from '@/store/index.js'
import { message } from 'ant-design-vue';
import {useRouter} from 'vue-router'
import {searchuser} from '@/api/api.js'
import cookie from 'js-cookie'
export default defineComponent({
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    HomeOutlined,
    ReconciliationOutlined,
  },
  setup() {
    const visit = ref(false)
    const id =cookie.get('id')
    const name = ref('')
    searchuser(id).then( res =>{
      if(res.data.data[0].postion == 0){
        visit.value = true
        store.count = true
      }else if(res.data.data[0].postion == 1){
        store.count = true
      }
      else if(res.data.data[0].postion == 3){
        store.count = false
      }
        name.value = res.data.data[0].username
    }).catch(  err => {
      console.log(err);
    })
    const router=useRouter()
    const hashValue = router.currentRoute._rawValue.fullPath
    const menuClick = (path) =>{
        router.push(path)
      }
    
    const goOut = () =>{
      cookie.remove('token')
      message.success('已退出',1);
       router.push('login')
    }

    return {
      selectedKeys: ref([hashValue]),
      collapsed: ref(false),
      menuClick,
      goOut,
      visit,
      name
    };
  },
});
</script>


<style lang="scss">
 .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}
  .ant-layout-sider{
    min-height: 100vh;
  }
 .trigger:hover {
  color: #1890ff;
}

 .logo {
  height: 32px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  margin: 16px;
  overflow: hidden;
}

.site-layout .site-layout-background {
  background: #fff;
}
.ant-layout-header{
  .out{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0  50px;
    .title{
      font-size: 20px;
      font-weight: 800;
    }
  }
}
</style>
<style lang="scss" scoped>
  .container{
  }
</style>