import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/layout.css'

const Layout = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>Test Dashboard</h1>
          {user && <p style={{ fontSize: '0.8rem', color: '#95a5a6' }}>{user.name || user.email || user.mobile}</p>}
        </div>
        <nav>
          <ul className="sidebar-nav">
            <li>
              <NavLink to="/tests" end>Tests</NavLink>
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
