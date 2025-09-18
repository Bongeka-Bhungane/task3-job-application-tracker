import './App.css'
import SignupPage from './pages/SignupPage.jsx'
import LoginPage from './pages/LoginPage.tsx'
import HomePage from './pages/HomePage.tsx'
import JobLists from './pages/JobLists.tsx'
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
          <Route path='/jobs' element={<JobLists />} />
        </Routes>
      </Router>
    </div>
    </>
  )
}

export default App
