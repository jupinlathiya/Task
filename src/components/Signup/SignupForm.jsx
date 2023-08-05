import React, { useCallback } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser, signupUser } from "../../redux/feature/userSlice";
import CryptoJS from "crypto-js";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

function encryption(password) {
  const encrypted = CryptoJS.AES.encrypt(
    password,
    import.meta.env.VITE_SECRET_KEY
  ).toString();

  return encrypted;
}

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    (values, { resetForm }) => {
      // Get stored users from local storage
      const storedUsers = localStorage.getItem("users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      // Check if email is already registered
      const emailExists = users.some((user) => user.email === values.email);

      if (emailExists) {
        // this email is already registered, show toast error
        toast.error("This email is already registered", {
          position: toast.POSITION.TOP_RIGHT,
          transition: Slide,
          autoClose: 1000,
        });
        return;
      } else {
        const user = {
          username: values.username,
          email: values.email,
          password: encryption(values.password),
        };
        dispatch(signupUser(user));
        navigate("/");
        dispatch(loginUser({ email: values.email, password: values.password }));
        resetForm();
      }
    },
    [dispatch, navigate]
  );

  const goToLogin = () => {
    navigate("/login"); // Navigate to the login page when the link is clicked
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4 className="mb-0">Signup</h4>
            </div>
            <div className="card-body">
              <Formik
                initialValues={{ username: "", email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <Field
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      placeholder="Enter username"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="error-msg text-danger"
                    />
                  </div>
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
                    Signup
                  </button>
                </Form>
              </Formik>
            </div>
            <div className="card-footer">
              <p className="mb-0">
                Already have an account?
                <a onClick={goToLogin}>Login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
