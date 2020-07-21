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

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

export function buildMenus() {
  return request({
    url: 'auth/build/menus/',
    method: 'get'
  })
}

