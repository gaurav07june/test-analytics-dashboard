import axiosInstance from './axiosInstance'

export const getQuestions = (sectionId) =>
  axiosInstance.get(`/sections/${sectionId}/questions`)
export const getQuestion = (questionId) =>
  axiosInstance.get(`/questions/${questionId}`)
export const createQuestion = (sectionId, data) =>
  axiosInstance.post('/questions', { section_id: sectionId, ...data })
export const deleteQuestion = (questionId) =>
  axiosInstance.delete(`/questions/${questionId}`)
