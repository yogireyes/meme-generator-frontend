import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Editor from './pages/Editor';
import Api from './pages/Api';
import Gallery from './pages/Gallery';


const UnauthenticatedRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, [auth]);

  if (isAuthenticated === null) {
    // Still waiting for authentication state, render a loading spinner or message
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Navigate to="/" replace={true} /> : element;
};

const AuthenticatedRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, [auth]);

  if (isAuthenticated === null) {
    // Still waiting for authentication state, render a loading spinner or message
    return <div>Loading...</div>;
  }

  return isAuthenticated ? element : <Navigate to="/login" replace={true} />;
};

function App() {
  return (
    <Routes>
      {/* Routes accessible only to unauthenticated users */}
      <Route path="/login" element={<UnauthenticatedRoute element={<Login />} />} />
      <Route path="/register" element={<UnauthenticatedRoute element={<Register />} />} />

      {/* Routes accessible only to authenticated users */}
      <Route path="/" element={<AuthenticatedRoute element={<Home />} />} />
      <Route path="/editor" element={<AuthenticatedRoute element={<Editor />} />} />
      <Route path="/api" element={<AuthenticatedRoute element={<Api />} />} />
      <Route path="/gallery" element={<AuthenticatedRoute element={<Gallery />} />} />

      {/* Redirect unauthenticated users to the login page */}
      <Route path="/*" element={<Navigate to="/login" replace={true} />} />
    </Routes>
  );
}

export default App;