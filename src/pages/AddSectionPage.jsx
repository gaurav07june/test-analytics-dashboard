import { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { createSection } from '../api/sectionApi'
import '../styles/form.css'

const AddSectionPage = () => {
  const { testId } = useParams()
  const [name, setName] = useState('Quant')
  const [orderIndex, setOrderIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await createSection(testId, { name, order_index: orderIndex })
      navigate(`/tests/${testId}`)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create section')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="page-header">
        <h2>Add Section</h2>
        <Link to={`/tests/${testId}`} className="btn btn-secondary">Back</Link>
      </div>
      <form className="form-card" onSubmit={handleSubmit}>
        {error && <p className="error-msg">{error}</p>}
        <div className="form-group">
          <label>Name</label>
          <select value={name} onChange={(e) => setName(e.target.value)}>
            <option value="Quant">Quant</option>
            <option value="Logical">Logical</option>
            <option value="Verbal">Verbal</option>
          </select>
        </div>
        <div className="form-group">
          <label>Order Index</label>
          <input
            type="number"
            min={0}
            value={orderIndex}
            onChange={(e) => setOrderIndex(Number(e.target.value))}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Creating...' : 'Create Section'}
        </button>
      </form>
    </>
  )
}

export default AddSectionPage
