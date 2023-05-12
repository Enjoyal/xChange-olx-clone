import './App.css';
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/Header';
import Register from './components/register/Register';
import Login from './components/login/Login';
import { useEffect, useState } from 'react';
import Sellpage from './components/sell-page/Sellpage';
import Viewpost from './components/viewpost/Viewpost';
import Chats from './components/chats/Chats';

function App() {
  const [backendData,setBackendData] =useState([{}])

  useEffect(()=>{
    fetch('http://localhost:4000/api').then(
      res=> res.json()
    ).then(
        result=>{
          setBackendData(result)
        }
    )
  },[])
  console.log(backendData,'backendData#');
  return (
    <div className="App">
      <header className="App-header">
      </header>

      <Routes>
        <Route  path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/sellpage' element={<Sellpage/>}/>
        <Route path='/viewpost/:id' element={<Viewpost/>}/>
        <Route path='/chats/:id' element={<Chats/>}/>
        
      </Routes>


    </div>
  );
}

export default App;
