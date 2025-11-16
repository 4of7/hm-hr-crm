import request from '@/utils/request'
// 获取组织架构
export function getDepartment() {
  return request({
    url: '/company/department'
  })
}
// 获取负责人列表
export function getManagerList() {
  return request({
    url: '/sys/user/simple'
  })
}
// 新增组织
export function addDepartment(data) {
  return request({
    url: '/company/department',
    data
  })
}
