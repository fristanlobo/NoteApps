import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/LoginSlice';

const appStore = configureStore({
    reducer: {
        user: userReducer,
    }
})

export default appStore;