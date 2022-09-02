import { HttpService } from './http.service'

const basePath = '/category'

export const CategoryService = {
  getAll,
  insert,
  update,
  del,
  getById,
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

async function getById(id: any) {
  return HttpService.get(`${basePath}/${id}`)
}

export default CategoryService
