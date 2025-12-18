import React from 'react';
import styles from './Login.module.css'; 
import Link from 'next/link';

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Form Section */}
        <div className={styles.formSection}>
          <h1 className={styles.title}>Welcome Back</h1>
          <form className={styles.loginForm}>
            
            {/* Username */}
            <div className={styles.inputField}>
              <label htmlFor="email">Email</label>
              <input 
                type="text" 
                id="email" 
                placeholder="Enter your email" 
                className={styles.input} 
              />
            </div>

            {/* Password */}
            <div className={styles.inputField}>
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="Enter your password" 
                className={styles.input} 
              />
            </div>

            {/* Login Button */}
            <button type="submit" className={styles.loginButton}>
              Login <span className={styles.arrow}>→</span>
            </button>
            
            {/* Signup Link */}
            <p className={styles.signupText}>
              Don’t have an account? <Link href="/signup" className={styles.signupLink}>Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
