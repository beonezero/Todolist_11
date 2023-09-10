import React, {ChangeEvent, memo} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "./api/tasks-api";

type PropsTaskType = {
    task: TaskType
    changeTaskStatus: (taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (taskId: string, title: string) => void
    removeTask: (taskId: string) => void
}

const Task = memo((
    {
        task,
        changeTaskStatus,
        changeTaskTitle,
        removeTask
              }: PropsTaskType) => {
    const onClickHandler = () => removeTask(task.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New);
    }
    const onTitleChangeHandler = (newValue: string) => {
        changeTaskTitle(task.id, newValue);
    }
    return (
        <div className={task.status ? "is-done" : ""}>
            <Checkbox
                checked={!!task.status}
                color="primary"
                onChange={onChangeHandler}
            />

            <EditableSpan value={task.title} onChange={onTitleChangeHandler} />
            <IconButton onClick={onClickHandler}>
                <Delete />
            </IconButton>
        </div>
    );
})


export default Task;