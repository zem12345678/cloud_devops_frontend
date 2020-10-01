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
export function createAutoTask(data) {
  return request({
    url: '/task/',
    method: 'post',
    data
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
// 任务列表
export function taskList(params) {
  return request({
    url: '/api/v1/task-list',
    method: 'get',
    params
  })
}

// 新建任务
export function createTask(data) {
  return request({
    url: '/api/v1/task-list',
    method: 'post',
    data
  })
}

// 新建任务
export function deleteTask(data) {
  return request({
    url: '/api/v1/task-list',
    method: 'delete',
    data
  })
}

// 执行任务
export function executeTask(data) {
  return request({
    url: '/api/v1/execute-task',
    method: 'post',
    data
  })
}

// 定时任务列表
export function scheduledTaskList(params) {
  return request({
    url: '/api/v1/scheduled-task',
    method: 'get',
    params
  })
}

// 定时任务列表
export function deleteScheduledTask(data) {
  return request({
    url: '/api/v1/scheduled-task',
    method: 'delete',
    data
  })
}

// 新建定时任务
export function createScheduledTask(data) {
  return request({
    url: '/api/v1/scheduled-task',
    method: 'post',
    data
  })
}

// 修改定时任务状态
export function updateScheduledTaskStatus(data) {
  return request({
    url: '/api/v1/scheduled-task',
    method: 'put',
    data
  })
}

// 获取任务执行历史
export function taskHistoryList(params) {
  return request({
    url: '/api/v1/task-history',
    method: 'get',
    params
  })
}

// 获取任务执行历史
export function taskHistoryDetails(params) {
  return request({
    url: '/api/v1/task-history-details',
    method: 'get',
    params
  })
}
