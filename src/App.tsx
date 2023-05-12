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
  return (
    <div>
      <ToastContainer />
      <Routes>
        {/* Home/Profile Page */}
        <Route path="/" element={!user ? (<Navigate to={'/login'} />) : (<ProfilePage user={user} />)}></Route>

        {/* Authorization Pages */}
        <Route path='/login'
          element={
            user ?
              (< Navigate replace to="/" />) :
              (< SignInPage />)
          }
        />
        <Route path='/register'
          element={
            user ?
              (< Navigate replace to="/" />) :
              (< SignUpPage />)
          }
        />
      </Routes>
    </div>
  );
}

export default App;
