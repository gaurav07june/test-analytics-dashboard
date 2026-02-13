import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getTests, deleteTest } from '../api/testApi'
import '../styles/list.css'
import '../styles/form.css'

const TestsPage = () => {
  const [tests, setTests] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)

  const fetchTests = async () => {
    try {
      const res = await getTests()
      setTests(res.data?.data ?? res.data ?? [])
    } catch (err) {
      setTests([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTests()
  }, [])

  const handleDelete = async (e, id) => {
    e.preventDefault()
    e.stopPropagation()
    setDeletingId(id)
    try {
      await deleteTest(id)
      setTests((prev) => prev.filter((t) => t._id !== id))
    } catch (err) {
      fetchTests()
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) return <div className="loading">Loading tests...</div>

  return (
    <>
      <div className="page-header">
        <h2>Tests</h2>
        <Link to="/tests/add" className="btn btn-primary">Add Test</Link>
      </div>
      <div className="list-card">
        {tests.length === 0 ? (
          <div className="empty-state">
            <p>No tests yet.</p>
            <Link to="/tests/add" className="btn btn-primary">Add Test</Link>
          </div>
        ) : (
          tests.map((test) => (
            <div key={test._id} className="list-item list-item-row">
              <Link to={`/tests/${test._id}`} className="list-item list-item-link">
                <div className="list-item-title">{test.title}</div>
                {test.description && (
                  <div className="list-item-subtitle">{test.description}</div>
                )}
              </Link>
              <button
                type="button"
                className="btn btn-danger"
                onClick={(e) => handleDelete(e, test._id)}
                disabled={deletingId === test._id}
              >
                {deletingId === test._id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default TestsPage
