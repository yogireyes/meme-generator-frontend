import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config.js";
import AuthForm from '../components/AuthForm';
import NavbarDefault from '../components/NavbarDefault';

function Login() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState(null);

  const loginSubmit = async (data) => {
    try {
      const { email, password } = data;
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setAuthError('User not found!');
      } else if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-login-credentials') {
        setAuthError('Invalid email or password!');
      } else {
        setAuthError(error.message);
        console.error('Error signing in:', error.message);
      }
    }
  };

  return (
    <>
      <NavbarDefault />
      <div className="container pt-5">
        <div className="row mt-5">
          <div className="col-md-6 mx-auto">
            <div className="card card-body">
                <h3 className="text-center mb-0">Login to continue</h3>
                <hr className="text-muted w-25 mx-auto" />
              <AuthForm
                onSubmit={loginSubmit}
                errors={{}}
                authError={authError}
                buttonText="Login"
                linkText="Don't have an account?"
                linkTo="/register"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;