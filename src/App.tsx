import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { userData } from './redux/store';
import ProfilePage from './pages/ProfilePage';
import AuthPage from './pages/AuthPage';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './redux/user/user.selectors';

function App() {
  const user = useSelector(selectCurrentUser)
  return (
    <div>
      <ToastContainer />
      <Routes>
        {/* Home/Profile Page */}
        <Route path="/" element={!user ? (<Navigate to={'/login'} />) : (<ProfilePage />)}></Route>

        {/* Authorization Page */}
        <Route path='/login'
          element={
            user ?
              (< Navigate replace to="/" />) :
              (< AuthPage />)
          }
        />
      </Routes>
    </div>
  );
}

export default App;
