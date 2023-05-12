import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { io, Socket } from 'socket.io-client'

const socket = io('http://localhost:4000');

function Login() {
  const history=useNavigate()
  const [data,setUserdata]=useState({})
  const [uname, setUsername]= useState('')
  // const [userId, setUserid]= useState('')

  const [pswd, setPassword]= useState('')
  
  useEffect(()=>{
    login();
  },[])
  
  const login=async(e)=>{
    try{
      e.preventDefault()
      const data={uname,pswd}
      const result=await axios.post('http://localhost:4000/login', data);
      console.log(result.data);
      alert(result.data.message);

      socket.emit('newUser')
      history('/');
      localStorage.setItem('currentuser',result.data.currentuser);
      localStorage.setItem('userId',result.data.userId);
      localStorage.setItem('fullname',result.data.fullname);
      localStorage.setItem('token',result.data.token);

    }

    catch(error){
      // alert('Login Failed!');
    }
  }


  return (

    <div className='row mt-4' >
    <div className='col-4'></div>
    <div className='col-xl-4 px-5 pb-4' >
    <div className="card card-body mt-5 p-4 " >
       <div className='text-center'> <h4>Login</h4></div>
    <form className='mt-2'>

      <label htmlFor="uname">Email</label>
      <br />
      <input
        className="input form-control"
        type="email"
        value={uname}
        onChange={(e)=>setUsername(e.target.value)}
        id="uname"
        name="email"
        // defaultValue="enjoyal"
      />
      <br />
      <label htmlFor="lname">Password</label>
      <br />
      <input
        className="input form-control"
        type="password"
        value={pswd}
        onChange={(e)=>setPassword(e.target.value)}
        id="pswd"
        name="password"
        // defaultValue="123"
      />
      <br />
      <br />
      <div className='text-center'>
      <button onClick={login} className='btn btn-primary '>Login</button>
      </div>
    </form>
   <Link to={`/register`}> <a className='mt-3'>Signup</a></Link>
  </div>
  </div>
  <div className='col-4'></div>

</div>
    )
}

export default Login