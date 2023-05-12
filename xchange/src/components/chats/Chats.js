import React, { useEffect, useId, useState } from 'react'
import { io } from 'socket.io-client';
import './Chats.css'
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Header from '../Header';
import { useNavigate, useParams } from 'react-router';
import { type } from '@testing-library/user-event/dist/type';
import { Link } from 'react-router-dom';

//socket
const SOCKET_URL ='http://localhost:4000'
const socket = io(SOCKET_URL);


function Chats() {
  
  const [uname,setUname]=useState('')
  const [userId,setUserId]=useState('')
  const history=useNavigate()


  const [fname,setFname]=useState('')
  const [members,setMembers]=useState('')
  const [currentRoom,setCurrentRoom]=useState('')
  const [notifications, setNotifications]=useState('')
  const [receiveName,setReceiverName]= useState('');

  const urlParams=useParams()
  console.log(urlParams.id,'#ChatId');

  const [message, setMessage] = useState('');
  const [messages,setMessages] = useState('');


  // const [rooms, setRooms] = useState([]);
  // const [currentRoom, setCurrentRoom] = useState('');
  // const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  // const [newMessages, setNewMessages] = useState({});
  // var messages;

  // const handleMembers=()=>{
   

  // }

  const joinRoom=(roomId)=>{
    if (!userId) {
      return alert('please login first!')
    }


    socket.emit('join_room',roomId);
    setCurrentRoom(roomId)

    socket.off('notifications').on('notifications', (res)=>{
      setNotifications(res);
    })
    

  }

  useEffect(()=>{
    setUserId(localStorage.getItem('userId'));
    setUname(localStorage.getItem('currentuser'));
    setFname(localStorage.getItem('fullname'));
    setReceiverName(localStorage.getItem('currentMemberName'));
    // handleMembers();
    setCurrentRoom(urlParams.id);

    socket.emit('getMembers');
    socket.emit('load_messages',urlParams.id);
      
  

  },[]);
  console.log(currentRoom,'#currentMember');


  socket.off('getMembers').on('getMembers', (res)=>{
    setMembers(res.filter(item=>(
      item.receiver==userId || item.sender==userId)));
  })
  console.log(members,'members#');

  socket.off('room_messages').on('room_messages', (res)=>{
    setMessages(res)
    // setMessages(res.filter(msg=>(
    //   (msg?.to==currentRoom && msg?.from==userId) || (msg?.to==userId.id && msg?.from==currentRoom)
    // )))
    
  })
  console.log(messages,'Messages#');


  // function joinRoom(room, isPublic = true) {
  //   if (!userId) {
  //       return alert("Please login");
  //   }
  //   socket.emit("join-room", room, currentRoom);
  //   setCurrentRoom(room);
  // }
  // const date = new Date();

  // console.log(date.getMonth());

  function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();

    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;

    let day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;

    return day + "/" + month + "/" + year;
}


  // const loadChats=(e)=>{
  //   e.preventDefault();

  //   setCurrentRoom(e);

  // }


  const handleMessage=(e)=>{
    e.preventDefault();
    if(!message) return;

    const today= new Date();
    const todayDate= getFormattedDate();
    let minutes= today.getMinutes() < 10  ? '0' + today.getMinutes() : today.getMinutes();
    let time= today.getHours() + ':' + minutes;
    // setCurrentRoom(urlParams.id);
    const roomId= urlParams.id;
    socket.emit('message_room', roomId, message, userId, fname, time, todayDate);
    setMessage('');
  }




  return (
    <div>
      <Header/>
        <div className='row chats_section mt-5 pt-5'>
            <div className='col-3 sideBar bg-info text-light'>
              <div className='members p-2 mt-2 '>

              {members && members?.map((member)=>(
                <ListGroup as="ol" className='mt-3 ms-2' >
                  {/* {  member.sender==userId? */}
                    <Link className='text-decoration-none' to={member.sender===userId? '/chats/'+member.receiver : '/chats/'+member.sender}>
                    <ListGroup.Item 
                    onClick={(e)=>{joinRoom(member.receiver)}}
                    active={member.receiver==currentRoom}
                    as="li"
                    className="member_container d-flex  rounded justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{member.sender === userId ? member.receiverName : member.senderName }</div>
                      Online
                    </div>
                    { currentRoom!==member._id &&
                      <Badge bg="primary" pill>
                      {notifications}
                    </Badge>}
                  </ListGroup.Item>
                   </Link>
                  {/* :''} */}
                </ListGroup>
                ))}
              </div>
            </div>

           
            <div className='col-9 chats_container'>

                <div className='msg-header ' style={{height:'50px'}}>
                </div>

               
                
              <div className='chats border-primary rounded p-4' style={{height:'500px',overflowY:'scroll'}}>

            {messages==''? <div style={{margin:'0 auto', width:'150px'}} className='alert alert-info text-center rounded my-4'>No messages yet..!</div>:''}

                  
                { messages && messages?.map((message)=>(

                <div>
                  {message._id!==null && <div style={{margin:'0 auto', width:'150px'}} className='alert alert-info text-center rounded my-4'> <span>{message._id}</span></div>}
                  
                  { message.messagesByDate?.map((msg)=>(
                  <div>
                  {(msg.to==urlParams.id && msg.from==userId)?
                    <div className='outmsg mt-3' style={{textAlign:'end'}}>
                    <span className='bg-info fs-4 rounded px-3 py-2 text-white'>{msg.content} <small className='text-secondary fs-5 mt-2'>{msg.time}</small> </span>
                    </div>
                  
                  :''
                    }

                  
                   { (msg.from==urlParams.id && msg.to==userId)?
                     <div className='inmsg mt-3'>
                    <span className=' bg-primary fs-4 rounded text-white px-3 py-2 mt-3'>{msg.content} <small className='text-secondary fs-5 mt-2'>{msg.time}</small> </span>
                    </div> 
                    :''}
                  </div>
                  ))}     

                </div>

                ))}
              </div>
                

                <div className='input-group pe-5 ps-2 mt-3'>
                    <input type='text' 
                     value={message}
                     onChange={(e)=>{setMessage(e.target.value)}}
                     placeholder='Type your messege here...'
                     className='bg-white p-2 form-control border border-primary rounded'>
                    </input>
                    <button 
                        onClick={handleMessage}
                        className='btn btn-primary rounded ms-2 '><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                        </svg>
                    </button>
                </div>
            </div>
            

        </div>
    </div>
  )
}

export default Chats