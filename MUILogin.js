import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";


const validationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Password must contain at least one uppercase letter")
    .required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[!@#$%^&*]/, "Password must contain at least one special character")
    .required("Password is required"),
});

const Login = ({handleLogin}) => {
  const navigate = useNavigate();
  const handleSubmit = (values, { setSubmitting }) => {
    // Simulate an API call
    /*setTimeout(() => {
      console.log("Form submitted:", values);
      alert("Login successful!");
      setSubmitting(false);
    }, 1000);*/
    debugger;
    handleLogin();
    navigate("/dashboard");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px', borderRadius: '15px' }}>
        <Box textAlign="center" marginBottom={3}>
          <Typography variant="h4">Login</Typography>
        </Box>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <Field
                  name="email"
                  as={TextField}
                  label="Email"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  helperText={<ErrorMessage name="email" />}
                />
              </div>
              <div>
                <Field
                  name="password"
                  as={TextField}
                  label="Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  helperText={<ErrorMessage name="password" />}
                />
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ marginTop: '20px', borderRadius: '15px' }}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default Login;
