import React, {useState, useEffect} from 'react';
import Pusher from "pusher-js";
import { addTaskLoading, addTaskSuccess, getAllTask, updateTaskLoading, updateTaskSucess } from "../reduxStore/action"
import { useDispatch } from 'react-redux'


const PusherHandle = ({value}) => {
    const [deleted, setDeleted] = useState(value);
    const dispatch = useDispatch();

    useEffect(() => {
    Pusher.logToConsole = true;

    var pusher = new Pusher("6eb55541fc0a233beb11", {
      cluster: "ap2",
    });

    var channel = pusher.subscribe("my-channel");

    channel.bind("my-event", function (data) {
      dispatch(addTaskLoading())
      console.log(data);

      dispatch(addTaskSuccess(data))
    });

    channel.bind("my-delete",async function (data) {
      dispatch(updateTaskLoading())
      console.log("deleted",data);
      let updatedTask = await data.tasks;
      dispatch(updateTaskSucess(updatedTask));
    });


    channel.bind("my-update",async function (data) {
      dispatch(updateTaskLoading())
      console.log("updateed",data);
      let updatedTask = await data.tasks;
      dispatch(updateTaskSucess(updatedTask))
    });


      getTasks(dispatch)()

  }, [deleted]);

  function getTasks(dispatch){
         return ()=>{
           dispatch(getAllTask(dispatch))
         }
     }


    return
};

export default PusherHandle;