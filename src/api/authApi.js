import axiosInstance from './axiosInstance'

export const login = (body) =>
  axiosInstance.post('/auth/login', body)
