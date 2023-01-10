import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { contactsReducer } from "./contacts-slice";
import { filterReducer } from "./filter-slice";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['contacts'],
  }

const rootReducer = combineReducers({
    contacts: contactsReducer,
    filter: filterReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
})

export const persistor = persistStore(store)
