import { useDispatch } from "react-redux";
import { resetHistory } from "../redux/slices/historySlice";

const useResetHistory = () => {
  const dispatch = useDispatch();

  return () => dispatch(resetHistory());
};

export default useResetHistory;
