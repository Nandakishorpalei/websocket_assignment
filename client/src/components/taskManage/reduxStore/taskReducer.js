import { GET_TASK_LOADING, GET_TASK_SUCCESS, ADD_TASK_LOADING, ADD_TASK_SUCCESS, UPDATE_TASK_LOADING, UPDATE_TASK_SUCCESS } from "./actionType"

const init = {
    loading : false,
    taskData : []
}

const taskReducer = (store = init, {type, payload})=>{
    switch (type) {
        case GET_TASK_LOADING : return {
            ...store,
            loading: true
        }
        case GET_TASK_SUCCESS : return {
            ...store,
            loading: false,
            taskData : payload
        }
        case ADD_TASK_LOADING : return {
            ...store,
            loading: true
        }
        case ADD_TASK_SUCCESS : return {
            ...store,
            loading: false,
            taskData : [...store.taskData, payload]
        }
        case UPDATE_TASK_LOADING : return {
            ...store,
            loading: true
        }
        case UPDATE_TASK_SUCCESS : return {
            ...store,
            loading: false,
            taskData : payload
        }

        default : return store
    }
}

export default taskReducer;