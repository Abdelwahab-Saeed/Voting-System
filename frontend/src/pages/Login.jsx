import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const Login = () => {
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Email is required')
        .email('Please enter a valid email address'),
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters'),
    }),
    onSubmit: async (values) => {
      setApiError('');
      setLoading(true);
      try {
        const { data } = await axiosInstance.post('/login', values);
        login(data.access_token, data.user);

        if (data.user.status !== 'approved') {
          showToast('Your account is pending admin approval.', 'warning');
          navigate('/pending-approval');
        } else {
          showToast('Welcome back! You have logged in successfully.', 'success');
          navigate('/');
        }
      } catch (error) {
        const message =
          error.response?.data?.message || 'Something went wrong. Please try again.';
        setApiError(message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="auth-page d-flex justify-content-center align-items-center">
      <div className="auth-card card shadow-lg border-0" style={{ maxWidth: '460px', width: '100%' }}>
        <div className="card-body p-4 p-md-5">

          <div className="text-center mb-4">
            <h3 className="fw-bold mb-1">Welcome Back</h3>
            <p className="text-muted small">Sign in to your account</p>
          </div>


          {apiError && (
            <div className="alert alert-danger d-flex align-items-center py-2" role="alert">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="me-2 flex-shrink-0" viewBox="0 0 16 16">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
              </svg>
              <span className="small">{apiError}</span>
            </div>
          )}

          <form onSubmit={formik.handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold small">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : formik.touched.email ? 'is-valid' : ''}`}
                placeholder="you@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="invalid-feedback">{formik.errors.email}</div>
              )}
            </div>


            <div className="mb-4">
              <label htmlFor="password" className="form-label fw-semibold small">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : formik.touched.password ? 'is-valid' : ''}`}
                placeholder="••••••••"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="invalid-feedback">{formik.errors.password}</div>
              )}
            </div>


            <button
              type="submit"
              className="btn btn-primary w-100 py-2 fw-semibold"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>


          <p className="text-center text-muted small mt-4 mb-0">
            Don't have an account?{' '}
            <Link to="/register" className="fw-semibold text-decoration-none">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
