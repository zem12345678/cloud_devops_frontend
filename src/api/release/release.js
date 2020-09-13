import request from '@/utils/request'

// 获取工单列表
export function getDeployList(params) {
  return request({
    url: '/deploy/',
    method: 'get',
    params
  })
}

// 创建工单
export function createDeploy(data) {
  return request({
    url: '/deploy/',
    method: 'post',
    data
  })
}

// 修改工单
export function updateDeploy(id, data) {
  return request({
    url: '/deploy/' + id + '/',
    //method: 'put',
    method: 'patch',
    data
  })
}

// 删除工单
export function deleteDeploy(id) {
  return request({
    url: '/deploy/' + id + '/',
    method: 'delete'
  })
}
