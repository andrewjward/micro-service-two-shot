import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ShoeForm from "./ShoeForm";
import ShoeList from "./ShoeList";

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="shoes">
          <Route path="" element={<ShoeList shoes={props.shoes} />} />
          <Route path="new" element={<ShoeForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
