import React, {ChangeEvent, memo} from 'react';
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import Delete from "@mui/icons-material/Delete";
import {
    deleteTaskTC, updateTaskTC,
} from "../../tasks-reducer";
import {TaskStatuses, TaskType} from "../../../../api/tasks-api";
import {useAppDispatch} from "../../../../App/store";

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
        dispatch(updateTaskTC(task.id, newIsDoneValue ? {status: TaskStatuses.Completed} : {status: TaskStatuses.New} , todolistId))
    }

    const changeTaskTitle = (title: string) => {
        dispatch(updateTaskTC(task.id, {title: title}, todolistId))
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