import request from '@/utils/request'
// 获取组织架构
export function getDepartment() {
  return request({
    url: '/company/department'
  })
}
