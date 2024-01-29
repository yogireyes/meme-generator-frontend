import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import useProgress from '../hooks/useProgress';


function NavbarDefault() {
  const navigate = useNavigate();
  const progressValue = useProgress();
  const auth = getAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  return (
    <>
      <div className="progress" role="progressbar">
        <div className="progress-bar" style={{ width: `${progressValue}%` }}></div>
      </div>

      <div className="container">
        {isAuthenticated ?
          <nav className="navbar bg-body rounded d-flex justify-content-between shadow-sm px-4">
            <div></div>
            <Link to="/" className="navbar-brand fw-bold text-muted">Meme Generator</Link>
            <div>
              <Link to="/" className="text-muted me-2">Dashboard</Link>
              <Link to="/gallery" className="text-muted me-2">Gallery</Link>
              <Link to="/api" className="text-muted me-2"><i className="fas fa-database"></i></Link>
              <span onClick={handleLogout} className="text-muted logout"><i className="fas fa-sign-out-alt"></i></span>
            </div>
          </nav>
          :
          <nav className="navbar bg-body rounded d-flex justify-content-center shadow-sm px-4">
            <Link to="/" className="navbar-brand fw-bold text-muted">Meme Generator</Link>
          </nav>
        }
      </div>
    </>
  );
}

export default NavbarDefault;