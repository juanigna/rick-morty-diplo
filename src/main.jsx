import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import Intro from './components/Intro.jsx'
import Navbar from './components/Navbar.jsx'
import Characters from './components/Characters.jsx'
import Contact from './components/Contact.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Intro />
  },
  {
    path: '/characters',
    Component: Navbar,
    children: [
      {
        index: true,
        Component: Characters
      }
    ]
  },
  {
    path: '/contact',
    Component: Navbar,
    children: [
      {
        index: true,
        Component: Contact
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
