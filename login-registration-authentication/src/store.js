import { configureStore } from '@reduxjs/toolkit';
import authenticationSlice from './redux/authSlice'

const store = configureStore({
    reducer: {
        user: authenticationSlice
    }
})

export default store;