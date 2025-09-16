import React from 'react'
import AppRoutes from './routes'
import MainLayout from './components/layout/MainLayout'
import './index.css'

function App() {
  return (
    <MainLayout>
      <AppRoutes />
    </MainLayout>
  )
}

export default App
