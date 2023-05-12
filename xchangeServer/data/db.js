
//import moongoose

const mongoose=require('mongoose');

//define connection string

mongoose.connect('mongodb://localhost:27017/xChange',()=>{
    console.log('connected to MongoDB');
})


//model creation------------

const User=mongoose.model('User',{

    uname:String,
    fname:String,
    phone:Number,
    pswd:String,

})

const Selldetail=mongoose.model('Selldetail',{
    uname:String,
    name:String,
    title:String,
    category:String,
    description:String,
    price:Number,
    images:Array,
    createdAt:String

})

const Chatmember=mongoose.model('Chatmembers',{
    sender:String,
    receiver:String,
    senderName:String,
    receiverName:String,



})

const Message=mongoose.model('Message',{
    content:String,
    socketId:String,
    from:String,
    to:String,
    time:String,
    date:String,

})

module.exports={
    User,
    Selldetail,
    Chatmember,
    Message,

}