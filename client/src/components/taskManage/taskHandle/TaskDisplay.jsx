import React, { useState, useContext } from 'react';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { shallowEqual, useSelector } from 'react-redux'
import { ShowContext } from "../context/editContext"
import axios from "axios";

const TaskDisplay = ({ setDeleted, setEditScreen}) => {
    const [showDelete, setShowDelete] = useState(-1);
    const { updateWillShow} = useContext(ShowContext);

    const {loading, taskData} = useSelector(store => store.taskStore, shallowEqual)
    console.log('taskData:', taskData)
 
    async function deleteItem(id){
        await axios
       .delete(`https://rocketassignment.herokuapp.com/task/${id}`)
       setDeleted(Math.random()*100000);
       console.log("item deleted")
      }

    return loading ? <div style={{textAlign:"center"}}><progress></progress></div> : (
        <div id="teamtask__container">
                {taskData.map((item,index)=>{
                    return <div className='teamtask__item__container' 
                           onMouseEnter={()=>setShowDelete(index)}
                           onMouseLeave={()=>setShowDelete(-1)} key={index}>

                           <p className="teamtask__taskname"> {item.taskName} <br /> 
                           {item.isBillable ? <MonetizationOnOutlinedIcon style={{ alignSelf:"center", fontSize:"18px"}} /> : null}
                           &nbsp; <span className="teamtask__projectname" style={{ position: item.isBillable ? "absolute" : "inherit" }}>
                           {item.projectName}</span></p>

                           <div className="taskUpdate" style={{ visibility: showDelete === index ? "visible" : "hidden"}} >
                            <EditIcon fontSize="small" className="editIcon" onClick={()=>{
                             updateWillShow(true)
                             setEditScreen(item._id) 
                            } 
                            }/>
                            <DeleteOutlineOutlinedIcon onClick={()=> deleteItem(item._id)} />
                           </div>
                    </div>
                })}
            </div>
    );
};

export default TaskDisplay;