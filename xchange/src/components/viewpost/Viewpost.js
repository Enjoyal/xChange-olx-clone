import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import './Viewpost.css'
import Carousel from 'react-bootstrap/Carousel';
import Header from '../Header';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';

//socket
const SOCKET_URL ='http://localhost:4000'
const socket = io(SOCKET_URL);


function Viewpost() {
    const [post,setPost]=useState({});
    const [currentUser, setcurrentUser]= useState('')

    const urlParams=useParams()
    console.log(urlParams.id,'postID#');

    const getPost= async()=>{
        try{
            const result= await axios.get('http://localhost:4000/getPosts');
      
            setcurrentUser(localStorage.getItem('userId'));

            setPost(result.data.posts.find(item=>(
                item._id==urlParams.id
            )))



        }
        catch(error){

        }
    }

    const getChats=async()=>{
      let currentUser=localStorage.getItem('userId');
      let senderName=localStorage.getItem('fullname');
      let receiverName=localStorage.getItem('currentMemberName');

      socket.emit('newUser',currentUser,post.Id,senderName,receiverName);


    }

    useEffect(()=>{
        getPost();
    },[])
    console.log(post,'ViewPost#');
    localStorage.setItem('currentMemberName',post.name);// saving current menber to localstorage





  return (
    <div>
    <Header></Header>  

    <div className="row mt-5 pt-5">
    <div className="col-8">
    <Carousel className='p-5 '>
    {post.images && post.images.map(image=>(
       
       <Carousel.Item >
        <img height={'500px'}
          className="d-block w-100"
          src={image? image : ''}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3 className='text-white'>{post.title}</h3>
          {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      
      ))
      }

      {/* <Carousel.Item>
        <img
          height={'500px'}
          className="d-block w-100"
          src={post.images? post.images[1] : ''}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3 className='text-white'>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item> */}
      {/* <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Third slide&bg=20232a"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3 className='text-white'>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item> */}
    </Carousel>
    <div className='description ps-5'>
        <h4 className='text-dark text-capitalize'>Description:</h4>
        <p>{post.description}</p>
    </div>
    </div>

    <div className="col-4 mt-5 pe-5">

      <div className="productDetails card p-3 mb-3">
        <h2 className=''>&#x20B9; {post.price} </h2>
        <h4 className='text-capitalize'>{post.title}</h4>
        <p className='text-dark'>{post.description? post.description.slice(0,50)+'..': ''}</p>
        <span className='text-dark'>{post.createdAt}</span>
      </div>

      <div className='chat-btn'>
        <Link to={'/chats/'+post.Id}> { post.Id !== currentUser ?<button onClick={getChats} className='btn btn-outline-primary form-control rounded'>Chat With Seller</button>: ''}</Link>
      </div>

      <div className="contactDetails card mt-3 p-3">
        <h3 className='text-capitalize'>Seller details:</h3>
        <h5 className='text-dark'>{post.name}</h5>
        <p className='text-dark'><i class='fa fa-phone'></i> *******90</p>
      </div>

    </div>
  </div> 
  </div>
   )
}

export default Viewpost