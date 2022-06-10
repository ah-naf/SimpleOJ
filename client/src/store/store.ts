import {configureStore} from '@reduxjs/toolkit'
import ProblemSlice from './ProblemSlice'

const store = configureStore({
    reducer: {
        problem: ProblemSlice
    }
})

export type RootState = ReturnType<typeof store.getState>

export default store