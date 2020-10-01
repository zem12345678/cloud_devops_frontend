import request from '@/utils/request'

export function BastionAccount() {
  return request({
    url: '/api/v1/bastion/account/',
    method: 'get'
  })
}

export function BastionGroups() {
  return request({
    url: '/api/v1/bastion/group/',
    method: 'get'
  })
}


export function buildMenus() {
  return request({
    url: 'auth/build/menus/',
    method: 'get'
  })
}
