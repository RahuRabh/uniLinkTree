import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

//component
import Loader from '../../Loader/Loader'

//styles
import styles from "./Register.module.css";

//register api
import { registerUser } from "../../../apis/auth";

export default function Register({ setCurrentView }) {
  const methods = useForm();
  const [errorMessage, seterrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  //to check form errors
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = methods;

  const password = React.useRef({});
  password.current = watch("password", "");

  // to check submit handler
  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const response = await registerUser(data);
      if (response.errorMessage) {
        seterrorMessage(response.errorMessage);
      } else {
        setLoading(false);
        setCurrentView("login");
      }
    } catch (error) {
      console.log("Error:", error.message);
      seterrorMessage("An unexpected error occurred.");
      setLoading(false);
    }
  };

  // Render loader component if loading is true
  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.registerContainer}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              className={errors.name ? styles.error : ""}
              placeholder={errors.name ? errors.name.message : ""}
              {...register("name", { required: "Invalid Name" })}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className={errors.email ? styles.error : ""}
              placeholder={errors.email ? errors.email.message : ""}
              {...register("email", {
                required: "Email required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
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
              {...register("password", { required: "Password required" })}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              className={errors.confirmPassword ? styles.error : ""}
              placeholder={
                errors.confirmPassword ? errors.confirmPassword.message : ""
              }
              {...register("confirmPassword", {
                required: "Confirm Password required",
                validate: (value) =>
                  value === password.current || "Passwords does'nt match",
              })}
            />
          </div>
          <p className={styles.errorMessage}>{errorMessage}</p>
          <button className={styles.btn} type="submit">
            Sign Up
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
