import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import RegisterAdmin from './Component/RegisterAdmin.jsx'
import Login from './Component/Login.jsx'

import AdminNavbar from './Admin/AdminNavbar.jsx'
import StudentAC from './Admin/StudentAC.jsx'
import FacultyAC from './Admin/FacultyAC.jsx'
import Course from './Admin/Course.jsx'
import Department from './Admin/Department.jsx'
import { DataProvider } from './Store/DeptData-store.jsx'
import Dashboard from './Admin/Dashboard.jsx'
import StudentNavbar from './Student/StudentNavbar.jsx'
import FacultyNavbar from './Faculty/FacultNavbar.jsx'
import SearchStudent from './Student/SearchStudent.jsx'
import { AuthProvider } from './Store/AuthContex.jsx'
import Enrollment from './Admin/Enrollment.jsx'
import Courses from './Student/Courses.jsx'

const router = createBrowserRouter([
  {
    path: '/registeradmin',
    element: <RegisterAdmin />
  },
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/admin',
    element: <><DataProvider><AdminNavbar />,<Outlet /></DataProvider> </>,
    children: [
      {
        path: '/admin/student',
        element: <StudentAC />
      },
      {
        path: '/admin/faculty',
        element: <FacultyAC />
      },
      {
        path: '/admin/dept',
        element: <Department />
      },
      {
        path: '/admin/courses',
        element: <Course />
      },
      {
        path: '/admin',
        element: <Dashboard />
      }
    ]
  },
  {
    path: '/student',
    element: <><StudentNavbar />, <Outlet /></>,
    children: [
      {
        path:'/student',
        element:<Courses/>
      },
      {
        path: '/student/searchOtherStudent',
        element: <SearchStudent />
      }
    ]
  },
  {
    path: '/faculty',
    element: <FacultyNavbar />
  },
]);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
