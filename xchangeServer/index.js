
//import express
const express= require('express')

//creating application for express
const app=express()

//import cors
const cors=require('cors');

//import cookie parser
const cookieParser = require('cookie-parser');



//import dataservice
const dataService=require('./data/dataService')

const ws= require('ws');

const { connection } = require('mongoose');
const { User, Message, Chatmember } = require('./data/db');

//to parse json from req body
app.use(express.json())

//
app.use(cookieParser())


//Give command to share data via cors
app.use(cors({
    origin:['http://localhost:3000']
}))

// create port no
const server = app.listen(4000,()=>{
    console.log('Listening on port 4000');
})



//import socket.io
const io = require('socket.io')(server, {
    cors: {
      origin: 'http://localhost:3000',
    }
  });


  app.get('/rooms', (req,res)=>{
    res.json(rooms)
  })

  getLastMessagesFromRoom= async(room)=>{
    let roomMessages= await Message.aggregate([
        {$match: {to:room}},
        {$group: {_id:'$date', messagesByDate:{$push: '$$ROOT'}}}
    ])
    return roomMessages

  }

  sortRoomMessagesByDate=(messages)=>{
    console.log(messages);
    return messages.sort((a,b)=>{
        (parseInt(a.date?.split('/').reverse().join()) < parseInt(b.date?.split('/').reverse().join())) ? -1 : -1;
        // date1 = date1[2] + date1[1] + date1[0];
        // date2 = date2[2] + date2[1] + date2[0];

        // return date1 < date2 ? -1 : 1

    })

  }



//socket connection
    io.on('connection',(socket)=>{
        console.log('User connected');

        socket.on('newUser',async (sender,receiver,senderName,receiverName)=>{
            const members= await Chatmember.findOne({sender,receiver}).then(
                (result)=>{
                    console.log(sender,'#sender');
                    console.log(receiver,'#receiver');
                    console.log(senderName,'#senderName');
                    console.log(receiverName,'#reciverName');


                    if (!result) {
                        const newChatmember = Chatmember.create({sender,receiver,senderName,receiverName})

                    }else{
                        console.log('#members');
                    }

                   
                }
            )
            
        })
    
        //get all members added
        socket.on('getMembers',async ()=>{
            const members = Chatmember.find().then(
                (result)=>{
                    io.emit('getMembers', result)
                    console.log(result,'#Members');
                }
            )
        })

        socket.on('join_room', async(room)=>{
            socket.join(room);
            let roomMessages = await getLastMessagesFromRoom(room);
            roomMessages= sortRoomMessagesByDate(roomMessages);
            socket.emit('room_messages', roomMessages)
            // console.log(roomMessages);
        })

        socket.on('load_messages', async(room)=>{
            socket.join(room);
            let roomMessages = await getLastMessagesFromRoom(room);
            roomMessages= sortRoomMessagesByDate(roomMessages);
            socket.emit('room_messages', roomMessages)
        })


           

        socket.on('message_room', async(room, content, sender, author, time, date)=>{
            console.log(content, '#newMessage');
            console.log(room, '#cuurentRoom');
            
            const newMessage= await Message.create({content, from:sender, to:room, author, time, date})
            let roomMessages= await getLastMessagesFromRoom(room);
            // console.log(roomMessages);

            roomMessages=sortRoomMessagesByDate(roomMessages);
            io.emit('room_messages', roomMessages);
            
            console.log(roomMessages,'#messages');
            
            //sending msg to room
            socket.broadcast.emit('notifications', room)

        })


        

     

})





//API Calls
app.get('/api', (req,res)=>{
    res.json({'users':['user1', 'user2']})
})

//api reqst to for register
app.post('/register',(req,res)=>{
    console.log(req.body,'regData#');
    dataService.register(req.body.uname,req.body.fname,req.body.phone,req.body.pswd)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

//api reqst to for login
app.post('/login',(req,res)=>{
    console.log(req.body,'loginData#');
    dataService.login(req.body.uname,req.body.pswd).then(
    result=>{
        // jwt.sign({userId:result.userId,username:result.currentuser},'superkey2022', {},(err,token)=>{
        //     res.cookie('token',token, {sameSite:'none', secure:true}).json(result);

        // })

        res.status(result.statusCode).json(result);


    })
})

//api req to create sell
app.post('/sellCreate', (req,res)=>{
    console.log(req.body,'createSellData#');   
    dataService.sellCreate(req.body.Id,req.body.uname,req.body.name,req.body.title,req.body.category,req.body.description,req.body.price,req.body.images,req.body.createdAt)
    .then(
        result=>{
            res.status(result.statusCode).json(result)
        }
    )
})

//api req to get posts
app.get('/getPosts', (req,res)=>{
    // console.log(req.body,'createSellData#');   
    dataService.getPosts().then(
        result=>{
            res.status(result.statusCode).json(result)
        }
    )
})

app.post('/image',(req,res)=>{
    console.log(req.body,'Image#');
    dataService.image().then(
    result=>{
        res.status(result.statusCode).json(result)

    })
})