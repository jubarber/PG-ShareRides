<<<<<<< HEAD
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import LandingPage from './components/LandingPage';

=======
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import { Home } from "./components/Home";
>>>>>>> develop

function App() {

  return (
    <div className="App">
<<<<<<< HEAD
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element= { <LandingPage/> }/>
      </Routes>
    
    </BrowserRouter>
=======
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
>>>>>>> develop
    </div>
  );
}

export default App;
