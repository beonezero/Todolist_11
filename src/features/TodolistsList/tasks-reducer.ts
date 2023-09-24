import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistsActionType
} from './todolists-reducer';
import {TaskPriorities, TasksApi, TaskStatuses, TaskType} from "../../api/tasks-api";
import {TasksStateType} from "../../App/App";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../App/store";
import {setStatus, SetStatusType} from "../../App/app-reducer";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        }
        case 'ADD-TASK': {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }
        case 'UPDATE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, ...action.modelDomain} : t)
            };
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }

        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case "SET-TASKS": {
            return {...state, [action.todolistId]: action.tasks}
        }
        default:
            return state;
    }
}

// actions

export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, modelDomain: UpdateTaskDomainModelType, todolistId: string) =>
    ({type: 'UPDATE-TASK', modelDomain, todolistId, taskId} as const)
export const setTasksAC = (tasks: TaskType[], todolistId: string) =>
    ({type: "SET-TASKS", tasks, todolistId} as const)

// thunks

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setStatus("loading"))
        TasksApi.getTasks(todolistId)
            .then(res => {
                dispatch(setTasksAC(res.data.items, todolistId))
                dispatch(setStatus("succeeded"))
            })
    }
}

export const deleteTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setStatus("loading"))
        TasksApi.deleteTask(todolistId, taskId)
            .then(res => {
                dispatch(removeTaskAC(taskId, todolistId))
                dispatch(setStatus("succeeded"))
            })
    }
}

export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setStatus("loading"))
        TasksApi.createTask(todolistId, title)
            .then(res => {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setStatus("succeeded"))
            })
    }
}
export const updateTaskTC = (taskId: string, modelDomain: UpdateTaskDomainModelType, todolistId: string) => {
    return (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        dispatch(setStatus("loading"))
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (task) {
            const modelApi = {
                description: task.description,
                title: task.title,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                ...modelDomain
            }
            TasksApi.updateTask(todolistId, taskId, modelApi)
                .then(res => {
                    dispatch(updateTaskAC(taskId, modelDomain, todolistId))
                    dispatch(setStatus("succeeded"))
                })
        }
    }
}

//types

export type UpdateTaskDomainModelType = {
    description?: string
    title?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetStatusType