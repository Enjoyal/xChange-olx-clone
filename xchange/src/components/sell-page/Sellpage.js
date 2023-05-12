import axios from 'axios';
import { PickerOverlay } from 'filestack-react';
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router';
import Header from '../Header'
import './Sellpage.css'



function Sellpage() {
    const [Id,setId]=useState('')
    const [uname,setUname]=useState('')
    const [name,setName]=useState('');
    const [title,setTitle]=useState('');
    const [category,setCategory]=useState('');
    const [description,setDescription]=useState('');
    const [price,setPrice]=useState('');
    const [images,setImages]=useState('');
    // const [data,setSelldata]=useState({});
    const [isPicker,setPicker]=useState(false);

    const createdAt= new Date()
    const history=useNavigate()

    
    useEffect(()=>{
        setId(localStorage.getItem('userId'));
        setUname(localStorage.getItem('currentuser'))
        // setSelldata({uname,name,title,category,description,price,images,createdAt:createdAt.toDateString()})

    },[])
    // console.log(data);

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const data={Id,uname,name,title,category,description,price,images,createdAt:createdAt.toDateString()}
           
            const result= await axios.post('http://localhost:4000/sellCreate',data)
            console.log(result.data);
            alert(result.data.message);
            history('/')
        }
        catch(error){
            alert(error.result.data.message);
        }
    };

  return (
    <div>
        <Header/>

        <div className='row pt-5'>
            <div className='col-1'></div>
            <div className='col-xl-10 mt-5 p-5'>
                <Card className='card px-5 py-3 ' >
                    <form>
                    <h5 className='mb-3'>Your Details</h5>
                        <label>Name</label> 
                        <input
                        className='input form-control mb-3'
                        type='text'
                        id='title'
                        onChange={(e)=>setName(e.target.value)}
                        /> 

                        <label>Category</label> 
                        <input
                        className='input form-control mb-3'
                        type='text'
                        id='title'
                        onChange={(e)=>setCategory(e.target.value)}
                        />
                        
                        <label>Title</label> 
                        <input
                        className='input form-control mb-3'
                        type='text'
                        id='title'
                        onChange={(e)=>setTitle(e.target.value)}
                        />

                        <label>Description</label> 
                        <textarea rows={5}
                        className='input form-control mb-3'
                        type='text'
                        id='des'
                        onChange={(e)=>setDescription(e.target.value)}
                        />

                        
                        
                        <label>Price</label> 
                        <input
                        className='input form-control mb-3'
                        type='number'
                        id='title'
                        onChange={(e)=>setPrice(e.target.value)}
                        />
                        
                        { images? images.map(image=>(
    
                        <img width={200} className='preview-img  ms-3 rounded' alt='image' src={image}
                        onClick={()=>isPicker ? setPicker(false) : setPicker(true)}
                        ></img>
                        ))
                        : (
                        <button
                        onClick={()=>isPicker ? setPicker(false) : setPicker(true)}
                        className='choose-btn rounded  font-bold  mb-3'
                        type='button'
                        id='title'
                        // onChange={(e)=>setImage(e.target.files[0])}
                        >Choose Image</button>


                        )
                        }
                        <br/>
                        <div className='mt-5 file-picker'>
                       
                        {isPicker && (
                        <PickerOverlay
                        apikey={'Ar8xFAmFUTqmlNtcmtUBiz'}
                        onSuccess={(res) => {
                            console.log(res.filesUploaded.map(item=>item.url))
                            setImages(res.filesUploaded.map(item=>item.url));
                            setPicker(false);
                        }
                        }
                        onUploadDone={(res) => console.log(res)}
                        onError={(res)=> alert(res)}
                        pickerOptions={{
                            maxFiles: 3,
                            accept: ["image/*"],
                            errorsTimeout: 2000,
                            // maxSize: 1 * 1000 * 1000,
                          }}
                        />)
                        }
                        </div>

                    <button onClick={handleSubmit} className='btn mt-2'>Upload & Submit</button>
                    </form>
                
            </Card>
            </div>

            <div className='col-1'></div>


        </div>
    </div>
  )
}

export default Sellpage