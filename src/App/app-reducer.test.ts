import {appReducer, InitialStateType, setError, setStatus} from "./app-reducer";

let startState: InitialStateType;
beforeEach(() => {
    startState = {
        status: "idle",
        error: null
    };
});

test("set status", () => {
    const action = setStatus("loading");

    const endState = appReducer(startState, action)

    expect(endState.status).toBe("loading");
});

test("set error", () => {
    const action = setError("Some error");

    const endState = appReducer(startState, action)

    expect(endState.error).toBe("Some error");
});