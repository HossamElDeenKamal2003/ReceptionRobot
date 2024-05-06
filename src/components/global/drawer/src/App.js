import React from 'react';
import './App.css';
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/newComponent/Navbar (3).jsx';
import "./index.css"
function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route path='/' element = {<Home/>}/>
      <Route path='/training' element = {<Navbar/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
