import React from 'react';
import styles from './Signup.module.css'; 
import Link from 'next/link';

const Signup = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Form Section */}
        <div className={styles.formSection}>
          <h1 className={styles.title}>Create Account</h1>
          <form className={styles.signupForm}>
            
            {/* Username */}
            <div className={styles.inputField}>
              <label htmlFor="username">Username</label>
              <input 
                type="text" 
                id="username" 
                placeholder="Choose a username" 
                className={styles.input} 
              />
            </div>

            {/* Password */}
            <div className={styles.inputField}>
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Enter your email" 
                className={styles.input} 
              />
            </div>

            {/* Confirm Password */}
            <div className={styles.inputField}>
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="Enter your password" 
                className={styles.input} 
              />
            </div>

            {/* Terms */}
            <div className={styles.terms}>
              <input type="checkbox" id="agreeTerms" className={styles.checkbox} />
              <label htmlFor="agreeTerms" className={styles.termsLabel}>
                I agree to the <Link href="/terms" className={styles.link}>Terms of Service</Link> and <Link href="/privacy" className={styles.link}>Privacy Policy</Link>
              </label>
            </div>

            {/* Sign Up Button */}
            <button type="submit" className={styles.signupButton}>
              Sign up <span className={styles.arrow}>→</span>
            </button>
            
            {/* Login Link */}
            <p className={styles.loginText}>
              Already have an account? <Link href="/login" className={styles.loginLink}>Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
