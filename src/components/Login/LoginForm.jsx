import React, { useCallback } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/feature/userSlice";
import { toast, Slide } from "react-toastify";
import CryptoJS from "crypto-js";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

// password Decryption function
export function decryption(password) {
  const decrypted = CryptoJS.AES.decrypt(
    password,
    import.meta.env.VITE_SECRET_KEY
  ).toString(CryptoJS.enc.Utf8);
  return decrypted;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    (values, { resetForm }) => {
      // Get stored users from local storage
      const storedUsers = localStorage.getItem("users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      // Check if the user exists
      const isRegister = users.filter((user) => user.email === values.email);

      if (isRegister.length === 0) {
        // User does not exist, show error toast
        toast.error("User Does Not Exist", {
          position: toast.POSITION.TOP_RIGHT,
          transition: Slide,
          autoClose: 1000,
        });
        return;
      } else {
        // User exists, check password validity
        const user = users.filter(
          (user) =>
            user.email === values.email &&
            decryption(user.password) === values.password
        );

        if (user.length !== 0) {
          // Password is correct, dispatch login action, navigate to home, and reset form
          dispatch(loginUser(values));
          navigate("/");
          resetForm();
        } else {
          // Wrong password, show warning toast
          toast.warn("Wrong Password", {
            position: toast.POSITION.TOP_RIGHT,
            transition: Slide,
            autoClose: 1000,
          });
          navigate("/login");
        }
      }
    },
    [dispatch, navigate]
  );
  const goToSignup = () => {
    navigate("/signup"); // Navigate to the signup page when the link is clicked
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4 className="mb-0">Login</h4>
            </div>
            <div className="card-body">
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Enter email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error-msg text-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error-msg text-danger"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary m-3">
                    Login
                  </button>
                </Form>
              </Formik>
            </div>
            <div className="card-footer">
              <p className="mb-0">
                Don't have an account?
                <a onClick={goToSignup}>Signup</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
