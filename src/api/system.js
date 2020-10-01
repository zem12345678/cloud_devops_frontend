import request from '@/utils/request'

// 注册审批列表
export function registerApplyList(params) {
  return request({
    url: '/api/v1/register-apply',
    method: 'get',
    params
  })
}

// 同意注册审批
export function agreeRegisterApply(data) {
  return request({
    url: '/api/v1/register-apply',
    method: 'post',
    data
  })
}

// 同意注册审批
export function ignoreRegisterApply(params) {
  return request({
    url: '/api/v1/ignore-agent',
    method: 'get',
    params
  })
}

// agent 列表
export function agentList(params) {
  return request({
    url: '/api/v1/agent-list',
    method: 'get',
    params
  })
}

// 删除agent
export function deleteAgent(data) {
  return request({
    url: '/api/v1/agent-list',
    method: 'delete',
    data
  })
}
