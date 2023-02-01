import { useDispatch } from "react-redux";
import { clear } from "../store/reducers/museReducer";

const useClear = () => {
  const dispatch = useDispatch();
  return () => dispatch(clear());
};

export default useClear;
