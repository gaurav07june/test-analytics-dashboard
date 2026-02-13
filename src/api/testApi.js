import axiosInstance from './axiosInstance'

export const getTests = () => axiosInstance.get('/tests')
export const getTest = (id) => axiosInstance.get(`/tests/${id}`)
export const createTest = (data) => axiosInstance.post('/tests', data)
export const deleteTest = (id) => axiosInstance.delete(`/tests/${id}`)
