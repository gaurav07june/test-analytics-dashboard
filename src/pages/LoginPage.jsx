import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { login as authLogin } from '../api/authApi'
import '../styles/form.css'

const LoginPage = () => {
  const [emailOrMobile, setEmailOrMobile] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { user, login } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/tests')
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const body = emailOrMobile.includes('@')
        ? { email: emailOrMobile, password }
        : { mobile: emailOrMobile, password }
      const res = await authLogin(body)
      const { user: userData, token } = res.data?.data ?? {}
      if (userData?.role !== 'admin') {
        setError('Not authorized')
        return
      }
      login(userData, token)
      navigate('/tests')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <form className="form-card" onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: '1.5rem' }}>Admin Login</h2>
        {error && <p className="error-msg">{error}</p>}
        <div className="form-group">
          <label>Email or Mobile</label>
          <input
            type="text"
            value={emailOrMobile}
            onChange={(e) => setEmailOrMobile(e.target.value)}
            placeholder="Enter email or mobile number"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default LoginPage
