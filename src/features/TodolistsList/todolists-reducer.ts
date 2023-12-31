import {RESULT_CODES, TodolistsApi, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setError, setErrorType, setStatus, SetStatusType} from "../../App/app-reducer";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.id)
        }
        case 'ADD-TODOLIST': {
            return [{...action.todolist, filter: 'all', entityStatus: "idle"}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        }
        case "SET-TODOLISTS": {
            return action.todolists.map(tl =>  ({...tl, filter: "all", entityStatus: "idle"}))
        }
        case "SET-ENTITY-STATUS-TODOLISTS": {
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
        }
        default:
            return state;
    }
}

// actions

export const removeTodolistAC = (todolistId: string) =>
    ({type: 'REMOVE-TODOLIST', id: todolistId} as const)
export const addTodolistAC = (todolist: TodolistType) =>
    ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const)
export const setTodolistsAC = (todolists: TodolistType[]) =>
    ({type: "SET-TODOLISTS", todolists: todolists} as const)

export const setEntityStatusTodolistsAC = (id: string, entityStatus: RequestStatusType) =>
    ({type: "SET-ENTITY-STATUS-TODOLISTS", id, entityStatus} as const)

//thunks

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch<ActionsType>) => {
        TodolistsApi.getTodolists()
            .then(res => {
                dispatch(setTodolistsAC(res.data))
            }).catch((e) => {})
            .finally(() => {
                dispatch(setStatus("idle"))
            })
    }
}

export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setStatus("loading"))
        dispatch(setEntityStatusTodolistsAC(todolistId, "loading"))
        TodolistsApi.deleteTodolists(todolistId)
            .then(res => {
                if(res.data.resultCode === RESULT_CODES.OK){
                    dispatch(removeTodolistAC(todolistId))
                    dispatch(setStatus("succeeded"))
                } else {
                    const error = res.data.messages[0]
                    if(error){
                        dispatch(setError(error))
                    } else {
                        dispatch(setError("Some error"))
                    }
                }
            })
            .catch((e) => {
                dispatch(setError(e.message))
                dispatch(setStatus("failed"))
                dispatch(setEntityStatusTodolistsAC(todolistId, "failed"))
            })
    }
}

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setStatus("loading"))
        TodolistsApi.createTodolists(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
            })
            .catch()
            .finally(() => {
                dispatch(setStatus("succeeded"))
            })
    }
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setStatus("loading"))
        TodolistsApi.updateTodolist(todolistId, title)
            .then(res => {
                dispatch(changeTodolistTitleAC(todolistId, title))
                dispatch(setStatus("succeeded"))
            })
    }
}

//types

export type FilterValuesType = "all" | "active" | "completed";

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>

export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setEntityStatusTodolistsAC>
    | SetTodolistsActionType
    | SetStatusType
    | setErrorType

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}
