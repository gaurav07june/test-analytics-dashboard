import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getTest } from '../api/testApi'
import { getSections, deleteSection } from '../api/sectionApi'
import '../styles/list.css'
import '../styles/form.css'

const TestDetailPage = () => {
  const { testId } = useParams()
  const [test, setTest] = useState(null)
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)

  const fetchData = async () => {
    try {
      const [testRes, sectionsRes] = await Promise.all([
        getTest(testId),
        getSections(testId),
      ])
      setTest(testRes.data?.data ?? testRes.data)
      setSections(sectionsRes.data?.data ?? sectionsRes.data ?? [])
    } catch (err) {
      setTest(null)
      setSections([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [testId])

  const handleDeleteSection = async (e, sectionId) => {
    e.preventDefault()
    e.stopPropagation()
    setDeletingId(sectionId)
    try {
      await deleteSection(sectionId)
      setSections((prev) => prev.filter((s) => s._id !== sectionId))
    } catch (err) {
      fetchData()
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) return <div className="loading">Loading test...</div>
  if (!test) return <div className="loading">Test not found</div>

  return (
    <>
      <div className="page-header">
        <h2>{test.title}</h2>
        <Link to={`/tests/${testId}/sections/add`} className="btn btn-primary">
          Add Section
        </Link>
      </div>
      <div style={{ marginBottom: '1.5rem', color: '#7f8c8d', fontSize: '0.95rem' }}>
        {test.description && <p>{test.description}</p>}
        <div style={{ marginTop: '0.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {test.duration_minutes != null && (
            <span>Duration: {test.duration_minutes} min</span>
          )}
          {test.level && <span>Level: {test.level}</span>}
          {test.is_active != null && (
            <span>Status: {test.is_active ? 'Active' : 'Inactive'}</span>
          )}
        </div>
      </div>
      <div className="list-card">
        {sections.length === 0 ? (
          <div className="empty-state">
            <p>No sections yet.</p>
            <Link to={`/tests/${testId}/sections/add`} className="btn btn-primary">
              Add Section
            </Link>
          </div>
        ) : (
          sections.map((section) => (
            <div key={section._id} className="list-item list-item-row">
              <Link
                to={`/tests/${testId}/sections/${section._id}`}
                className="list-item list-item-link"
              >
                <div className="list-item-title">{section.name}</div>
                {section.order_index != null && (
                  <div className="list-item-subtitle">Order: {section.order_index}</div>
                )}
              </Link>
              <button
                type="button"
                className="btn btn-danger"
                onClick={(e) => handleDeleteSection(e, section._id)}
                disabled={deletingId === section._id}
              >
                {deletingId === section._id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default TestDetailPage
