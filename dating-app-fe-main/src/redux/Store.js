import { configureStore } from '@reduxjs/toolkit';
import { rootReducers } from './RootReducers';
import createSagaMiddleware from 'redux-saga'
import saga from './saga/Sagas';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import AsyncStorage from '@react-native-async-storage/async-storage';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel1,
    whitelist: ['loginReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [sagaMiddleware, logger],
});

const persistedStore = persistStore(store);
export {
    store,
    persistedStore
}


sagaMiddleware.run(saga);