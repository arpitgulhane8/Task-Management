import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './pages/Auth';
import NotFound from './pages/Notfound';
import Register from './components/Register';
import Login from './components/Login';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { lazy, Suspense } from 'react';
import Loading from './components/Loading';
import SharedTask from './pages/SharedTask';

// Lazy loading components
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Board = lazy(() => import('./components/Board'));
const Analytics = lazy(() => import('./components/Analytics'));
const Settings = lazy(() => import('./components/Settings'));

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const loading = useSelector((state) => state.task.loading || state.auth.loading);

  
  return (
    <div className="App">
      {loading && <Loading/>}
      <Router>
        <Suspense fallback={<Loading/>}>
          <Routes>
            <Route path="/" element={<Navigate to="/auth" replace />} /> {/* Redirect to /auth by default */}
            <Route path="/auth" element={<Auth/>} >
              <Route index element={<Navigate to="register" replace />} /> 
              <Route path='register' element={<Register />} />
              <Route path='login' element={<Login />} />
            </Route>

            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />}>
              <Route index element={<Navigate to="board" replace />} />
              <Route path="board" element={<Board />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="/sharedTask/:id" element={<SharedTask/>}/>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer position="top-right" hideProgressBar={false} />
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
