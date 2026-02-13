import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getSection } from '../api/sectionApi'
import { getQuestions, deleteQuestion } from '../api/questionApi'
import '../styles/list.css'
import '../styles/form.css'

const SectionDetailPage = () => {
  const { testId, sectionId } = useParams()
  const [section, setSection] = useState(null)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)

  const fetchData = async () => {
    try {
      const [sectionRes, questionsRes] = await Promise.all([
        getSection(sectionId),
        getQuestions(sectionId),
      ])
      setSection(sectionRes.data?.data ?? sectionRes.data)
      setQuestions(questionsRes.data?.data ?? questionsRes.data ?? [])
    } catch (err) {
      setSection(null)
      setQuestions([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [sectionId])

  const handleDeleteQuestion = async (e, questionId) => {
    e.preventDefault()
    e.stopPropagation()
    setDeletingId(questionId)
    try {
      await deleteQuestion(questionId)
      setQuestions((prev) => prev.filter((q) => q._id !== questionId))
    } catch (err) {
      fetchData()
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) return <div className="loading">Loading section...</div>
  if (!section) return <div className="loading">Section not found</div>

  return (
    <>
      <div className="page-header">
        <h2>{section.name}</h2>
        <Link
          to={`/tests/${testId}/sections/${sectionId}/questions/add`}
          className="btn btn-primary"
        >
          Add Question
        </Link>
      </div>
      <div className="list-card">
        {questions.length === 0 ? (
          <div className="empty-state">
            <p>No questions yet.</p>
            <Link
              to={`/tests/${testId}/sections/${sectionId}/questions/add`}
              className="btn btn-primary"
            >
              Add Question
            </Link>
          </div>
        ) : (
          questions.map((q) => (
            <div key={q._id} className="list-item list-item-row">
              <Link
                to={`/tests/${testId}/sections/${sectionId}/questions/${q._id}`}
                className="list-item list-item-link"
              >
                <div className="list-item-title">{q.question_text}</div>
                <div className="list-item-subtitle">
                  A: {q.option_a} | B: {q.option_b} | C: {q.option_c} | D: {q.option_d}
                  {q.correct_option && ` • Correct: ${q.correct_option.toUpperCase()}`}
                </div>
              </Link>
              <button
                type="button"
                className="btn btn-danger"
                onClick={(e) => handleDeleteQuestion(e, q._id)}
                disabled={deletingId === q._id}
              >
                {deletingId === q._id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default SectionDetailPage
