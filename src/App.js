import { Route, Routes } from 'react-router-dom';
import Apps from './views/Apps';
import Games from './views/Games';
import DefaultLayout from './components/DefaultLayout';
import Websites from './views/Websites';
import Home from './views/Home';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<DefaultLayout />}>
          <Route index element={<Home />}/>
          <Route path='apps' element={<Apps />}/>
          <Route path='games' element={<Games />}/>  
          <Route path='websites' element={<Websites />}/>  
        </Route>
      </Routes>
    </>
  );
}

export default App;
