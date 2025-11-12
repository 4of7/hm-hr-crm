<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <!-- 使用svg-icon -->
    <!-- <svg-icon icon-class="example" /> -->
    <button @click="test">测试按钮</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import store from '@/store'
import request from '@/utils/request'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }, methods: {
    test() {
      request({
        url: '/sys/user',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2MjkxNDQ5OSwiZXhwIjoxNzYyOTM2MDk5fQ.SgWzC3Pq08i8R_yJyTzWfNuN-SeCorxvp6WqIeb8Axs'
        },
        data: {
          username: '张三',
          mobile: '16619742416',
          formOfEmployment: 1,
          workNumber: 'A001',
          departmentId: 2,
          timeOfEntry: '2025-11-12T00:00:00Z',
          correctionTime: '2025-12-12T00:00:00Z',
          staffPhoto: ''
        }
      }).then(res => {
        console.log('✅ 接口返回：', res)
      }).catch(err => {
        console.error('❌ 请求失败：', err)
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
