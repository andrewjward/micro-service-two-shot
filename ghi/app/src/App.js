import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import HatsList from './hatsList';
import CreateHat from './createHat';

function App() {
  return (
    <BrowserRouter>
      <Nav />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="hats" element={<HatsList/>} />
          <Route path="hats/new" element= {<CreateHat />} />
        </Routes>

    </BrowserRouter>
  );
}

export default App;
