const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
 
//sign up
function signup(req,res){
  models.User.findOne({where:{email:req.body.email}}).then(result =>{
    if(result){
      res.status(409).json({
        message: "Email already exists",
      }); 
    }else{
      bcryptjs.genSalt(10,function(err,salt){
        bcryptjs.hash(req.body.password,salt,function(err, hash){
          const user= {
            username:req.body.name,
            email:req.body.email,
            mobile_no:7238728,
            password:hash,
            city:"jshdj",
            createdAt:new Date(),
            updatedAt: new Date()
            
          
          }
          models.User.create(user).then(result =>{
               res.status(201).json({
                message: "Registerd Successfully",
                response: result
          
               });
          }).catch(error =>{
            res.status(500).json({
              message: "Something went wrong",
              
          
             });
          });
          });
        });
    
    }
  }).catch(error =>{

  });
 
} 

function login(req,res){
   models.User.findOne({where:{email:req.body.email}}).then(user=>{
 if(user== null){
   res.status(401).json({
    message:"Invalid credentials",
   });
 }else{
  bcryptjs.compare(req.body.password,user.password,function(err, result){
    if(result){
      const token = jwt.sign({
        email: user.email,
        userId: user.id
      },'secret', function(err, token){
          res.status(200).json({
           message:"Authentication successfull",
           userId: user.email,
           token: token
          });
      });
    }else{
      res.status(401).json({
        message:"Invalid credentials",
       });
    }
  });
 }
   }).catch(error =>{
      res.status(500).json({
       message:"Something went wrong",
      });
   });
}




function getUser(req, res){
  const user_id = req.params['id']

  models.User.findOne({
    where: {
      username : user_id
    }
}).then(result =>{
  if(result==null){
    res.status(404).json({
      errorDescription: "Not found"
    });
  }
  res.status(200).json({
    response: result
  });
}).catch((error) => {
    console.error('Failed to retrieve data : ', error);
});
} 

module.exports = {
  signup:signup,
  login:login,
  getUser: getUser
}