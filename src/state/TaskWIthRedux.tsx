import React, {ChangeEvent, memo} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../EditableSpan";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskTC, removeTaskAC} from "./tasks-reducer";
import {TasksApi, TaskStatuses, TaskType} from "../api/tasks-api";
import {useAppDispatch} from "./store";

export type TaskWIthReduxPropsType = {
    task: TaskType
    todolistId: string
}


const TaskWIthRedux = memo(({task, todolistId}: TaskWIthReduxPropsType) => {
    const dispatch = useAppDispatch()

    const removeTask = () => {
        dispatch(deleteTaskTC(todolistId, task.id))
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New , todolistId))
    }

    const changeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC(task.id, title, todolistId))
    }


    return (
        <div className={task.status === TaskStatuses.Completed ? "is-done" : ""}>
            <Checkbox
                checked={task.status === TaskStatuses.Completed}
                color="primary"
                onChange={changeTaskStatus}
            />

            <EditableSpan value={task.title} onChange={changeTaskTitle}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </div>
    );
})

export default TaskWIthRedux;