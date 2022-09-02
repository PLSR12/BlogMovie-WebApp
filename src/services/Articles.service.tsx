import { HttpService } from './http.service'
// importo meu http service o qual é o meu "arquivo principal", aonde tenho os interceptors e o create da api

const basePath = '/article' // aqui passo o 'endereço' de onde irei fazer as req na api

export const ArticlesService = {
  getAll,
  insert,
  update,
  del,
  getById,
} // aqui exporto meus serviços para chamar no pages

// aqui estão meus serviços, que são as requests na API metodos(get,post,put,delete)
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

export default ArticlesService
