import { Route, Routes } from 'react-router-dom';
import Apps from './views/Apps';
import Games from './views/Games';
import DefaultLayout from './components/DefaultLayout';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<DefaultLayout />}>
          <Route path='apps' element={<Apps />}/>
          <Route path='games' element={<Games />}/>  
        </Route>
      </Routes>
    </>
  );
}

export default App;
