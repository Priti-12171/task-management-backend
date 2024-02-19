const models = require('../models');


//task creation
function save(req,res){

const post = {
  name:req.body.title,
  description:"sjdks",
  createdBy:"sdjhj",
  updatedBy:"dhgfj",
  createdAt:new Date(),
  updatedAt: new Date()
  

}
models.TaskList.create(post).then(result =>{
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
function getTaskList(req, res){
  var taskListId = req.params['taskListId']
  console.log("hets task")

  models.Task.findAll({
    where: {
      taskListId: taskListId 
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
function getAllTaskList(req,res){
  models.TaskList.findAll().then(result =>{
     res.status(200).json(result);
  }).catch(error =>{
     res.status(500).json({
      message:"something went wrong"
     });
  });
}

//delete one task
function deleteTaskList(req,res){
  var user_id = req.params['id']

  models.Task.destroy({
    where: {
      id: 4
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
function updateTaskList(req,res){
  var taskId = req.params['taskId']


  models.TaskList.findOne({
    where: {
      id: 5
    }
  }).then(result =>{
   
    models.TaskList.update(
      {name: req.body.name,
        description: req.body.description
      },
      {where:{id:5}}
      ).then(result =>{
        if(result==null){
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
  getTasklist: getTaskList,
  getAllTaskList:getAllTaskList,
  deleteTaskList:deleteTaskList,
  updateTaskList:updateTaskList
}