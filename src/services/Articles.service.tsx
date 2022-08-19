import { HttpService } from './http.service'

const basePath = '/article'

export const ArticlesService = {
  getAll,
  insert,
  update,
  del,
  getById,
  remove,
}

async function getAll() {
  return HttpService.get(basePath)
}

async function insert(data: any) {
  return HttpService.post(`${basePath}`, data)
}

async function update({ data, id }: any) {
  return HttpService.put(`${basePath}/${id}`, data)
}

async function del(data: any) {
  return HttpService.delete(`${basePath}/${data}`)
}

async function remove(id: any) {
  return HttpService.post(`${basePath}/remove/${id}`)
}

async function getById(id: any) {
  return HttpService.get(`${basePath}/${id}`)
}

export default ArticlesService
