<template>
  <router-view />
</template>

<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN';
export default {
  name:'App',
  setup() {
    return{
      zhCN
    }
  }
}
</script>

<style>

</style>