<template>
  <div class="container">
    <ul>
      <li class="item-1">
        <h4 class="tip">注:本网站所有信息均为虚构和模拟 如有雷同纯属巧合</h4>
        <h1>网站简介</h1>
        <p>本网站前端由:</p>
        <span>vue3前端框架</span>
        <span>vue-cli 脚手架</span>
        <span>ant-design-vue 3.2.4组件库</span>
        <span>用axios进行数据交互</span>
        <span>vuex 进行项目的状态存储</span>
        <p>网站后端 用到的是:</p>
        <span>node.js 中 express.js 加 mysql 进行搭建</span>
        <span>jsonwebtoken 生成tokin</span>
        <span> joi进行数据的验证</span>
        <span> bcryptjs 进行数据加密</span>
      </li>
      <li>
        <h1>功能介绍</h1>
        <p>登入</p>
        <span>1. 用户登入 用户退出 </span>
        <span>2. 用户登入后查看权限 超级管理员最高权限 管理员不可以更改用户信息 学生则只能进行浏览</span>
        <p>页面跳转</p>
        <span>页面跳转的值存储到地址栏 刷新不会跳转回去 会留在当前页面</span>
        <p>学生管理 、课程管理 、 教师管理</p>
        <span>1、可进行编辑 、 便于信息维护</span>
        <span>2. 可进行新增</span>
        <span>3.可进行删除、删除进行处理、只是更改数据状态并非是从数据库删除 防止误删造成数据的流失</span>
        <span>4.部分字段支持筛选和排序功能</span>
        <span>5.部分字段采用tags 标签 更加醒目</span>
        <p>用户的管理</p>
        <span>1.用户管理只支持超级管理员操作</span>
        <span>2.可新增 删除 以及更改用户状态 是否禁用账户</span>
        <span>3.删除和禁用的用户将无法进行登入</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style  lang="scss" scoped>
  .container{
    background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
    height: calc(100% + 48px);
    margin: -24px;
    padding: 24px 50px;
    ul{
      display: flex;
      justify-content: space-between;
      li{
        flex: .9;
        &:last-child{
          flex: 1.1;
          border-left: 1px solid #fff;
          padding-left: 15px;
        }
      }
    }
    h1{
      font-size: 24px;
      font-weight: 800;
    }
    p{
      font-size: 18px;
      font-weight: 800;
      margin-top: 10px;
    }
    span{
        display: block;
        margin-left: 20px;
        font-size: 16px;
      }
    .item-1{
      .tip{
        font-size: 26px;
        color: red;
        font-weight: 800;
      }
      span{
        display: block;
        margin-left: 20px;
        font-size: 16px;
      }
    }
  }

</style>