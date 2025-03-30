import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputField from "../components/inputField";
import { ValidateHook } from "../hooks/login";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AxiosError } from "axios";

const userSchema = z.object({
  id: z.number({ invalid_type_error: "id required" }).int("id format is wrong"),
  password: z.string().min(6, "Password must be atleast 6 characters"),
});

type UserFormData = z.infer<typeof userSchema>;

const UserForm = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const loginMutation = ValidateHook();

  const onSubmit = (data: UserFormData) => {
    console.log("Submitted data:", data);
    setLoginError("");
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        console.log(response.message);
        navigate("/home");
      },
      onError: (error) => {
        const axiosError = error as AxiosError<{ message?: string }>;
        if (axiosError.response) {
          setLoginError(axiosError.response.data.message || "Login failed!");
        } else {
          setLoginError(error.message);
        }
      },
    });
  };

  return (
    <div className="login">
      <h3>Welcome Back!</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          placeholder="UID"
          register={register("id", { valueAsNumber: true })}
          error={errors.id?.message}
          type="number"
        />
        <InputField
          register={register("password")}
          error={errors.password?.message}
          type="password"
          placeholder="Password"
        />
        {loginError && <p className="error">*{loginError}</p>}
        <button type="submit" disabled={loginMutation.status === "pending"}>
          {loginMutation.status === "pending" ? "loggin in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
