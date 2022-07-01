import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../../redux";

export const useStateSelector: TypedUseSelectorHook<RootState> = useSelector;
