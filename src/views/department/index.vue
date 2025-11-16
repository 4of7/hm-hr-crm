<template>
  <div class="container">
    <div class="app-container">
      组织架构
      <el-tree :data="treeData" default-expand-all :expand-on-click-node="false" :props="defaultProps">
        <!-- 节点结构 -->
        <template v-slot="{ data }">
          <el-row
            type="flex"
            justify="space-between"
            align="middle"
            style="width: 100%; height: 40px"
          >
            <el-col>{{ data.name }}</el-col>
            <el-col :span="4">
              <span class="trea-manager">{{ data.managerName }}</span>
              <el-dropdown @command="operateDept($event,data.id)">
                <span
                  class="el-dropdown-link"
                >操作 <i class="el-icon-arrow-down" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                  <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                  <el-dropdown-item command="del">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
    <!-- 弹层组件 -->
    <add-dept :current-node-id="currentNodeId" :show-dialog.sync="showDialog" @updateDepartment="getDepartment" />
  </div>
</template>
<script>
import { getDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils'
import AddDept from './components/add-dept.vue'
export default {
  name: 'Department',
  components: { AddDept },
  data() {
    return {
      treeData: [
        {
          name: '桓狗教育',
          managerName: '管理员',
          children: [
            {
              name: '桓狗办',
              managerName: '桓狗',

              children: [
                {
                  name: '刘测试1',
                  managerName: '张三'
                },
                {
                  name: '刘测试2',
                  managerName: '李四'
                }
              ]
            },
            {
              name: '行政部',
              managerName: '王五'
            },
            {
              name: '人事部',
              managerName: '刘测试'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      showDialog: false,
      currentNodeId: null
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    async getDepartment() {
      const result = await getDepartment()
      this.treeData = transListToTreeData(result, 0)
    },
    operateDept(type, id) {
      if (type === 'add') {
        this.showDialog = true
        this.currentNodeId = id
      }
    }
  }
}
</script>

<style scoped>
.app-container {
  padding: 30px 140px;
  font-size: 14px;
}
.trea-manager {
  width: 50px;
  display: inline-block;
  margin: 10px;
}
</style>
