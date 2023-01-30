import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import museReducer from "./reducers/museReducer";

export const store = configureStore({
  reducer: {
    muse: museReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
