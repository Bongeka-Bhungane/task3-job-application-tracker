import './App.css'
import SignupPage from './pages/SignupPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import HomePage from './pages/HomePage.tsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {

  return (
    <>
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/' element={<SignupPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/home' element={<HomePage />} />
        </Routes>
      </Router>
    </div>
    </>
  )
}

export default App
