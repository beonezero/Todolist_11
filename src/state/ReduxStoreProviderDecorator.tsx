import React from 'react';
import {Provider} from "react-redux";
import {AppRootStateType} from "./store";
import {tasksReducer} from "./tasks-reducer";
import {combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/tasks-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: "", order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: "", order: 0}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(), title: "html", status: TaskStatuses.Completed, todoListId: "todolistId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {   id: v1(), title: "css", status: TaskStatuses.Completed, todoListId: "todolistId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            }
        ],
        ["todolistId2"]: [
            {id: v1(), title: "book", status: TaskStatuses.Completed, todoListId: "todolistId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: "cucumber", status: TaskStatuses.Completed, todoListId: "todolistId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low}
        ]
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (fn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{fn()}</Provider>
};