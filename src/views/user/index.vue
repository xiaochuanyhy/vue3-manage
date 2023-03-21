<template>
<ConfigProvider :locale = zh_CN>
  <div class="title"><a @click="showModal2">新增</a></div>
  <a-table sticky :columns="columns" :data-source="data" :pagination="pagination" :scroll="{  y: '58vh' }">
    
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span>
          账号
        </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      
      <template v-if="column.key === 'status'">
        <span>
          <a-tag
            
            :color="record.status === '启用' ? 'green' : 'red' "
          >
            {{ record.status }}
          </a-tag>
        </span>
      </template>
      <template v-if="column.key === 'postion'">
        <span>
          <a-tag
            
            :color="record.postion2 === '超级管理员' ? 'orange' : record.postion2 === '管理员'? 'blue' : 'green' "
          >
            {{ record.postion2 }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action' && record.postion2 !='超级管理员'">
        <a-popconfirm
          v-if="data.length"
          title="确定要删除吗?"
          @confirm="onDelete(record.id)"
          ok-text="确认" cancel-text="取消"
        >
          <a>删除</a>
        </a-popconfirm>
          <a @click="showModal(record)" class="change">修改</a>
      </template>
      <template v-else-if="column.key === 'action' && record.postion2 =='超级管理员'">
        <p style="color:red;">不可更改</p>
      </template>
    </template>
  </a-table>
  <!-- 弹出层 -->
    <a-modal v-model:visible="visible" 
    title="修改信息" @ok="handleOk"  :maskClosable = false
    :closable = false  :footer="null" 
    >
    <a-form
    :model="formState"
    name="basic"
    autocomplete="off"
    :rules="rules"
    @finish="handleOk"
    v-bind="layout"
  >
     <a-form-item name="status"
      label="状态">
      <a-radio-group v-model:value="formState.status">
        <a-radio value="启用">启用</a-radio>
        <a-radio value="禁用">禁用</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item name="postion"
      label="权限">
      <a-radio-group v-model:value="formState.postion">
        <a-radio value="1">管理员</a-radio>
        <a-radio value="3">学生</a-radio>
      </a-radio-group>
    </a-form-item>



    <!-- 按钮 -->
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" html-type="submit">确认修改</a-button>
      <a-button style="margin-left: 10px" @click="visible = false">取消</a-button>
    </a-form-item>
  </a-form>
    </a-modal>
    <a-modal v-model:visible="visible2" 
    title="添加用户" @ok="handleOk2"  :maskClosable = false
    :closable = false  :footer="null"
    >
    <a-form
    :model="formState2"
    name="basic"
    autocomplete="off"
    :rules="rules"
    @finish="handleOk2"
    v-bind="layout"
  >
    <a-form-item
      label="账号"
      name="username"
    >
      <a-input v-model:value="formState2.username" />
    </a-form-item>
    <a-form-item
      label="密码"
      name="password"
    >
      <a-input v-model:value="formState2.password" />
    </a-form-item>
    <a-form-item name="status"
      label="状态">
      <a-radio-group v-model:value="formState2.status">
        <a-radio value="启用">启用</a-radio>
        <a-radio value="禁用">禁用</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item name="postion"
      label="权限">
      <a-radio-group v-model:value="formState2.postion">
        <a-radio value="1">管理员</a-radio>
        <a-radio value="3">学生</a-radio>
      </a-radio-group>
    </a-form-item>

    <!-- 按钮 -->
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" html-type="submit">确定</a-button>
      <a-button style="margin-left: 10px" @click="visible2 = false">取消</a-button>
    </a-form-item>
  </a-form>
    </a-modal>
</ConfigProvider>
  
</template>

<script>
import { SmileOutlined, DownOutlined} from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { computed, ref ,reactive} from 'vue';
import {getuser , changeinfo , deleteuser,adduser} from '@/api/user.js'
import zh_CN from 'ant-design-vue/es/locale/zh_CN';
import { ConfigProvider } from 'ant-design-vue';
const columns = [{
  name: 'name',
  dataIndex: 'username',
  key: 'name',
  align:'center',
  fixed:true,
},{
  title: '状态',
  dataIndex: 'status',
  key: 'status',
  align:'center',
  filters: [{
    text: '启用',
    value: '启用',
  }, {
    text: '禁用',
    value: '禁用',
  },],
   onFilter: (value, record) => record.status.indexOf(value) === 0,
},{
  title: '权限',
  key: 'postion',
  dataIndex: 'postion2',
  align:'center',
  filters: [{
    text: '超级管理员',
    value: '超级管理员',
  }, {
    text: '管理员',
    value: '管理员',
  },{
    text: '学生',
    value: '学生',
  },],
   onFilter: (value, record) => record.postion2.indexOf(value) === 0,
},{
  title: '操作',
  key: 'action',
  align:'center',
  fixed: 'right',
}];
const data = ref([ ])
const formState = ref()
const formState2 = ref(
  {
    username:'',
    status:'',
    postion:'',
    password:'',
  }
)
export default ({
  components: {
    SmileOutlined,
    DownOutlined,
    ConfigProvider
  },
  setup() {
    // 获取学生列表
     const getlist = () =>{
      getuser().then(res => {
      data.value = res.data.data
      data.value = data.value.filter(item => item.is_delete != 1)
      for(let i = 1 ;i <= data.value.length ; i++){
        data.value[i-1]["key"] = i
        if(data.value[i-1].postion == 0){
          data.value[i-1]["postion2" ] = "超级管理员"
        } else if(data.value[i-1].postion == 1){
           data.value[i-1]["postion2"]= "管理员"
        } else{
          data.value[i-1]["postion2" ] = "学生"
        }
      }
    }).catch(err => {
      console.log(err);
    })
     }
     getlist()

    // 分页器
    const pagination = computed(() => ({
      total: data.length,
      hideOnSinglePage:false,
    }));
    // 删除
    const onDelete = key => {
      deleteuser(key).then(
        (res) => {
          getlist()
          message.success('已删除');
        }
      ).catch( err =>{
        console.log(err);
        message.err('删除失败，请重试');
      })
      // data.value = data.value.filter(item => item.id !== key);
      // for(let i = 1 ;i <= data.value.length ; i++){
      //   data.value[i-1]["key"] = i
      // }
       
       
    };
    // 是否显示遮罩
     const visible = ref(false);
     const visible2 = ref(false);
    const showModal = (dataitem) => {
      visible.value = true;
     let  {key ,postion2, ...rest} = dataitem
      formState.value = rest
      console.log(formState.value);
    };
    const showModal2 = () => {
      visible2.value = true;
    };
    const handleOk = e => {
      changeinfo(formState.value).then( res =>{
        if(res.data.status === 0 ){
          message.success('修改成功')
          getlist()

        } else{
          message.error('修改失败')
        }
      }).catch( err => {
        console.log(err);
      })
      visible.value = false;
    };
    const handleOk2 = e => {
      adduser(formState2.value).then( res =>{
        if(res.data.status === 0 ){
          message.success('添加成功')
          getlist()
        formState2.value =   {
           username:'',
           status:'',
           postion:'',
           password:'',
         }

        } else{
          message.error('添加失败')
        }
      }).catch( err => {
        console.log(err);
      })
      visible2.value = false;
    };
      // 表单规则
      let validatePass = async (_rule, value) => {
      if (value === '') {
        return Promise.reject('姓名不能为空');
      } else {
        return Promise.resolve();
      }
    };
    // 表单布局
    const layout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 17,
      },
    };
    // 规则
    const rules = {
      username: [{
        required: true,
        validator: validatePass,
        trigger: 'change',
      }],
      password: [{
        required: true,
        trigger: 'change',
      }],
      postion: [{
        required: true,
        trigger: 'change',
      }],
      phone: [{
        required: true,
        trigger: 'change',
      }],
    };
    return {
      pagination,
      data,
      columns,
      onDelete,
      zh_CN,
      visible,
      showModal,
      handleOk,
      formState,
      getlist,
      rules,
      layout,
      visible2,
      showModal2,
      formState2,
      handleOk2
    };
  },
});
</script>

<style scoped lang="scss">
.title{
  a{
    margin-left: 20px;
    display: inline-block;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 25px;
    color: #000000;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
  }
}
.change{
  margin-left: 16px;
}
</style>