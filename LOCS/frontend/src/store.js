import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "~/features";


//TODO надо добавить redux-logger для отладки, вроде хорошая штука
export const store = configureStore({
    reducer: rootReducer
})
