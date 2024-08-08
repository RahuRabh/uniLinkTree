import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

//styles
import styles from "./Login.module.css";

//components
import { loginUser } from "../../../apis/auth";
import { useNavigate } from "react-router-dom";


export default function Login({onClose}) {
  const navigate = useNavigate();
  const methods = useForm();
  const [errorMessage, setErrorMessage] = useState();

  //to check errors
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  //to check submit functionality
  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      if (response.errorMessage) {
        setErrorMessage(response.errorMessage);
      } else {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", response.userId);
        localStorage.setItem("name", response.name);
        localStorage.setItem("userLink", response.linkUrl);
        navigate("/");
        onClose();
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
        <div className={styles.loginContainer}>
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
