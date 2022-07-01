import { SystemActionType } from "./actionType";
import { SystemStateType } from "./stateType";

const INIT_STATE: SystemStateType = {
  notifications: [],
  isLoading: false,
};

export const systemReducer = (
  state = INIT_STATE,
  { type, payload }: { type: SystemActionType; payload?: any }
) => {
  switch (type) {
    case "LOADER:ACTIVE":
      return { ...state, isLoading: true };
    case "LOADER:INACTIVE":
      return { ...state, isLoading: false };
    case "NOTIFICATION:ADD":
      return { ...state, notifications: payload };
    case "NOTIFICATION:REMOVE":
      return { ...state, notifications: [] };
    default:
      return state;
  }
};
