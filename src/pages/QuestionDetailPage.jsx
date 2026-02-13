import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getQuestion } from '../api/questionApi'
import '../styles/list.css'

const QuestionDetailPage = () => {
  const { testId, sectionId, questionId } = useParams()
  const [question, setQuestion] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await getQuestion(questionId)
        setQuestion(res.data?.data ?? res.data)
      } catch (err) {
        setQuestion(null)
      } finally {
        setLoading(false)
      }
    }
    fetchQuestion()
  }, [questionId])

  if (loading) return <div className="loading">Loading question...</div>
  if (!question) return <div className="loading">Question not found</div>

  return (
    <>
      <div className="page-header">
        <h2>Question Detail</h2>
        <Link to={`/tests/${testId}/sections/${sectionId}`} className="btn btn-secondary">
          Back
        </Link>
      </div>
      <div className="list-card" style={{ padding: '1.5rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.875rem', color: '#7f8c8d', marginBottom: '0.5rem' }}>
            Question
          </div>
          <div style={{ fontSize: '1.1rem' }}>{question.question_text}</div>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.875rem', color: '#7f8c8d', marginBottom: '0.5rem' }}>
            Options
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div>A. {question.option_a}</div>
            <div>B. {question.option_b}</div>
            <div>C. {question.option_c}</div>
            <div>D. {question.option_d}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {question.correct_option && (
            <div>
              <span style={{ color: '#7f8c8d' }}>Correct: </span>
              <span style={{ fontWeight: 500 }}>{question.correct_option.toUpperCase()}</span>
            </div>
          )}
          {question.expected_time_sec != null && (
            <div>
              <span style={{ color: '#7f8c8d' }}>Expected time: </span>
              <span>{question.expected_time_sec} sec</span>
            </div>
          )}
          {question.difficulty && (
            <div>
              <span style={{ color: '#7f8c8d' }}>Difficulty: </span>
              <span>{question.difficulty}</span>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default QuestionDetailPage
