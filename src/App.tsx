import { Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Shell } from './components/Shell'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { RoadmapPage } from './pages/RoadmapPage'
import { RoadmapsPage } from './pages/RoadmapsPage'
import { StudioEditorPage } from './pages/StudioEditorPage'
import { StudioPage } from './pages/StudioPage'
import { TopicPage } from './pages/TopicPage'

const router = createBrowserRouter([
  {
    element: <Shell />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/roadmaps', element: <RoadmapsPage /> },
      { path: '/roadmaps/:roadmapSlug', element: <RoadmapPage /> },
      { path: '/roadmaps/:roadmapSlug/topics/:topicId', element: <TopicPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/admin', element: <StudioPage /> },
          { path: '/admin/:roadmapSlug/:topicId', element: <StudioEditorPage /> },
          { path: '/studio', element: <StudioPage /> },
          { path: '/studio/:roadmapSlug/:topicId', element: <StudioEditorPage /> },
        ],
      },
      { path: '/roadmap', element: <Navigate to="/roadmaps/system-design" replace /> },
      { path: '/phase/:phaseId', element: <Navigate to="/roadmaps/system-design" replace /> },
      { path: '/topic/:topicId', element: <Navigate to="/roadmaps/system-design" replace /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}
