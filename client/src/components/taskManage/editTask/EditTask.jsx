import {useState, useEffect, useContext} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import { ShowContext } from "../context/editContext";
import Buttons from "../buttonMui/Buttons"
import Form from "../commonForm/Form"
import "../card.css"

function EditTask({itemId}) {
  const [disableBtn, setDisableBtn] = useState(false);
    const [initialData, setInitialData] = useState({})
    const [data, setData] = useState(initialData);
    const {willShow, updateWillShow} = useContext(ShowContext)

    useEffect(()=>{
       axios.get(`https://rocketassignment.herokuapp.com/task/${itemId}`)
       .then((res)=> res.data)
       .then((response)=>{
           setData(response)
        console.log("response",response)
       })
    },[]);



  const { taskName, projectName, isBillable } = data;
  console.log('isBillable:', isBillable)

  function handleInput(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  function handleUpdate(e) {
    e.preventDefault();
    updateWillShow(false);


    axios
      .patch(`https://rocketassignment.herokuapp.com/task/${itemId}`, data)
      .then((res) => res.data)
      .then((responseData) => console.log(responseData))
      .catch((e) => console.log(e.message));

    setData({taskName : "", projectName : "", isBillable : false, userId : ""});
  }

  function handleCheckBox() {
    setData({ ...data, isBillable: !isBillable });
  }

  return isBillable === undefined ? <div style={{textAlign : "center"}}><progress></progress></div> : (
    <Card sx={{ maxWidth: 405 }}>
      
      <CardContent>

      {/* <Form /> */} 

      {/* {willShow ? <Form itemId={itemId} setDisableBtn={setDisableBtn} page="edit" /> : null } */}

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
      </CardContent>

      <Buttons disableBtn={disableBtn}  handleSubmit={handleUpdate} page="edit" />
    </Card>
  );
}

export default EditTask;
