import React, { useState, useEffect, useContext } from "react";
import Checkbox from "@mui/material/Checkbox";
import TeamTask from "./TeamTask";
import axios from "axios";
import { ShowContext } from "../context/editContext";
import Buttons from "../buttonMui/Buttons";
import Form from "../commonForm/Form";


const TaskInput = () => {

  const [disableBtn, setDisableBtn] = useState(true);
  
  const {willShow, currentData} = useContext(ShowContext)

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("https://rocketassignment.herokuapp.com/task", currentData)
      .then((res) => res.data)
      .then((responseData) => console.log(responseData))
      .catch((e) => console.log(e.message));

  }

  function setDisableButton(value){
    setDisableBtn(false)
  }

  return (
    <div>
      {/* form box */}

       {willShow ? null :<Form itemId={0} setDisableBtn={setDisableButton} page="add"  /> }
       
      <TeamTask />
 
      <Buttons disableBtn ={disableBtn}  handleSubmit={handleSubmit} page="add" />
 
    </div>
  );
};

export default TaskInput;
