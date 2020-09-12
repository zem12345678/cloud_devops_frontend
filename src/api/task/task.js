import request from '@/utils/request'

// 获取任务列表
export function getTaskList(params) {
  return request({
    url: '/task/',
    method: 'get',
    params
  })
}

// 创建任务
export function createTask(data) {
  return request({
    url: '/task/',
    method: 'post',
    data,
  })
}

// 执行任务
export function updateTask(id, data) {
  return request({
    url: '/task/' + id + '/',
    method: 'patch',
    data
  })
}

// 任务详情
export function detailTask(id) {
  return request({
    url: '/task/' + id + '/',
    method: 'get'
  })
}
