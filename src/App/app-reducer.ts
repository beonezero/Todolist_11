export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

const initialState = {
    status: "loading" as RequestStatusType
}

type InitialStateType = typeof initialState
type ActionType = any

export const appReducer = (state: InitialStateType = initialState , action: ActionType) => {
    switch (action.type){
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        default: return state
    }
}

const setLoading = (status: RequestStatusType) => ({type: "SET-LOADING", status})

type SetLoadingType = ReturnType<typeof setLoading>

type ActionsType = SetLoadingType