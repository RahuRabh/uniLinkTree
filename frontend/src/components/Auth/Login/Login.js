import toast from "react-hot-toast";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";

//styles
import styles from "./Login.module.css";

//components
import Loader from "../../Loader/Loader";
import { loginUser } from "../../../apis/auth";

// Utils
import { useAuth } from "../../../utils/AuthProvider"

export default function Login({ onClose }) {
  const methods = useForm();
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await loginUser(data);

      setUser({
        userId: response.userId,
        name: response.name,
        linkUrl: response.linkUrl,
      });

      toast.success("Login Successful");
      navigate("/");
      onClose();
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      setErrorMessage(message);
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      {loading && <Loader />}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className={errors.email ? styles.error : ""}
              placeholder={errors.email ? errors.email.message : ""}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className={errors.password ? styles.error : ""}
              placeholder={errors.password ? errors.password.message : ""}
              {...register("password", {
                required: "Password is required",
              })}
            />
          </div>

          <p className={styles.errorMessage}>{errorMessage}</p>
          <button type="submit">Login</button>
        </form>
      </FormProvider>
    </div>
  );
}
