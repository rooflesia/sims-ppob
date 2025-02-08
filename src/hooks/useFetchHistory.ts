import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { getTransactions } from "../redux/slices/historySlice";

const useFetchHistory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { transactions, loading, error, offset, limit, hasMore } = useSelector(
    (state: RootState) => state.history
  );

  useEffect(() => {
    if (transactions.length === 0) {
      dispatch(getTransactions({ offset, limit }));
    }
  }, [dispatch, offset, limit, transactions.length]);

  const fetchMore = () => {
    if (hasMore && !loading) {
      dispatch(getTransactions({ offset, limit }));
    }
  };

  return {
    transactions,
    loading,
    error,
    fetchMore,
    hasMore,
  };
};

export default useFetchHistory;
