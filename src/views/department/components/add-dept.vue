<template>
  <el-dialog title="新增部门" :visible="showDialog" @close="close">
    <!-- 弹层内容 -->
    <el-form ref="addDept" :model="formData" :rules="rules" label-width="120px">
      <el-form-item prop="name" label="部门名称">
        <el-input
          v-model="formData.name"
          placeholder="2-10个字符"
          style="width: 80%"
          size="small"
        />
      </el-form-item>
      <el-form-item prop="code" label="部门编码">
        <el-input
          v-model="formData.code"
          placeholder="2-10个字符"
          style="width: 80%"
          size="small"
        />
      </el-form-item>
      <el-form-item prop="managerId" label="部门负责人">
        <el-select
          v-model="formData.managerId"
          placeholder="请选择负责人"
          style="width: 80%"
          size="small"
        >
          <el-option
            v-for="item in managerList"
            :key="item.id"
            :label="item.username"
            :value="item.id"
          >{{ item.username }}</el-option>
        </el-select>

      </el-form-item>
      <el-form-item prop="introduce" label="部门介绍">
        <el-input
          v-model="formData.introduce"
          placeholder="1-100个字符"
          type="textarea"
          rows="4"
          style="width: 80%"
        />
      </el-form-item>
      <el-form-item>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-button type="primary" @click="btnOk">确定</el-button>
            <el-button @click="close">取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { getDepartment, getManagerList, addDepartment } from '@/api/department'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    currentNodeId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      formData: {
        code: '',
        introduce: '',
        managerId: '',
        pid: '',
        name: ''
      },
      rules: {
        code: [
          {
            required: true,
            message: '不为空',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 10,
            message: '长度在2-10之间',
            trigger: 'blur'
          },
          {
            trigger: 'blur',
            validator: async(rule, value, callback) => {
              const result = await getDepartment()
              if (result.some(item => item.code === value)) {
                callback(new Error('已有该编码'))
              } else {
                callback()
              }
            }
          }
        ],
        introduce: [
          {
            required: true,
            message: '不为空',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 100,
            message: '长度在1-100之间',
            trigger: 'blur'
          }
        ],
        managerId: [
          {
            required: true,
            message: '不为空',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: '不为空',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 10,
            message: '长度在2-10之间',
            trigger: 'blur'
          },
          {
            trigger: 'blur',
            validator: async(rule, value, callback) => {
              const result = await getDepartment()
              if (result.some(item => item.name === value)) {
                callback(new Error('已有该名称'))
              } else {
                callback()
              }
            }
          }
        ]
      },
      managerList: []
    }
  },
  created() {
    this.getManagerList()
  },

  methods: {
    close() {
      this.$refs.addDept.resetFields()
      this.$emit('update:showDialog', false)
    },
    async getManagerList() {
      this.managerList = await getManagerList()
    },
    btnOk() {
      this.$refs.addDept.validate(async isOK => {
        if (isOK) {
          await addDepartment({ ...this.formData, pid: this.currentNodeId })
          // 通知父组件更新
          this.$emit('updateDepartment')
          this.$message.success('新增部门成功')
          this.close()
        }
      })
    }
  }
}
</script>

<style></style>
