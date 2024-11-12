import {combineReducers, configureStore} from "@reduxjs/toolkit";
import logger from 'redux-logger'
import {ibanValidationAPI} from "../services/IbanValidationService.ts";


const rootReducer = combineReducers({
	[ibanValidationAPI.reducerPath]: ibanValidationAPI.reducer
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
				.concat(ibanValidationAPI.middleware)
				.concat(logger)
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];