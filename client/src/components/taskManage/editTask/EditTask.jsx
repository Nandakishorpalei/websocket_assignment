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
    const {willShow, updateWillShow, currentData} = useContext(ShowContext)
   

    useEffect(()=>{
       axios.get(`https://rocketassignment.herokuapp.com/task/${itemId}`)
       .then((res)=> res.data)
       .then((response)=>{
           setData(response)
        console.log("response",response)
       })
    },[]);

  const { isBillable } = data;
  console.log('isBillable:', isBillable)

  function handleUpdate(e) {
    e.preventDefault();
    updateWillShow(false);
    console.log('currentData:', currentData)

    axios
      .patch(`https://rocketassignment.herokuapp.com/task/${itemId}`, currentData)
      .then((res) => res.data)
      .then((responseData) => console.log(responseData))
      .catch((e) => console.log(e.message));

  }


  return isBillable === undefined ? <div style={{textAlign : "center"}}><progress></progress></div> : (
    <Card sx={{ maxWidth: 405 }}>
      
      <CardContent>

      {/* <Form /> */} 

      {willShow ? <Form itemId={itemId} setDisableBtn={setDisableBtn} page="edit" /> : null }

      
      </CardContent>

      <Buttons disableBtn={disableBtn}  handleSubmit={handleUpdate} page="edit" />
    </Card>
  );
}

export default EditTask;
