import {configureStore} from '@reduxjs/toolkit'
import CodeSlice from './CodeSlice'
import ProblemSlice from './ProblemSlice'

const store = configureStore({
    reducer: {
        problem: ProblemSlice,
        code: CodeSlice
    }
})

export type RootState = ReturnType<typeof store.getState>

export default store