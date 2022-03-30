import {createSlice} from '@reduxjs/toolkit'    

export const studentMenuSlice = createSlice({
    name: 'studentMenu',
    initialState: {
        status: false
    },
    reducers: {
        changeStatus: (state) => {
            state.status = !state.status
        }
    }
})
export default studentMenuSlice.reducer;