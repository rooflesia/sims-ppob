import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getTransactions, resetTransactions } from "../../redux/slices/historySlice";
import { Button } from "../atoms/Button";
import LoadingBar from "../atoms/LoadingBar";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

const TransactionPages: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { records, loading, error, offset, limit, hasMore } = useSelector(
    (state: RootState) => state.history
  );

  useEffect(() => {
    dispatch(resetTransactions())
    console.log("Dispatch getTransactions:", { offset, limit });
    dispatch(getTransactions({ offset: 0, limit }));
  }, [dispatch, limit]);

  const handleLoadMore = async () => {
    if (hasMore && !loading) {
      await dispatch(getTransactions({ offset, limit }));
    }
  };

  return (
    <>
    <LoadingBar loading={loading} />
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Semua Transaksi</h1>

      {records.map((transaction) => (
        <div
          key={transaction.invoice_number}
          className="flex justify-between items-center p-4 my-4 border rounded-lg shadow-sm"
        >
          <div>
            <p className={`text-xl font-semibold ${transaction.transaction_type === "TOPUP" ? "text-green-500" : "text-red-500"}`}>
              {transaction.transaction_type === "TOPUP" ? "+" : "-"} {formatCurrency(transaction.total_amount)}
            </p>
            <p className="text-sm text-gray-500">
              {formatDate(transaction.created_on)}
            </p>
          </div>
          <div>
            <p className={`text-sm font-medium`}>
              {transaction.description}
            </p>
          </div>
        </div>
      ))}

      {hasMore && (
        <Button
          text={loading ? "Memuat..." : "Show more"}
          onClick={() => handleLoadMore()}
          disabled={loading}
        />
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
    </>
    
  );
};

export default TransactionPages;
