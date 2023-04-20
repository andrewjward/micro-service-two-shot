import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ShoeForm from "./ShoeForm";
import ShoeList from "./ShoeList";
import HatsList from "./hatsList";
import CreateHat from "./createHat";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route>
          <Route path="shoes" element={<ShoeList />} />
          <Route path="shoes/new" element={<ShoeForm />} />
        </Route>
      </Routes>
      <Routes>
        <Route path="hats" element={<HatsList />} />
        <Route path="hats/new" element={<CreateHat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
