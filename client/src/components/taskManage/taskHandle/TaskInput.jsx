import React, { useState, useEffect, useContext } from "react";
import Checkbox from "@mui/material/Checkbox";
import TeamTask from "./TeamTask";
import axios from "axios";
import { ShowContext } from "../context/editContext";
import Buttons from "../buttonMui/Buttons";
import Form from "../commonForm/Form";


const initialData = {
  taskName: "",
  projectName: "",
  isBillable: false,
  userId: 10, 
};

const TaskInput = () => {

  const [disableBtn, setDisableBtn] = useState(true);
  const [data, setData] = useState(initialData);
  const { taskName, projectName, isBillable } = data;
  
  const {willShow, updateWillShow} = useContext(ShowContext)

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





  function handleCheckBox() {
    setData({ ...data, isBillable: !isBillable });
  }

  useEffect(()=>{
    if(taskName.length >= 1 &&  projectName.length >= 1){
    setDisableBtn(false)
    }else{
    setDisableBtn(true)
    }
  },[data])

 

  function setDisableButton(value){
    setDisableBtn(false)
  }


  return (
    <div>
      {/* form box */}
      <div className="formBox"  style={{display: willShow ? "none" : "block"}}>
        <div>
          <p className="label">
            <span className="redSpan">*</span>&nbsp;Project Name
          </p>
          <input
            className="inputBox"
            type="text"
            name="projectName"
            value={projectName}
            placeholder="Eg. Nike Implementation"
            onChange={handleInput}
          />
        </div>

        <div>
          <div className="inputFlexBox">
            <p className="label">
              <span className="redSpan">*</span>&nbsp;Task Name
            </p>
            <p className="label">Billable</p>
          </div>

          <div className="inputFlexBox">
            <input
              className="inputBox inputBox--2"
              type="text"
              name="taskName"
              value={taskName}
              placeholder="Eg. Kick-off call" 
              onChange={handleInput}
            />
            <Checkbox
              style={{ alignSelf: "baseline" }}
              onChange={handleCheckBox}
            />
          </div>
        </div>
      </div>

       {/* {willShow ? null :<Form itemId={0} setDisableBtn={setDisableButton} page="add" /> } */}

       
      <TeamTask />
 
      <Buttons disableBtn ={disableBtn}  handleSubmit={handleSubmit} page="add" />

    </div>
  );
};

export default TaskInput;
