// import { configureStore } from '@reduxjs/toolkit';
// import slice from './slices/mainSlice';

// export const store = configureStore({
//     reducer: {
//         todos: slice.reducer,
//     },
// })

// export default store;

import slice from './slices/mainSlice';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const rootReducer = combineReducers({
    todos: slice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

export default store;