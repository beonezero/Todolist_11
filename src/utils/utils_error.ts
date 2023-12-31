import {setError, setStatus} from "../App/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/tasks-api";

export const handleServerNetworkError = (dispatch: Dispatch, error: string) => {
    dispatch(setError(error))
    dispatch(setStatus("failed"))
}

export const handleServerAppError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
    const error = data.messages[0]
    if (error) {
        dispatch(setError(error))
    } else {
        dispatch(setError("Some error"))
    }
}