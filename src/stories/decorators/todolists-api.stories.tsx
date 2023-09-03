import React, {ChangeEvent, useEffect, useState} from 'react'
import {TodolistsApi} from "../../api/todolists-api";

export default {
    title: 'API TODOLISTS'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        TodolistsApi.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>("")

    const addTodolistButton = () => {
        TodolistsApi.createTodolists(title)
            .then((res) => {
                setState(res.data)
            })

        setTitle("")
    }

    return (<div>
        <div>{JSON.stringify(state)}</div>
        <div><input placeholder={"title"} value={title} onChange={(e: ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)}}/></div>
        <button onClick={addTodolistButton}>add todolist</button>
    </div>)
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")

        const deleteTodolistButton = () => {
            TodolistsApi.deleteTodolists(todolistId)
                .then((res) => {
                    setState(res.data)
                })
            setTodolistId("")
        }

    return (<div>
        <div>{JSON.stringify(state)}</div>
        <div><input placeholder={"todolistId"} value={todolistId} onChange={(e: ChangeEvent<HTMLInputElement>) => {setTodolistId(e.currentTarget.value)}}/></div>
        <button onClick={deleteTodolistButton}>add todolist</button>
    </div>)
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [title, setTitle] = useState<string>("")

    const updateTodolistTitleButton = () => {
        TodolistsApi.updateTodolist(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
        setTodolistId("")
        setTitle("")

    }

    return (<div>
        <div>{JSON.stringify(state)}</div>
        <div><input placeholder={"todolistId"} value={todolistId} onChange={(e: ChangeEvent<HTMLInputElement>) => {setTodolistId(e.currentTarget.value)}}/></div>
        <div><input placeholder={"title"} value={title} onChange={(e: ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)}}/></div>
        <button onClick={updateTodolistTitleButton}>update todolist title</button>
    </div>)
}

