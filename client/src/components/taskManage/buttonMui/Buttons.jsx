import React,{useContext} from "react";
import Button from "@mui/material/Button";
import { ShowContext } from "../context/editContext"; 
import "../card.css";


const Buttons = ({ disableBtn, handleSubmit, page }) => {
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
        style={{ display: disableBtn ? "none" : "block" }}
        onClick={handleSubmit}
        className="disabled__button"
      >
      {page === "edit" ? "Update activity" : "Add activity" } 
        
      </Button>
      <Button
        variant="contained"
        disabled
        style={{ display: disableBtn ? "block" : "none" }}
        className="disabled__button"
      >
        Add activity
      </Button>
    </div>
  );
};

export default Buttons;
