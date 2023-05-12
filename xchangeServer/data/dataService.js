// import jwt
const jwt = require('jsonwebtoken');

  //import db
  const db=require('./db');

  const register=(uname,fname,phone,pswd)=>{
    return db.User.findOne({uname})
    .then(user=>{
        if(user){
            return{
                status:false,
                statusCode:400,
                message:'User already registered'
            }
        }
        else{
            const newUser=new db.User({
                uname,
                fname,
                phone,
                pswd
            })
            newUser.save();  // data saved to mongodb
            return{
                status:true,
                statusCode:200,
                message:'Registerd succesfully'
            }
        }
    })
  }

  const login=(uname,pswd)=>{
    return db.User.findOne({uname,pswd}).then(
        (user)=>{
            if(user){
                currentuser=user.uname
                userId=user._id
                fullname=user.fname

                const token= jwt.sign({currentuser:uname},'superkey2022')  //superkey is a secret key(private key)


                return{
                    status:true,
                    statusCode:200,
                    message:'Login Successful',
                    currentuser,
                    userId,
                    fullname,
                    token


                }
            }
            else{
                return{
                    status:false,
                    statusCode:400,
                    message:'Login Failed!'
                }
            }
        }
    )

  }
  
  const sellCreate=(Id,uname,name,title,category,description,price,images,createdAt)=>{

    return db.Selldetail.findOne({name}).then(
        result=>{
            if (result) {
                
                return{
                    status:true,
                    statusCode:200,
                    message:'Created Successfully',

                }
                
            }else{
                const newSelldetail= new db.Selldetail({Id,uname,name,title,category,description,price,images,createdAt})
                newSelldetail.save()
                return{
                    status:true,
                    statusCode:200,
                    message:'Created Successfully',
                    selldetails:result
                }
            }
        }
    )

  }

  const getPosts=()=>{
    return db.Selldetail.find().then(
        result=>{

            if(result){

                return{
                    status:true,
                    statusCode:200,
                    posts:result
                }
            }
        }
    )

  }

//   const image=()=>{
//     return db.User.find()
//     .then(result=>{
       
//             const newImage=new db.Image({
               
//             })
//             newUser.save();  // data saved to mongodb
//             return{
//                 status:true,
//                 statusCode:200,
//                 message:'Registerd succesfully'
//             }
//   })
// }





  module.exports={
    register,
    login,
    sellCreate,
    getPosts,
    // image,
  }