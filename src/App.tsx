import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Form from './Components/Form';
import './App.css';
import Admin from './Components/Admin';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Form />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
