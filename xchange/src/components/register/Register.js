import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Register.css'

function Register() {
  const history=useNavigate()
  const [uname,setUsername]=useState('')
  const [fname,setFullname]=useState('')
  const [phone,setPhone]=useState('')
  const [pswd,setPassword]=useState('')
  const data={
    uname,
    fname,
    phone,
    pswd
  }
  

  // const handleSignup=(e)=>{
  //   e.preventDefault()
  //   console.log(uname);
  //   register();
  // }

  const register=async(e)=>{
    e.preventDefault()
    try{
    const result =await axios.post('http://localhost:4000/register',data);
    console.log(result.data);
    alert(result.data.message)
    history('/login')
    }

    catch{
      alert('User already registered!');

    }
   
  }

  return (
    <div className='row mt-4' >
        <div className='col-4'></div>

        <div className='col-xl-4 px-5 pb-4' >
         <div className="card card-body mt-5 p-4 " >
           <div className='text-center'> <h4>Register</h4></div>
         <form className='mt-2'>
          <label htmlFor="fname">Full Name</label>
          <br /> 
          <input
            className="input form-control"
            type="text"
            value={fname}
            onChange={(e)=>setFullname(e.target.value)}
            id="fname"
            name="name"
            // defaultValue="enjoyal"
          />
          <br />
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
          <label htmlFor="phno">Phone</label>
          <br />
          <input
            className="input form-control"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}

            id="phno"
            name="phone"
            // defaultValue="1234455"
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
          <button onClick={register} className='btn btn-primary '>Signup</button>
          </div>
        </form>
       <Link to={`/login`}>  <a className='mt-3'>Login</a></Link>
      </div>
      </div>
      <div className='col-4'></div>

    </div>
  )
}

export default Register