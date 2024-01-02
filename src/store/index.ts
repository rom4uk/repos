import { configureStore } from '@reduxjs/toolkit';
import repositoriesReducer from './reducers/repositories';

const store = configureStore({
    reducer: {
        repositories: repositoriesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;