import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './redux/user/user.selectors';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  const user = useSelector(selectCurrentUser)
  const userLoggedIn = localStorage.getItem('API_TOKEN') && user?.email
  return (
    <div className='max-w-7xl flex'>
      <ToastContainer />
      <Routes>
        {/* Home/Profile Page */}
        <Route path="/" element={!userLoggedIn ? (<Navigate to={'/login'} />) : (<ProfilePage user={user} />)}></Route>

        {/* Authorization Pages */}
        <Route path='/login'
          element={
            userLoggedIn ?
              (< Navigate replace to="/" />) :
              (< SignInPage />)
          }
        />
        <Route path='/register'
          element={
            userLoggedIn ?
              (< Navigate replace to="/" />) :
              (< SignUpPage />)
          }
        />
      </Routes>
    </div>
  );
}

export default App;
