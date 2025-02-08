import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getTransactions } from "../../redux/slices/historySlice";
import { Button } from "../atoms/Button";
import LoadingBar from "../atoms/LoadingBar";

const TransactionPages: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { transactions, loading, error, offset, limit, hasMore } = useSelector(
    (state: RootState) => state.history
  );

  useEffect(() => {
    dispatch(getTransactions({ offset, limit }));
  }, [dispatch]);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      dispatch(getTransactions({ offset, limit }));
    }
  };

  return (
    <>
    <LoadingBar loading={loading} />
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Semua Transaksi</h1>

      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex justify-between items-center p-4 border rounded-lg shadow-sm"
        >
          <div>
            <p className={`text-lg ${transaction.type === "credit" ? "text-green-500" : "text-red-500"}`}>
              {transaction.type === "credit" ? "+" : "-"} Rp{transaction.amount.toLocaleString("id-ID")}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(transaction.date).toLocaleDateString("id-ID")}
            </p>
          </div>
        </div>
      ))}

      {hasMore && (
        <Button
          text={loading ? "Memuat..." : "Show more"}
          onClick={handleLoadMore}
          disabled={loading}
        />
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
    </>
    
  );
};

export default TransactionPages;
