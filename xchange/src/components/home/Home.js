import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../Footer'
import Header from '../Header'
import './Home.css'

function Home() {

    const [posts,setPosts]=useState([])
    
    const getPosts=async()=>{
        try{
            const result=await axios.get('http://localhost:4000/getPosts')
           
            setPosts(result.data.posts);
        }
        catch{

        }
    }

    useEffect(()=>{
        getPosts();

    },[])
    

    console.log(posts,'Posts#');


  return (
    <div>
        <Header/>
        <section class="py-5 mt-5">
                <div class="container px-5 mt-5">
                    
                    <div class="card border-0 shadow rounded-3 overflow-hidden">
                        <div class="card-body p-0">
                            <div class="row gx-0">
                                <div class="col-lg-6 col-xl-5 py-lg-5">
                                    <div class="p-4 p-md-5">
                                        <div class="badge bg-primary bg-gradient rounded-pill mb-2"></div>
                                        <div class="h2 fw-bolder"><h1 class="mb-4">Your Exchange</h1></div>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique delectus ab doloremque, qui doloribus ea officiis...</p>
                                        <a class="stretched-link text-decoration-none" href="#!">
                                            <i class="bi bi-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-xl-7"><div class="bg-featured-blog" style={{backgroundImage: "url('https://dummyimage.com/700x350/343a40/6c757d')"}}></div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="py-5">
                <div class="container px-5">
                    <h2 class="fw-bolder fs-5 mb-4">Fresh Recommendations</h2>
                    <div class="row row-cols-4 gx-5">
                        {   posts.map(item=>(
                            <div class="col mb-5">
                            <Link className='text-decoration-none' to={`viewpost/${item._id}`}>
                            <div class="card h-100 shadow border-0">
                                <div className='img=container p-4'>
                                   <img width={'300px'} height={'150px'} class="card-img-top  card_img " src={item.images? item.images[0] :''} alt="..."/>
                                </div>
                                <div class="card-body p-4">
                                    <div class="badge bg-primary bg-gradient rounded-pill mb-2">New</div>

                                        <h5 className="text-dark text-start mb-3">{item.title}</h5>
                                    <p class="card-text mb-0">{item.description.slice(0,50)+'..'}</p>
                                    <span>{item.price}</span>
                                </div>
                                <div class="card-footer p-4 pt-0 bg-transparent border-top-0">
                                    <div class="d-flex align-items-end justify-content-between">
                                        <div class="d-flex align-items-center">
                                            <img class="rounded-circle me-3" src="https://dummyimage.com/40x40/ced4da/6c757d" alt="..." />
                                            <div class="small">
                                                <div class="fw-bold">{item.name}</div>
                                                <div class="text-muted">{item.createdAt}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </Link>
                        </div>
                        ))
                         } 
                    </div>
                    <div class="text-end mb-5 mb-xl-0">
                        <a class="text-decoration-none" href="#!">
                            More stories
                            <i class="bi bi-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </section>

        <Footer/>
    </div>
  )
}

export default Home