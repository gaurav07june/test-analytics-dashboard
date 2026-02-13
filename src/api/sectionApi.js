import axiosInstance from './axiosInstance'

export const getSections = (testId) => axiosInstance.get(`/tests/${testId}/sections`)
export const getSection = (sectionId) => axiosInstance.get(`/sections/${sectionId}`)
export const createSection = (testId, data) =>
  axiosInstance.post('/sections', { test_id: testId, ...data })
export const deleteSection = (sectionId) => axiosInstance.delete(`/sections/${sectionId}`)
