import request from '@/utils/request'

// 获取组列表
export function getGroupList(params) {
  return request({
    url: '/group/',
    method: 'get',
    params
  })
}

// 获取某个组的成员
export function getOneGroup(id) {
  return request({
    url: '/group/' + id + '/',
    method: 'get',
  })
}

// 创建组
export function createGroup(data) {
  return request({
    url: '/group/',
    method: 'post',
    data
  })
}

// 修改组
export function updateGroup(id, data) {
  return request({
    url: '/group/' + id + '/',
    method: 'put',
    data
  })
}

// 删除组
export function deleteGroup(id) {
  return request({
    url: '/group/' + id + '/',
    method: 'delete'
  })
}

// 获取权限列表
export function getPermissionList(params) {
  return request({
    url: '/permission/',
    method: 'get',
    params
  })
}


// 修改角色权限
export function updateGroupPower(id, data) {
  return request({
    url: '/grouppower/' + id + '/',
    method: 'put',
    data
  })
}


// 将指定用户从组里面删除
export function deleteGroupMember(gid,data) {
  return request({
    url: '/groupmembers/' + gid + '/',
    method: 'delete',
    data
  })
}
