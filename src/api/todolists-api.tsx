import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "e318d0fb-ce59-4c2b-827b-0e3b18b76493"
    }
}

export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

type ResponseType<D> = {
    resultCode: number
    messages: string[],
    data: D
}

export const TodolistsApi = {
    getTodolists() {
        return axios.get<TodolistType[]>("https://social-network.samuraijs.com/api/1.1/todo-lists", settings)
    },
    createTodolists(title: string) {
        return axios.post<ResponseType<{
            item: TodolistType
        }>>("https://social-network.samuraijs.com/api/1.1/todo-lists", {title: title}, settings)
    },
    deleteTodolists(todolistId: string) {
        return axios.delete<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
    },
    updateTodolist(todolistId: string, title: string) {
        return axios.put<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: title}, settings)
    }
}