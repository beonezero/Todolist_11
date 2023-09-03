import React, {ChangeEvent, useEffect, useState} from 'react'
import {TasksApi} from "../../api/tasks-api";

export default {
    title: 'API TASKS'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        const todolistId = "19752913-6d0d-4562-9353-ca5435c44769"
        TasksApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data.items)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
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
    const changeTitleTask = () => {
        TasksApi.updateTask(todolistId, taskId, title)
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
            <div>
                <button onClick={changeTitleTask}>change task</button>
            </div>
        </div>
    )
}

