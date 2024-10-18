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
  const token = sessionStorage.getItem('userProfile') ?
    JSON.parse(sessionStorage.getItem('userProfile')).token :
    JSON.parse(localStorage.getItem('userProfile')).token
  return {
    headers: {
      Authorization: token
    }
  }
}

export default {
  list() {
    return estimativeApi.get('/razion/estimatives/list', configs())
  },
  create(data) {
    return estimativeApi.post('/razion/estimatives/create', data, configs())
  },
  update(id, data) {
    return estimativeApi.put(`/razion/estimatives/update/${id}`, data, configs())
  },
  delete(id) {
    return estimativeApi.delete(`/razion/estimatives/delete/${id}`, configs())
  }
}