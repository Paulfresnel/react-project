import logo from './logo.svg';
import './App.css';
import APICall from './components/APICall';
import { Routes, Route} from "react-router-dom"
import HomePage from './components/HomePage/HomePage';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
    <Header/>
    <Routes>
      <Route path={"/"} element={<HomePage/>}/>
      <Route path={"/list"} element={<APICall/>}/>
    </Routes>
    </div>
  );
}

export default App;
