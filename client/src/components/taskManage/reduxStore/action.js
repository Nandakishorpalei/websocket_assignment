import { ADD_TASK_LOADING, ADD_TASK_SUCCESS, GET_TASK_LOADING, GET_TASK_SUCCESS, UPDATE_TASK_LOADING, UPDATE_TASK_SUCCESS } from "./actionType"
import axios from "axios";

export const addTaskLoading = () =>{
    return {
        type: ADD_TASK_LOADING,
    }
}

export const addTaskSuccess = (payload) =>{
    return {
        type: ADD_TASK_SUCCESS,
        payload
    }
}

export const getTaskLoading = ()=>{
    return {
        type : GET_TASK_LOADING
    }
}

export const getTaskSuccess = (payload)=>{
    return {
        type : GET_TASK_SUCCESS,
        payload
    }
}


export const updateTaskLoading = () =>{
    return {
        type : UPDATE_TASK_LOADING
    }
}

export const updateTaskSucess = (payload) =>{
    return {
        type : UPDATE_TASK_SUCCESS,
        payload
    }
}

export const getAllTask = (dispatch) => {
    console.log("dispatching here")
    return ()=>{
        dispatch(getTaskLoading()) 

        axios
      .get("https://rocketassignment.herokuapp.com/task")
      .then((res) => res.data)
      .then((responseData) => {
        const allTask = responseData;
        console.log("allTask:", allTask);
        dispatch(getTaskSuccess(allTask))
      })
      .catch((e) => console.log(e.message));
    }
}