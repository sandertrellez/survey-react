import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import ShowSurvey from './components/ShowSurveys';
import FormLogin from './components/FormLogin';
import SurveyProvider from './contexts/SurveyContext';

function App() {
  return (
    <SurveyProvider>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<ShowSurvey></ShowSurvey>}></Route>
        <Route path='/login' element={<FormLogin></FormLogin>}></Route>
        </Routes>
      </BrowserRouter>
    </SurveyProvider>    
  );
}

export default App;
