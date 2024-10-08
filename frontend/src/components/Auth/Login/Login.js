import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

//styles
import styles from "./Login.module.css";

//components
import { loginUser } from "../../../apis/auth";
import { useNavigate } from "react-router-dom";
import Loader from '../../Loader/Loader'

export default function Login({onClose}) {
  const navigate = useNavigate();
  const methods = useForm();
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  // Destructure methods for easier access
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  //to check submit functionality
  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const response = await loginUser(data);
      if (response.errorMessage) {
        setErrorMessage(response.errorMessage);
      } else {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", response.userId);
        localStorage.setItem("name", response.name);
        localStorage.setItem("userLink", response.linkUrl);
        setLoading(false);
        navigate("/");
        onClose();
      }
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessage("An unexpected error occurred.");
      setLoading(false);
    }
  };

  // Render loader component if loading is true
  if (loading) {
    return <Loader />;
  }

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
