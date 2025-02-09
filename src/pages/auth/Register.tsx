import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { post } from "../../config/api";
import { toast } from "react-toastify";
import Input from "../../components/atoms/Input";
import { Button } from "../../components/atoms/Button";
import { AtSymbolIcon, LockClosedIcon, UserIcon } from "@heroicons/react/24/solid";
import { registerSchema } from "../../validation/authSchema";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const temp = {
        "email": data.email,
        "first_name": data.firstName,
        "last_name": data.lastName,
        "password": data.password,
    }
      const posts = await post("/registration", temp);
      
      if (posts) toast.success("Registrasi berhasil!");
      navigate("/login");
    } catch {
      toast.error("Registrasi gagal.");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-col justify-center items-center lg:w-1/2 sm:w-full bg-white p-10 shadow-lg">
        <div className="flex flex-row">
          <img src="/Logo.png" alt="SIMS PPOB" className="w-8 h-8 mr-2" />
          <h1 className="text-2xl font-bold text-black mb-4">SIMS PPOB</h1>
        </div>
        <h2 className="text-xl font-semibold mb-6">Lengkapi data untuk membuat akun</h2>

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
          <div className={errors.firstName ? "mb-8" : "mb-4"}>
            <Input
              {...register("firstName")}
              type="text"
              placeholder="Nama depan"
              iconLeft={<UserIcon className="w-4 h-4 text-gray-400" />}
              error={errors.firstName}
            />
          </div>
          <div className={errors.lastName ? "mb-8" : "mb-4"}>
            <Input
              {...register("lastName")}
              type="text"
              placeholder="Nama belakang"
              iconLeft={<UserIcon className="w-4 h-4 text-gray-400" />}

              error={errors.lastName}
            />
          </div>
          <div className={errors.password ? "mb-8" : "mb-4"}>
            <Input
              {...register("password")}
              type="password"
              placeholder="Buat password"
              iconLeft={<LockClosedIcon className="w-4 h-4 text-gray-400" />}
              error={errors.password}
            />
          </div>
          <div className={errors.confirmPassword ? "mb-10" : "mb-6"}>
            <Input
              {...register("confirmPassword")}
              type="password"
              placeholder="Konfirmasi password"
              iconLeft={<LockClosedIcon className="w-4 h-4 text-gray-400" />}
              error={errors.confirmPassword}
            />
          </div>
          <Button variant={"default"} size={"default"} text="Registrasi" type="submit" />
        </form>
        <p className="text-gray-500 text-sm mt-4">
          Sudah punya akun? Login{" "}
          <a href="/login" className="text-red-600 font-bold hover:underline">
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

export default Register;
