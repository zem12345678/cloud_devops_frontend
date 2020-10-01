import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'auth/login/',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'auth/info/',
    method: 'get',
    headers: { 'Authorization': 'jwt ' + token }
  })
}

// export function logout() {
//   return request({
//     url: '/vue-element-admin/user/logout',
//     method: 'post'
//   })
// }

export function buildMenus() {
  return request({
    url: 'auth/build/menus/',
    method: 'get'
  })
}

export function addUser(data) {
  return request({
    url: 'api/users/',
    method: 'post',
    data
  })
}

export function deleteUser(id) {
  return request({
    url: 'api/users/' + id + '/',
    method: 'delete'
  })
}

export function editUser(id, data) {
  return request({
    url: 'api/users/' + id + '/',
    method: 'put',
    data
  })
}

export function updatePassword(id, data) {
  return request({
    url: 'api/users/' + id + '/change-passwd/',
    method: 'post',
    data
  })
}

export function getUserList(name) {
  if (name) {
    return request({
      url: 'api/user/list/?name=' + name,
      method: 'get'
    })
  } else {
    return request({
      url: 'api/user/list/',
      method: 'get'
    })
  }
}
