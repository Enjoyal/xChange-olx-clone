import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import NavDropdown from 'react-bootstrap/NavDropdown';



function Header() {
  const [username,setUsername]=useState('');
  const [fullname,setFullname]=useState('');

  useEffect(()=>{
    setUsername(localStorage.getItem('currentuser'))
    setFullname(localStorage.getItem('fullname'))
  })

  const logout=()=>{
    localStorage.removeItem('currentuser');
    localStorage.removeItem('fullname');
    localStorage.removeItem('token');
  }
  


  return (
    <div className='header'>

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container px-5">
            <a href='/' className="navbar-brand text-lowercase" >x<span className='text-capitalize'>Change</span> </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
            <div className='collapse navbar-collapse' id="navbarSupportedContent">
                <ul className="navbar-nav ms-5 mb-2 mb-lg-0">
                   <Link className='text-decoration-none' to={`/`} > <li className="nav-item "><a className="nav-link " >Home</a></li></Link>
                    <Link to={`/about`} className='text-decoration-none' >   <li className="nav-item"><a className="nav-link" href="">About</a></li></Link>
                    <Link to={`/chats/0`} className='text-decoration-none' > <li className="nav-item"> <a  className="nav-link text-dark bg-light rounded-pill" >chats <i class="fa-solid fa-message"></i></a> </li> </Link>


            
              { username?
            <NavDropdown title={fullname} id="basic-nav-dropdown" style={{marginLeft:'400px'}}>
              <NavDropdown.Item href="/profile" >My Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout} href="/">Logout </NavDropdown.Item>
            </NavDropdown>
            :
            <NavDropdown title="Login/Register" id="basic-nav-dropdown">
              <NavDropdown.Item href="/login" >Login</NavDropdown.Item>
              <NavDropdown.Item href="/register">Register </NavDropdown.Item>
            </NavDropdown>
            }
                    
                    <li className="nav-item ">
                      <Link to={`sellpage`} >  <a  className="btn btn-light rounded-pill" role="button" >+ Sell</a></Link>

                       
                    </li>
                   
                </ul>
            </div>
        </div>
    </nav>
        
    </div>
  )
}

export default Header