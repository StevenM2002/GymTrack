import './App.css';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './LoginPage/LoginPage';
import { SignupPage } from './SignupPage/SignupPage';
import { SessionsPage } from './SessionsPage/SessionsPage';
import ExercisesPage from './ExercisesPage.tsx/ExercisesPage';
import SetReps from './SetReps/SetReps';

export function getCookie(key: string) {
  const match = document.cookie.match(new RegExp('(^| )' + key + '=([^;]+)'));
  if (match) {
    return match[2];
  }
  else {
       console.log('--something went wrong---');
  }
}

function App() {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/GymTrack' element={<LoginPage />} />
        <Route path='/GymTrack/login' element={<LoginPage />} />
        <Route path='/GymTrack/signup' element={<SignupPage />} />
        <Route path='/GymTrack/sessions' element={<SessionsPage />} />
        <Route path='/GymTrack/exercises/:sessionId/:sessionNum/:sessionDate' element={<ExercisesPage />} />
        <Route path='/GymTrack/sets-and-reps/:exerciseId/:exercise/:weight' element={<SetReps />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
