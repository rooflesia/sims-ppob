import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { post } from "../../config/api";
import Input from "../../components/atoms/Input";
import { loginSchema } from "../../validation/authSchema";
import { Button } from "../../components/atoms/Button";
import { AtSymbolIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import LoadingBar from "../../components/atoms/LoadingBar";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await post("/login", data);
      localStorage.setItem("token", response.data.token);
      toast.success("Login berhasil!", {
        position: "top-right"
      });
      navigate("/");
    } catch {
      toast.error("Login gagal. Periksa kembali email dan password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingBar loading={loading} />
      <div className="flex h-screen">
        <div className="flex flex-col justify-center items-center lg:w-1/2 sm:w-full bg-white p-10 shadow-lg">
          <div className="flex flex-row">
            <img src="/Logo.png" alt="SIMS PPOB" className="w-8 h-8 mr-2" />
            <h1 className="text-2xl font-bold text-black mb-4">SIMS PPOB</h1>
          </div>
          
          <h2 className="text-xl font-semibold mb-6">Masuk atau buat akun untuk memulai</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="w-3/4">
            <div className={errors.email ? "mb-8" : "mb-4"}>
              <Input
                {...register("email")}
                type="email"
                placeholder="Email"
                iconLeft={<AtSymbolIcon className="w-4 h-4 text-gray-400" />}
                error={errors.email}
              />
            </div>
            <div className={errors.password ? "mb-8" : "mb-4"}>
              <Input
                {...register("password")}
                type="password"
                placeholder="Password"
                iconLeft={<LockClosedIcon className="w-4 h-4 text-gray-400" />}
                error={errors.password}
              />
            </div>
            <Button variant={"default"} size={"default"} text="Masuk" type="submit" />
          </form>
          <p className="text-gray-500 text-sm mt-4">
            Belum punya akun? Register{" "}
            <a href="/register" className="text-red-600 font-bold hover:underline">
              disini
            </a>
          </p>
        </div>
        <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-white">
          <img
            src="/illustrasi_login.png"
            alt="Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <ToastContainer />
    </>
    
  );
};

export default Login;
