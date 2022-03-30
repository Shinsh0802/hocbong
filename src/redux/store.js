import { configureStore } from '@reduxjs/toolkit';
import loadingSlice from '../components/shared/Loading/loadingSlice';
import profileSlice from '../components/Student/Profile/profileSlice';


export default configureStore({
    reducer: {
        loading: loadingSlice,
        profile: profileSlice
    }
});