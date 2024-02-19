const models = require('../models');


//task creation
function save(req,res){
  taskListId = req.params['taskListId'];
  console.log(taskListId)
const post = {
  name:req.body.title,
  description:"task name",
  createdBy:req.body.createdBy,
  updatedBy:req.body.updatedBy,
  taskListId: taskListId,
  createdAt:new Date(),
  updatedAt: new Date()
  

}
models.Task.create(post).then(result =>{
     res.status(201).json({
      message: "Registerd Successfully",
      response: result

     });
}).catch(error =>{
  res.status(500).json({
    message: "Something went wrong",
    error: error

   });
});
}

//show one task
function getTask(req, res){
  var user_id = req.params['id']

  models.Task.findOne({
    where: {
      id: 4
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

//show all task
function getAllTask(req,res){
  models.Task.findAll().then(result =>{
     res.status(200).json(result);
  }).catch(error =>{
     res.status(500).json({
      message:"something went wrong"
     });
  });
}

//delete one task
function deleteTask(req,res){
  var taskId = req.params['taskId']

  models.Task.destroy({
    where: {
      id: taskId
    }
  }).then(result =>{
    res.status(200).json({
      message:"Deleted"
    });
  }).catch((error) =>{
    console.error('Failed to retrieve data : ', error);
  });
}

//update task
function updateTask(req,res){
  var taskId = req.params['taskId']
  console.log(taskId);

  
  models.Task.findOne({
    where: {
      id: taskId
    }
  }).then(result =>{
   
    models.Task.update(
      {
        name: req.body.name,
        description: req.body.description
      },
      {where:{id:taskId}}
      ).then(updatedResult =>{
        if(updatedResult==null){
          res.status(404).json({
            errorDescription: "Not found"
          });
        }
        res.status(200).json({
          response: result
        });
      }
      )
  }).catch((error) =>{
    res.status(404).json({
      message:"task is not present"
    });
  });
}

module.exports = {
  save:save,
  getTask: getTask,
  getAllTask:getAllTask,
  deleteTask:deleteTask,
  updateTask:updateTask
}