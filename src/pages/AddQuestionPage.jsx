import { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { createQuestion } from '../api/questionApi'
import '../styles/form.css'

const AddQuestionPage = () => {
  const { testId, sectionId } = useParams()
  const [questionText, setQuestionText] = useState('')
  const [optionA, setOptionA] = useState('')
  const [optionB, setOptionB] = useState('')
  const [optionC, setOptionC] = useState('')
  const [optionD, setOptionD] = useState('')
  const [correctOption, setCorrectOption] = useState('a')
  const [expectedTimeSec, setExpectedTimeSec] = useState(30)
  const [difficulty, setDifficulty] = useState('easy')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await createQuestion(sectionId, {
        question_text: questionText,
        option_a: optionA,
        option_b: optionB,
        option_c: optionC,
        option_d: optionD,
        correct_option: correctOption,
        expected_time_sec: expectedTimeSec,
        difficulty,
      })
      navigate(`/tests/${testId}/sections/${sectionId}`)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create question')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="page-header">
        <h2>Add Question</h2>
        <Link to={`/tests/${testId}/sections/${sectionId}`} className="btn btn-secondary">
          Back
        </Link>
      </div>
      <form className="form-card" onSubmit={handleSubmit}>
        {error && <p className="error-msg">{error}</p>}
        <div className="form-group">
          <label>Question Text</label>
          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Option A</label>
          <input
            value={optionA}
            onChange={(e) => setOptionA(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Option B</label>
          <input
            value={optionB}
            onChange={(e) => setOptionB(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Option C</label>
          <input
            value={optionC}
            onChange={(e) => setOptionC(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Option D</label>
          <input
            value={optionD}
            onChange={(e) => setOptionD(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Correct Option</label>
          <select value={correctOption} onChange={(e) => setCorrectOption(e.target.value)}>
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
            <option value="d">D</option>
          </select>
        </div>
        <div className="form-group">
          <label>Expected Time (seconds)</label>
          <input
            type="number"
            min={1}
            value={expectedTimeSec}
            onChange={(e) => setExpectedTimeSec(Number(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label>Difficulty</label>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Creating...' : 'Create Question'}
        </button>
      </form>
    </>
  )
}

export default AddQuestionPage
