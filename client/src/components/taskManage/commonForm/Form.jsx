import React, {useState, useEffect, useContext} from 'react';
import Checkbox from "@mui/material/Checkbox";
import { ShowContext } from "../context/editContext";
import axios from "axios";

const initialData = {
    taskName: "",
    projectName: "",
    isBillable: false,
    userId: 10,
  };

const Form = ({setDisableBtn, itemId, page}) => {

  
  const [initialData, setInitialData] = useState({})
  const [data, setData] = useState(initialData);
  const {willShow, updateWillShow} = useContext(ShowContext)
  const { taskName, projectName, isBillable } = data;

  useEffect(()=>{
    if(page === "edit"){
      axios.get(`https://rocketassignment.herokuapp.com/task/${itemId}`)
     .then((res)=> res.data)
     .then((response)=>{
         setData(response)
      console.log("response",response)
     })
     .catch(e=> console.log(e.message))
     }
  },[]);
        
       
        
        function handleInput(e) {
            const { name, value } = e.target;
            setData({ ...data, [name]: value });
          }
        
          function handleCheckBox() {
            setData({ ...data, isBillable: !isBillable });
          }

          useEffect(()=>{
            if(taskName?.length >= 1 &&  projectName?.length >= 1){
            setDisableBtn(false)
            }else{
            setDisableBtn(true)
            }
          },[data])


    return isBillable === undefined && page === "edit" ? <div style={{textAlign:"center"}}><progress></progress></div> :(
        <div className="formBox">
          <div>
            <p className="label">
              <span className="redSpan">*</span>&nbsp;Project Name
            </p>
            <input
              className="inputBox"
              type="text"
              name="projectName"
              value={projectName}
              defaultValue={projectName}
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
                defaultValue={taskName}
                placeholder="Eg. Kick-off call" 
                  onChange={handleInput}
              />
              
             { console.log('isBillable:', isBillable)}
              {isBillable ?  
              <Checkbox defaultChecked
                style={{ alignSelf: "baseline" }}
                  onChange={handleCheckBox}
              /> : 
              <Checkbox
                style={{ alignSelf: "baseline" }}
                  onChange={handleCheckBox}
              />
               }
            </div>
          </div>
        </div>
    );
};

export default Form;