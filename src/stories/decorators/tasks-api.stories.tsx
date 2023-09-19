import React, {ChangeEvent, useEffect, useState} from 'react'
import {TasksApi} from "../../api/tasks-api";

export default {
    title: 'API TASKS'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const getTasks = () => {
        TasksApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data.items)
            })
    }
    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <div><input placeholder={"todolistId"} value={todolistId} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setTodolistId(e.currentTarget.value)
            }}/>
                <button onClick={getTasks}>get tasks</button>
            </div>
        </div>)
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const addTaskButton = () => {
        TasksApi.createTask(todolistId, title)
            .then((res) => {
                setState(res.data)
            })

        setTodolistId("")
        setTitle("")
    }

    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <div><input placeholder={"todolistId"} value={todolistId} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setTodolistId(e.currentTarget.value)
            }}/></div>
            <div><input placeholder={"title"} value={title} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setTitle(e.currentTarget.value)
            }}/></div>
            <div>
                <button onClick={addTaskButton}>add task</button>
            </div>
        </div>)
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [taskId, setTaskId] = useState<string>("")
    const deleteTaskButton = () => {
        TasksApi.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
        setTaskId("")
        setTodolistId("")
    }

    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <div><input placeholder={"todolistId"} value={todolistId} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setTodolistId(e.currentTarget.value)
            }}/></div>
            <div><input placeholder={"taskId"} value={taskId} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setTaskId(e.currentTarget.value)
            }}/></div>
            <div>
                <button onClick={deleteTaskButton}>delete task</button>
            </div>
        </div>
    )
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [taskId, setTaskId] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [completed, setCompleted] = useState<boolean>(false)
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const changeTitleTask = () => {
        TasksApi.updateTask(todolistId, taskId, {
            title: title,
            description: description,
            status: status,
            priority: priority,
            startDate: "",
            deadline: ""
        })
            .then((res) => {
                setState(res.data)
            })
        setTaskId("")
        setTodolistId("")
        setTitle("")
    }

    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <div><input placeholder={"todolistId"} value={todolistId} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setTodolistId(e.currentTarget.value)
            }}/></div>
            <div><input placeholder={"taskId"} value={taskId} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setTaskId(e.currentTarget.value)
            }}/></div>
            <div><input placeholder={"title"} value={title} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setTitle(e.currentTarget.value)
            }}/></div>
            <div><input placeholder={"description"} value={description} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setDescription(e.currentTarget.value)
            }}/></div>
            <div> true / false <input type={"checkbox"} checked={completed} onChange={(e) => {
                setCompleted(e.currentTarget.checked)
            }}/></div>
            <div><input placeholder={"status"} type={"number"} value={status} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setStatus(+e.currentTarget.value)
            }}/></div>
            <div><input placeholder={"priority"} type={"number"} value={priority} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setPriority(+e.currentTarget.value)
            }}/></div>
            <div>
                <button onClick={changeTitleTask}>change task</button>
            </div>
        </div>
    )
}

