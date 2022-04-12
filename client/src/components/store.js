import taskReducer from "./taskManage/reduxStore/taskReducer";
import thunk from "redux-thunk";
import { applyMiddleware, combineReducers, compose, createStore} from "redux";

const rootReducer = combineReducers({
    taskStore : taskReducer
})

const store = createStore(rootReducer,applyMiddleware(thunk))

export default store;
