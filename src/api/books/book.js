import request from '@/utils/request'

// 获取图书列表
export function getBookList(params) {
  return request({
    url: '/api/books/book/',
    method: 'get',
    params
  })
}

// 创建图书
export function createBook(data) {
  return request({
    url: '/api/books/book/',
    method: 'post',
    data
  })
}

// 修改图书
export function updateBook(id, data) {
  return request({
    url: '/api/books/book/' + id + '/',
    method: 'put',
    data
  })
}

// 删除图书
export function deleteBook(id) {
  return request({
    url: '/api/books/book/' + id + '/',
    method: 'delete'
  })
}
