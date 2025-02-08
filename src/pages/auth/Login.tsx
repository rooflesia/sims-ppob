import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { post } from "../../config/api";
import Input from "../../components/atoms/Input";
import { loginSchema } from "../../validation/authSchema";
import { Button } from "../../components/atoms/Button";
import { AtSymbolIcon, LockClosedIcon } from "@heroicons/react/24/solid";

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
      toast.success("Login berhasil!");
      navigate("/");
    } catch (error) {
      toast.error("Login gagal. Periksa kembali email dan password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-col justify-center items-center lg:w-1/2 sm:w-full bg-white p-10 shadow-lg">
        <h1 className="text-3xl font-bold text-red-600 mb-4">SIMS PPOB</h1>
        <h2 className="text-xl mb-6">Lengkapi data untuk membuat akun</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="w-3/4">
          <div className="mb-4">
            <Input
              {...register("email")}
              type="email"
              placeholder="Email"
              iconLeft={<AtSymbolIcon className="w-4 h-4 text-gray-400" />}
              error={errors.email}
            />
          </div>
          <div className="mb-4">
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
  );
};

export default Login;
