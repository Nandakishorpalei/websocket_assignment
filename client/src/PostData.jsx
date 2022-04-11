import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import axios from "axios";

const initialData = {
  taskName: "",
  projectName: "",
  isBillable: false,
  userId: "",
};

const PostData = () => {
  const [data, setData] = useState(initialData);
  const { taskName, projectName, isBillable, userId } = data;
  const [taskData, setTaskData] = useState([]);

  function handleInput(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("https://rocketassignment.herokuapp.com/task", data)
      .then((res) => res.data)
      .then((responseData) => console.log(responseData))
      .catch((e) => console.log(e.message));

    setData(initialData);
  }

  useEffect(() => {
    Pusher.logToConsole = true;

    var pusher = new Pusher("6eb55541fc0a233beb11", {
      cluster: "ap2",
    });

    var channel = pusher.subscribe("my-channel");
    channel.bind("my-event", function (data) {
      console.log(JSON.stringify(data));
      console.log(data);
      setTaskData((taskData) => [...taskData, data]);

      console.log(taskData);
    });

    axios
      .get("https://rocketassignment.herokuapp.com/task")
      .then((res) => res.data)
      .then((responseData) => {
        const allTask = responseData;
        console.log("allTask:", allTask);
        setTaskData(allTask);
      })
      .catch((e) => console.log(e.message));
  }, []);


  return (
    <div>
      <h1>TASK MANAGEMENT</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="taskName"
          value={taskName}
          placeholder="taskName"
          onChange={handleInput}
        />
        <br />
        <input
          type="text"
          name="projectName"
          value={projectName}
          placeholder="projectName"
          onChange={handleInput}
        />
        <br />
        <input
          type="text"
          name="isBillable"
          value={isBillable}
          placeholder="isBillable"
          onChange={handleInput}
        />
        <br />
        <input
          type="text"
          name="userId"
          value={userId}
          placeholder="userid"
          onChange={handleInput}
        />
        <br />
        <input type="submit" value="add" />
      </form>

      {taskData.map((item) => {
        return (
          <div>
            <h3>{item.taskName}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default PostData;
