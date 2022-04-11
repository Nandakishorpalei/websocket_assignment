import React,{useContext} from "react";
import Button from "@mui/material/Button";
import { ShowContext } from "../context/editContext";  
import "../card.css";


const EditPageButtons = ({ disableBtn, handleSubmit }) => {
  const {  updateWillShow } = useContext(ShowContext);
  const customCancelBtn = {
    border: "1px solid rgb(230, 230, 230)",
    color: "grey",
    justifyContent: "left",
  };

  return (
    <div className="flexBox" style={{ backgroundColor: "#fff" }}>
      <Button
        variant="outlined"
        style={customCancelBtn}
        className="cancel__button"
        onClick={() => {
          updateWillShow(false);
        }}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        color="success"
        onClick={async () => {
          handleSubmit();
        }}
        className="disabled__button"
      >
        Update activity
      </Button>
    </div>
  );
};

export default EditPageButtons;
