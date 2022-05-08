import { useDispatch } from "react-redux";
import { RootDispatch } from "../../redux";

export const useActionDispatch = () => useDispatch<RootDispatch>();
