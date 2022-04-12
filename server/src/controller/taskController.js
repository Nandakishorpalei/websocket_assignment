const express = require("express");
const router = express.Router();
const Pusher = require("pusher");

const Task = require("../model/taskModel")

const pusher = new Pusher({
    appId: "1382771",
    key: "6eb55541fc0a233beb11", 
    secret: "13f2cc28087071e5759f",
    cluster: "ap2",
    useTLS: true
  });


router.post("/", async(req, res)=>{
    try{

        const newTask = await Task.create(req.body);

        pusher.trigger("my-channel", "my-event", {
            taskName:newTask.taskName,
            projectName:newTask.projectName, 
            isBillable : newTask.isBillable,
            userId: newTask.userId,
            _id:newTask._id
          });

        return res.status(200).send("task added")
        
    }
    catch(e){
        return res.status(500).send(e.message)
    }
});


router.get("/", async(req, res)=>{
    try{
        const allTask = await Task.find().lean().exec();

        return res.status(200).send(allTask)
    }
    catch(e){
        return res.status(500).send(e.message)
    }
});



router.delete("/:id", async(req, res)=>{
    try{
        const newTask = await Task.findByIdAndDelete(req.params.id,{new: true});
        const allTask = await Task.find().lean().exec();

        pusher.trigger("my-channel", "my-delete", {
           tasks : allTask
          });

        return res.status(200).send("data deleted");
    }
    catch(e){
        return res.status(500).send(e.message)
    }
}); 

router.get("/:id", async(req, res)=>{
    try{
        const newTask = await Task.findById(req.params.id);

        return res.status(200).send(newTask);
    }
    catch(e){
        return res.status(500).send(e.message)
    }
}); 


router.patch("/:id", async(req, res)=>{
    try{

        console.log(req.params.id, req.body)

        let payload = {
            taskName: req.body.taskName,
            projectName: req.body.projectName,
            isBillable:req.body.isBillable,
            userId: req.body.userId
        }
        const newTask = await Task.findByIdAndUpdate(req.params.id,req.body,{new : true});

        const allTask = await Task.find().lean().exec();

        pusher.trigger("my-channel", "my-update", {
           tasks : allTask
          });

     
        return res.status(200).send(newTask);
    }
    catch(e){
        return res.status(500).send("error",e.message)
    }
}); 

module.exports = router;
