import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config.js";
import AuthForm from '../components/AuthForm';
import NavbarDefault from '../components/NavbarDefault';

function Register() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState(null);

  const registerSubmit = async (data) => {
    try {
      const { email, password } = data;
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      if (error.code === 'auth/weak-password') {
        setAuthError('Password should be at least 6 characters');
      } else if (error.code === 'auth/email-already-in-use') {
        setAuthError('Email already in use');
      } else {
        setAuthError(error.message);
        console.error('Error registering in:', error.message);
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
                <h3 className="text-center mb-0">Create an account</h3>
                <hr className="text-muted w-25 mx-auto" />
              <AuthForm
                onSubmit={registerSubmit}
                errors={{}}
                authError={authError}
                buttonText="Register"
                linkText="Already have an account?"
                linkTo="/login"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;