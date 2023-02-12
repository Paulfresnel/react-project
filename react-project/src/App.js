import logo from './logo.svg';

import './App.css';
import APICall from './components/APICall';
import { Routes, Route} from "react-router-dom"
import HomePage from './components/HomePage/HomePage';
import Header from './components/Header/Header';
import AddSouvenir from './components/AddSouvenir/AddSouvenir';
import SouvenirList from './components/SouvenirList/SouvenirList';
import CreateAlbum from './components/CreatAlbum/CreateAlbum';

function App() {
  return (
    <div className="App">
    <Header/>
    <Routes>
      <Route path={"/"} element={<HomePage/>}/>
      <Route path={"/list"} element={<APICall/>}/>
      <Route path={"/souvenirs"} element={<SouvenirList/>}/>
      <Route path={"/souvenirs/create"} element={<AddSouvenir/>}/>
      <Route path={"/albums/create"} element={<CreateAlbum/>}/>
      <Route path={"/albums/:albumId"} element={<undefined/>}/>
    </Routes>
    </div>
  );
}

export default App;
