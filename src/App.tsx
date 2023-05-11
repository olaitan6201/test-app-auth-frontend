import ReduxToastr from 'react-redux-toastr';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { userData } from './redux/store';
import ProfilePage from './pages/ProfilePage';
import AuthPage from './pages/AuthPage';

function App() {
  const user = userData ? userData?.user : null;
  return (
    <div>
      <Routes>
        {/* Home Page */}
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

      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="bottom-center"
        // getState={(state: any) => state.toastr} // This is the default
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick
      />
    </div>
  );
}

export default App;
