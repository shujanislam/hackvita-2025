import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';
import Landing from './pages/Landing';
import { useUser } from './context/user.context';
import Course from './pages/Course';


function App() {
  const userContext = useUser();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleChangeLoading = () => {
      setLoading(false)
    }

    if (userContext?.loading) {
      setLoading(true);
    } else {
      const timeout = setTimeout(handleChangeLoading, 2000); 
      return () => clearTimeout(timeout);
    }
  }
  , [userContext?.loading]);

  useEffect(() => {
    if (userContext?.user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [userContext?.user]);

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Profile /> : <Landing />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/course" element={<Course />} />
      </Routes>
    </Router>
  </>
  )
}

export default App
