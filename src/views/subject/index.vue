<template>
<ConfigProvider :locale = zh_CN>
  <div class="title"><a @click="showModal2" v-if="visit">新增</a></div>
  <a-table sticky :columns="columns" :data-source="data" :pagination="pagination" :scroll="{  y: '58vh' }">
    
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span>
          课程名称
        </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      
      <template v-if="column.key === 'keynumber'">
        <span>
          {{record.key}}
        </span>
      </template>
      <template v-if="column.key === 'properties'">
        <span>
          <a-tag
            
            :color="record.properties === '必修' ? 'green' : record.properties === '选修'? 'orange' : 'red' "
          >
            {{ record.properties }}
          </a-tag>
        </span>
      </template>
      <template v-if="column.key === 'way'">
        <span>
          <a-tag
            
            :color="record.way === '考试' ? 'red' : record.way === '考查'? 'blue' : 'yellow' "
          >
            {{ record.way }}
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
      label="课程代码"
      name="number"
    >
      <a-input v-model:value="formState.number" />
    </a-form-item>
    
    <a-form-item
      label="课程名称"
      name="name"
    >
      <a-input v-model:value="formState.name" />
    </a-form-item>
    
    <a-form-item
      label="开课学院"
      name="college"
    >
      <a-input v-model:value="formState.college" />
    </a-form-item>
    <a-form-item name="properties"
      label="课程性质">
      <a-radio-group v-model:value="formState.properties">
        <a-radio value="必修">必修</a-radio>
        <a-radio value="选修">选修</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item name="way"
      label="考试形式">
      <a-radio-group v-model:value="formState.way">
        <a-radio value="考试">考试</a-radio>
        <a-radio value="考察">考察</a-radio>
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
      label="课程代码"
      name="number"
    >
      <a-input v-model:value="formState2.number" />
    </a-form-item>
    
    <a-form-item
      label="课程名称"
      name="name"
    >
      <a-input v-model:value="formState2.name" />
    </a-form-item>
    
    <a-form-item
      label="开课学院"
      name="college"
    >
      <a-input v-model:value="formState2.college" />
    </a-form-item>
    <a-form-item name="properties"
      label="课程性质">
      <a-radio-group v-model:value="formState2.properties">
        <a-radio value="必修">必修</a-radio>
        <a-radio value="选修">选修</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item name="way"
      label="考试形式">
      <a-radio-group v-model:value="formState2.way">
        <a-radio value="考试">考试</a-radio>
        <a-radio value="考察">考察</a-radio>
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
import {getclass , changeinfo , deleteclass,addclass} from '@/api/class.js'
import zh_CN from 'ant-design-vue/es/locale/zh_CN';
import { ConfigProvider } from 'ant-design-vue';
import {store} from '@/store/index.js'
const columns = [
  {
  title: '序号',
  dataIndex: 'keynumber',
  key: 'keynumber',
  width:100,
  align:'center',
},
{
  title: '课程代码',
  dataIndex: 'number',
  key: 'number',
  width:200,
  align:'center',
},{
  name: 'name',
  dataIndex: 'name',
  key: 'name',
  width:150,
  align:'center',
},{
  title: '开课学院',
  dataIndex: 'college',
  key: 'college',
  width:250,
  align:'center',
},{
  title: '课程性质',
  dataIndex: 'properties',
  key: 'properties',
  width:250,
  align:'center',
  filters: [{
    text: '必修',
    value: '必修',
  }, {
    text: '选修',
    value: '选修',
  },],
   onFilter: (value, record) => record.properties.indexOf(value) === 0,
}, {
  title: '考试形式',
  dataIndex: 'way',
  key: 'way',
  width:250,
  align:'center',
  filters: [{
    text: '考试',
    value: '考试',
  }, {
    text: '考查',
    value: '考查',
  },],
   onFilter: (value, record) => record.way.indexOf(value) === 0,
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
    number:'',
    name:'',
    college:'',
    properties:'',
    way:'',
  }
)
export default ({
  components: {
    SmileOutlined,
    DownOutlined,
    ConfigProvider
  },
  setup() {
    // 权限控制
    const visit = ref(store.count)
    // 获取学生列表
     const getlist = () =>{
      getclass().then(res => {
      data.value = res.data.data
      data.value = data.value.filter(item => item.is_delete != 1)
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
      deleteclass(key).then(
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
      addclass(formState2.value).then( res =>{
        if(res.data.status === 0 ){
          message.success('添加成功')
          getlist()
          formState2.value={
              number:'',
              name:'',
              college:'',
              properties:'',
              way:'',
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
      if (value.length !== 10) {
        return Promise.reject('长度为10');
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
      number: [{
        required: true,
        validator: validatePass,
        trigger: 'change',
      }],
      college: [{
        required: true,
        trigger: 'change',
      }],
      properties: [{
        required: true,
        trigger: 'change',
      }],
      way: [{
        required: true,
        trigger: 'change',
      }],
      name: [{
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
      visit,
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