import { UserActionType } from "./actionType";
import { UserStateType } from "./stateType";

const INIT_STATE: UserStateType = {
  isLoggedIn: false,
};

export const userReducer = (
  state = INIT_STATE,
  { type, payload }: { type: UserActionType; payload?: any }
) => {
  switch (type) {
    default:
      return state;
  }
};
