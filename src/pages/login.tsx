import React, { useState, useEffect } from 'react'
import styles from '@/styles/Settings.module.scss';
import Link from 'next/link';
import { loginUserManual, resetPassword } from '@/Utils/firebaseUser';

const LoginPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handleFormSubmission = (e: any) => {
    e.preventDefault();
    loginUserManual({ email, password });
  }
  return (
    <div className={`${styles.settingsPage} ${styles.authPage}`}>
      <div className={styles.logo}>
        <img src="/images/logo.svg" alt="logo" />
        <p>Your Personal Streaming Oasis</p>
      </div>
      <div className={styles.settings}>
        <h1>Login</h1>
        <div className={styles.group2}>
          <>
            <label htmlFor="email">Email</label>
            <input type="email" id='email' value={email} onChange={(e: any) => setEmail(e.target.value)} required />
            <label htmlFor="password">Password</label>
            <input type="password" id='password' value={password} onChange={(e: any) => setPassword(e.target.value)} required />
            <button onClick={handleFormSubmission}>submit</button>
          </>
        </div>
        <h4>Become Rive member! <Link href="/signup" className={styles.highlight}>Signup</Link></h4>
        <h4 onClick={()=>resetPassword(email)}>Forgot Password?</h4>
      </div>
    </div >
  )
}

export default LoginPage;