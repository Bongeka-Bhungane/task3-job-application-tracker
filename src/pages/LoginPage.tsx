import React from 'react'
import LoginForm from '../compontents/LoginForm'

export default function LoginPage() {
  return (
    <div className='login-page-container'>
      <div className='login-content-left'>
        <LoginForm />
      </div>
      <div className='login-content-right'>
        right
      </div>
    </div>
  )
}
