import taskReducer from "./taskManage/reduxStore/taskReducer";
import thunk from "redux-thunk";
import { applyMiddleware, combineReducers, compose, createStore} from "redux";

const rootReducer = combineReducers({
    taskStore : taskReducer
})

const store = createStore(rootReducer,compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__&&window.window.__REDUX_DEVTOOLS_EXTENSION__()))

export default store;
