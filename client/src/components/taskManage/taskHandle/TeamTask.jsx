import React, { useContext, useState } from 'react';

import "../card.css";
import EditTask from "../editTask/EditTask";
import { ShowContext } from '../context/editContext';
import TaskDisplay from './TaskDisplay';
import PusherHandle from './PusherHandle';


const TeamTask = () => {

    const [deleted, setDeleted] = useState(0);
    const [editScreen, setEditScreen] = useState(-1);

    const {willShow, updateWillShow} = useContext(ShowContext)

    //  set current update item id 
    function setEditItemScreen(id){
      setEditScreen(id)
    }

    function setDeleteItem(value){
      setDeleted(value)
    }

    return (
        <div id="teamtask">
            <PusherHandle value={deleted} />
            {/* edit screen  */}
            <div id="editScreen">
            {willShow ? <EditTask itemId={editScreen} /> : null}
            </div>

            <h4 className='teamtask__heading'>Team Tasks</h4>
            <TaskDisplay setDeleted= {setDeleteItem} setEditScreen={setEditItemScreen} />

        </div>
    ); 
};

export default TeamTask;