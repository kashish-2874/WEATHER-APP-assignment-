import { Routes, Route, Navigate } from 'react-router-dom';
import Default from './Components/Default';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Result from './Components/Result';
import './App.css';

const ProtectedRoute = ({ element, isProtected }) => {
  const token = JSON.parse(localStorage.getItem('login'))?.token;
  const isAuthenticated = token !== undefined;

  // If user is authenticated
  if (isAuthenticated) {
    // If the user tries to access the Result page, allow access
    if (isProtected) {
      return element;
    }
    // If the user tries to access any other route, redirect to Result
    return <Navigate to="/Result" />;
  }

  // If user is not authenticated and tries to access a protected route
  if (isProtected && !isAuthenticated) {
    return <Navigate to="/" />;
  }

  // For non-protected routes, allow access
  return element;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute element={<Default />} isProtected={false} />} />
      <Route path="/Signup" element={<ProtectedRoute element={<Signup />} isProtected={false} />} />
      <Route path="/Login" element={<ProtectedRoute element={<Login />} isProtected={false} />} />
      <Route path="/Result" element={<ProtectedRoute element={<Result />} isProtected={true} />} />
    </Routes>
  );
}

export default App;