import axios from 'axios'
import { dispatchEvent } from '@/utils/events.js'

export const estimativeApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    common: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  }
})

estimativeApi.interceptors.request.use((config) => {
  dispatchEvent('setLoading', true)
  return config
}, (err) => {
  dispatchEvent('setLoading', false)
  let error = err.response?.data.error
  let field = err.response?.data.field
  if (error) {
    dispatchEvent('showMessage', { error, field })
  }
  else
    dispatchEvent('showMessage', { error: 'Erro inesperado' })
  return Promise.reject(err)
})

estimativeApi.interceptors.response.use((res) => {
  dispatchEvent('setLoading', false)
  return res
}, (err) => {
  dispatchEvent('setLoading', false)
  let error = err.response?.data.error
  let field = err.response?.data.field
  if (error) {
    if (error == 'Token inválido.') {
      dispatchEvent('showMessage', { error: 'Sua sessão expirou. Por favor, faça o login novamente.' })
      dispatchEvent('logout')
    }
    else
      dispatchEvent('showMessage', { error, field })
  }
  else
    dispatchEvent('showMessage', { error: 'Erro inesperado' })
  return Promise.reject(err)
})

const configs = () => {
  let sessionStr = sessionStorage.getItem('userProfile')
  let localStr = localStorage.getItem('userProfile')

  if (!sessionStr && !localStr) {
    dispatchEvent('showMessage', { error: 'Você precisa estar logado para finalizar essa ação.' })
    throw new Error('You need to be logged in to finish this action.')
  }
  const token = sessionStr ?
    JSON.parse(sessionStr).token :
    JSON.parse(localStr).token
  return {
    headers: {
      Authorization: token
    }
  }
}

export default {
  get(id) {
    return estimativeApi.get(`/razion/estimatives/get/${id}`)
  },
  list() {
    return estimativeApi.get('/razion/estimatives/list', configs())
  },
  create(data) {
    return estimativeApi.post('/razion/estimatives/create', data, { headers: { ...configs().headers, 'Content-Type': 'multipart/form-data' } })
  },
  update(id, data) {
    return estimativeApi.put(`/razion/estimatives/update/${id}`, data, { headers: { ...configs().headers, 'Content-Type': 'multipart/form-data' } })
  },
  delete(id) {
    return estimativeApi.delete(`/razion/estimatives/delete/${id}`, configs())
  }
}