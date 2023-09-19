import {TodolistsApi, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";

export type FilterValuesType = "all" | "active" | "completed";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    todolist: TodolistType
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

export type SetTodolistsActionType = {
    type: "SET-TODOLISTS",
    todolists: TodolistType[]
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType

const initialState: Array<TodolistDomainType> =  []

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.id)
        }
        case 'ADD-TODOLIST': {
            return [{...action.todolist, filter: 'all' }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        }
        case "SET-TODOLISTS": {
            return action.todolists.map(tl => {
                return {
                    ...tl,
                    filter: "all"
                }
            })
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todolist}
    }
    export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
        return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
    }
    export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
        return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
    }

    export const setTodolistsAC = (todolists: TodolistType[]): SetTodolistsActionType => {
        return {type: "SET-TODOLISTS", todolists: todolists}
    }

    export const fetchTodolistsTC = () => {
        return (dispatch: Dispatch) => {
            TodolistsApi.getTodolists()
                .then(res => {
                    dispatch(setTodolistsAC(res.data))
                })
        }
    }

    export const removeTodolistTC = (todolistId: string) => {
        return (dispatch: Dispatch) => {
            TodolistsApi.deleteTodolists(todolistId)
                .then(res => {
                    dispatch(removeTodolistAC(todolistId))
                })
        }
    }

    export const addTodolistTC = (title: string) => {
        return (dispatch: Dispatch) => {
            TodolistsApi.createTodolists(title)
                .then(res => {
                    dispatch(addTodolistAC(res.data.data.item))
                })
        }
    }

export const changeTodolistTitleTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        TodolistsApi.updateTodolist(todolistId, title)
            .then(res => {
                dispatch(changeTodolistTitleAC(todolistId, title))
            })
    }
}

