<template>
<ConfigProvider :locale = zh_CN>
  <div class="title" v-if="visit"><a @click="showModal2">新增</a></div>
  <a-table sticky :columns="columns" :data-source="data" :pagination="pagination" :scroll="{  y: '58vh' }">
    
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span>
          姓名
        </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      
      <template v-if="column.key === 'number'">
        <span>
          {{record.key}}
        </span>
      </template>
      <template v-if="column.key === 'tags'">
        <span>
          <a-tag
            
            :color="record.tags === '在校' ? 'green' : record.tags === '休学'? 'red' : 'orange' "
          >
            {{ record.tags }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action' && !visit">
        <p>您无权更改</p>
      </template>
      <template v-else-if="column.key === 'action' && visit">
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
    <a-form-item
      label="姓名"
      name="username"
    >
      <a-input v-model:value="formState.username" />
    </a-form-item>
    <a-form-item
      name="gender"
      label="性别"
    >
      <a-select v-model:value="formState.gender" placeholder="请选择性别">
        <a-select-option value="男">男</a-select-option>
        <a-select-option value="女">女</a-select-option>
      </a-select>
    </a-form-item>
    
    <a-form-item
      label="学号"
      name="snumber"
    >
      <a-input v-model:value="formState.snumber" />
    </a-form-item>
    
    <a-form-item
      label="专业"
      name="class"
    >
      <a-input v-model:value="formState.class" />
    </a-form-item>
    <a-form-item name="tags"
      label="状态">
      <a-radio-group v-model:value="formState.tags">
        <a-radio value="在校">在校</a-radio>
        <a-radio value="请假">请假</a-radio>
        <a-radio value="休学">休学</a-radio>
      </a-radio-group>
    </a-form-item>

    <a-form-item
      label="联系电话"
      name="phone"
    >
      <a-input v-model:value="formState.phone" />
    </a-form-item>

    <a-form-item
      label="备注"
      name="text"
    >
      <a-input v-model:value="formState.text" />
    </a-form-item>

    <!-- 按钮 -->
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" html-type="submit">确认修改</a-button>
      <a-button style="margin-left: 10px" @click="visible = false">取消</a-button>
    </a-form-item>
  </a-form>
    </a-modal>
    <a-modal v-model:visible="visible2" 
    title="添加学生" @ok="handleOk2"  :maskClosable = false
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
      label="姓名"
      name="username"
    >
      <a-input v-model:value="formState2.username" />
    </a-form-item>
    <a-form-item
      name="gender"
      label="性别"
    >
      <a-select v-model:value="formState2.gender" placeholder="请选择性别">
        <a-select-option value="男">男</a-select-option>
        <a-select-option value="女">女</a-select-option>
      </a-select>
    </a-form-item>
    
    <a-form-item
      label="学号"
      name="snumber"
    >
      <a-input v-model:value="formState2.snumber" />
    </a-form-item>
    
    <a-form-item
      label="专业"
      name="class"
    >
      <a-input v-model:value="formState2.class" />
    </a-form-item>
    <a-form-item name="tags"
      label="状态">
      <a-radio-group v-model:value="formState2.tags">
        <a-radio value="在校">在校</a-radio>
        <a-radio value="请假">请假</a-radio>
        <a-radio value="休学">休学</a-radio>
      </a-radio-group>
    </a-form-item>

    <a-form-item
      label="联系电话"
      name="phone"
    >
      <a-input v-model:value="formState2.phone" />
    </a-form-item>

    <a-form-item
      label="备注"
      name="text"
    >
      <a-input v-model:value="formState2.text" />
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
import {getStudent , changeinfo , deleteStudent,addchstudent} from '@/api/api.js'
import zh_CN from 'ant-design-vue/es/locale/zh_CN';
import { ConfigProvider } from 'ant-design-vue';
import {store} from '@/store/index.js'
const columns = [
  {
  title: '序号',
  dataIndex: 'number',
  key: 'number',
  width:100,
  align:'center',
  fixed:true,
},{
  name: 'name',
  dataIndex: 'username',
  key: 'name',
  width:150,
  align:'center',
  fixed:true,
},{
  title: '性别',
  dataIndex: 'gender',
  key: 'gender',
  width:100,
  align:'center',
},{
  title: '学号',
  dataIndex: 'snumber',
  key: 'snumber',
  width:250,
  align:'center',
  sorter: {
    compare: (a, b) => a.snumber - b.snumber,
    multiple: 2,
  },
}, {
  title: '专业',
  dataIndex: 'class',
  key: 'class',
  width:250,
  align:'center',
}, {
  title: '状态',
  key: 'tags',
  dataIndex: 'tags',
  width:150,
  align:'center',
  filters: [{
    text: '在校',
    value: '在校',
  }, {
    text: '请假',
    value: '请假',
  },{
    text: '休学',
    value: '休学',
  },],
   onFilter: (value, record) => record.tags.indexOf(value) === 0,
}, {
  title: '联系电话',
  key: 'phone',
  dataIndex: 'phone',
  width:250,
  align:'center',
},{
  title: '备注',
  key: 'text',
  dataIndex: 'text',
  width:200,
  align:'center',
},{
  title: '操作',
  key: 'action',
  width:150,
  align:'center',
  fixed: 'right',
}];
const data = ref([ ])
const formState = ref()
const formState2 = ref(
  {
    username:'',
    gender:'',
    snumber:'',
    class:'',
    tags:'',
    phone:'',
    text:'',
  }
)
export default ({
  components: {
    SmileOutlined,
    DownOutlined,
    ConfigProvider
  },
  setup() {
    const visit = ref(store.count)
    // 获取学生列表
     const getlist = () =>{
      getStudent().then(res => {
      data.value = res.data.data
      data.value = data.value.filter(item => item.is_delete !== 1)
      for(let i = 1 ;i <= data.value.length ; i++){
        data.value[i-1]["key"] = i
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
      deleteStudent(key).then(
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
     let  {key , ...rest} = dataitem
      formState.value = rest
      console.log(formState.value);
    };
    const showModal2 = () => {
      visible2.value = true;
    };
    const handleOk = e => {
      changeinfo(formState.value).then( res =>{
        console.log(res);
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
      addchstudent(formState2.value).then( res =>{
        if(res.data.status === 0 ){
          message.success('添加成功')
          getlist()

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
      gender: [{
        required: true,
        trigger: 'change',
      }],
      snumber: [{
        required: true,
        trigger: 'change',
      }],
      class: [{
        required: true,
        trigger: 'change',
      }],
      tags: [{
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
      handleOk2,
      visit
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