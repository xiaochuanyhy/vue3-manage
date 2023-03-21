<template>
  <div class="container">
    <div class="bg"></div>
    <div class="login-main">
      <a-form
    :model="formState"
    name="normal_login"
    class="login-form"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
    autoComplete="off"
  >
  <a-form-item>
    <p>平台登入</p>
  </a-form-item>
    <a-form-item
      label="账号"
      name="username"
      :rules="[{ required: true, message: '请输入账号' }]"
    >
      <a-input v-model:value="formState.username">
        <template #prefix>
          <UserOutlined class="site-form-item-icon" />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item
      label="密码"
      name="password"
      :rules="[{ required: true, message: '请输入密码' }]"
    >
      <a-input-password v-model:value="formState.password">
        <template #prefix>
          <LockOutlined class="site-form-item-icon" />
        </template>
      </a-input-password>
    </a-form-item>


    <a-form-item>
      <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
        登入
      </a-button>
    </a-form-item>
  </a-form>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import {useRouter} from 'vue-router'
import { message } from 'ant-design-vue';
import {loginApi} from '@/api/api.js'
import cookie from 'js-cookie'
export default {
  name:'login',
   components: {
    UserOutlined,
    LockOutlined,
  },
  setup() {
     const router=useRouter()
     
    const formState = reactive({
      username: '',
      password: '',
      remember: false,
    });
    const onFinish = values => {
      console.log(values);
      loginApi(values).then(
        res => {
          console.log(res);
          if(res.data.status == 1){
            message.error('请输入正确的账号密码',1);
          }else if(res.data.status == 2){
            message.error('该账号已删除',1);
          }else if(res.data.status == 3){
            message.error('该账号已被禁用',1);
          }else if(res.data.status == 0){
            cookie.set('token',res.data.token,1)
            cookie.set('id',res.data.id,1)
             router.push('/')
            message.success('登入成功',1);
          }
        }
      )
      .catch(error => {
        console.log(error);
      })
    };
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };
    const disabled = computed(() => {
      return !(formState.username && formState.password);
    });
    return {
      formState,
      onFinish,
      onFinishFailed,
      disabled,
    };
  },
}
</script>

<style lang="scss" scoped>
  .container{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    
    .bg{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
      z-index: -1;
    }
    .login-main{
      border: 1px solid #fff;
      padding: 30px 50px;
      border-radius: 10px;
      background-color: #fff;
    }
    :deep(.ant-form){
      overflow: hidden;
      .ant-col{
        p{
          font-size: 22px;
          font-weight: 600;
          text-align: center;
        }
        .ant-form-item-control-input{
          width: 100%;
          .ant-btn{
            width: 100%;
          }
        }
      }
    }
  }
</style>