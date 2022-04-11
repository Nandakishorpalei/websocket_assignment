import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import CancelIcon from '@mui/icons-material/Cancel';
import TaskInput from "./taskHandle/TaskInput"
import { ShowContext } from "./context/editContext"
import "./card.css"; 

export default function TaskManagement() {
 
  const {willShow, updateWillShow} = useContext(ShowContext)
 
  return (
    <Card
      className="cardContainer"
      sx={{ maxWidth: 405, boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;" }}
    >
      { willShow ? 
       <CardHeader
        action={
          <IconButton aria-label="settings">
            <CancelIcon onClick={()=> updateWillShow(false)} />
          </IconButton>
        }
        title="Edit task"
        style={{ backgroundColor: "#f9f9fa", paddingLeft: "20px" }}
      /> :
      
      <CardHeader 
        title="Activities"
        style={{ backgroundColor: "#f9f9fa", paddingLeft: "20px" }}
      /> 
      }

      <TaskInput />

    </Card>
  );
}
