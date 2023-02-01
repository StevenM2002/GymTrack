import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/sessions' element={<SessionsPage />} />
        <Route path='/exercises/:sessionId/:sessionNum/:sessionDate' element={<ExercisesPage />} />
        <Route path='/sets-and-reps/:exerciseId/:exercise/:weight' element={<SetReps />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
