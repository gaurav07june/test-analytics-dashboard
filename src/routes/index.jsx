import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Layout from '../components/Layout'
import LoginPage from '../pages/LoginPage'
import TestsPage from '../pages/TestsPage'
import AddTestPage from '../pages/AddTestPage'
import TestDetailPage from '../pages/TestDetailPage'
import AddSectionPage from '../pages/AddSectionPage'
import SectionDetailPage from '../pages/SectionDetailPage'
import AddQuestionPage from '../pages/AddQuestionPage'
import QuestionDetailPage from '../pages/QuestionDetailPage'

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return children
}

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }
    >
      <Route index element={<Navigate to="/tests" replace />} />
      <Route path="tests" element={<TestsPage />} />
      <Route path="tests/add" element={<AddTestPage />} />
      <Route path="tests/:testId" element={<TestDetailPage />} />
      <Route path="tests/:testId/sections/add" element={<AddSectionPage />} />
      <Route path="tests/:testId/sections/:sectionId" element={<SectionDetailPage />} />
      <Route
        path="tests/:testId/sections/:sectionId/questions/add"
        element={<AddQuestionPage />}
      />
      <Route
        path="tests/:testId/sections/:sectionId/questions/:questionId"
        element={<QuestionDetailPage />}
      />
    </Route>
    <Route path="*" element={<Navigate to="/tests" replace />} />
  </Routes>
)

export default AppRoutes
