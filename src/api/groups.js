import request from '@/utils/request'

// 获取用户组列表
export function getGroupList(params) {
  return request({
    url: '/Groups/',
    method: 'get',
    params
  })
}

// 创建用户组
export function createGroup(data) {
  return request({
    url: '/Groups/',
    method: 'post',
    data
  })
}

// 修改用户组
export function updateGroup(id, data) {
  return request({
    url: '/Groups/' + id + '/',
    method: 'patch',
    data
  })
}

// 删除用户组
export function deleteGroup(id) {
  return request({
    url: '/Groups/' + id + '/',
    method: 'delete'
  })
}

export function getGroups() {
  return request({
    url: 'api/groups/',
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: 'api/groups/',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/groups/' + id + '/',
    method: 'delete'
  })
}

export function retrieve(id) {
  return request({
    url: 'api/groups/' + id + '/',
    method: 'get'
  })
}

export function edit(id, data) {
  return request({
    url: 'api/groups/' + id + '/',
    method: 'put',
    data
  })
}

export function save(id, data) {
  return request({
    url: 'api/groups/' + id + '/',
    method: 'patch',
    data
  })
}

