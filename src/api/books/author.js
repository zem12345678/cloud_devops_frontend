import request from '@/utils/request'

// 获取作者列表
export function getAuthorList(params) {
  return request({
    url: '/api/books/author/',
    method: 'get',
    params
  })
}

// 创建作者
export function createAuthor(data) {
  return request({
    url: '/api/books/author/',
    method: 'post',
    data
  })
}

// 修改作者
export function updateAuthor(id, data) {
  return request({
    url: '/api/books/author/' + id + '/',
    method: 'put',
    data
  })
}

// 删除作者
export function deleteAuthor(id) {
  return request({
    url: '/api/books/author/' + id + '/',
    method: 'delete'
  })
}
