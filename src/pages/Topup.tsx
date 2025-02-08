import { useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { topUpBalance } from "../redux/slices/topupSlice";
import { AppDispatch } from "../redux/store";
import { topUpSchema } from "../validation/transactionSchema";
import Input from "../components/atoms/Input";
import { Button } from "../components/atoms/Button";

const TopUp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(topUpSchema),
  });

  const onSubmit = (data: any) => {
    dispatch(topUpBalance(data.amount));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Top-Up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("amount")} type="number" placeholder="Masukkan nominal" error={errors.amount} />
        <Button text="Top-Up" />
      </form>
    </div>
  );
};

export default TopUp;
