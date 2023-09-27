import {setError, setStatus} from "../App/app-reducer";
import {Dispatch} from "redux";

export const handleServerNetworkError = (dispatch: Dispatch, error: string) => {
    dispatch(setError(error))
    dispatch(setStatus("failed"))
}