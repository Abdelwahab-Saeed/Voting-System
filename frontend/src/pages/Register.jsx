import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { useToast } from '../context/ToastContext';

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 2 * 1024 * 1024;

export const Register = () => {
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const { showToast } = useToast();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            profile_photo: null,
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Name is required')
                .min(3, 'Name must be at least 3 characters'),
            email: Yup.string()
                .required('Email is required')
                .email('Please enter a valid email address'),
            password: Yup.string()
                .required('Password is required')
                .min(8, 'Password must be at least 8 characters'),
            confirmPassword: Yup.string()
                .required('Please confirm your password')
                .oneOf([Yup.ref('password')], 'Passwords must match'),
            profile_photo: Yup.mixed()
                .nullable()
                .test('fileSize', 'File size must be less than 2MB', (value) => {
                    if (!value) return true;
                    return value.size <= MAX_FILE_SIZE;
                })
                .test('fileFormat', 'Only JPG, PNG, JPEG, and WebP are allowed', (value) => {
                    if (!value) return true;
                    return SUPPORTED_FORMATS.includes(value.type);
                }),
        }),
        onSubmit: async (values) => {
            setApiError('');
            setLoading(true);

            try {
                const formData = new FormData();
                formData.append('name', values.name);
                formData.append('email', values.email);
                formData.append('password', values.password);
                formData.append('password_confirmation', values.confirmPassword);
                if (values.profile_photo) {
                    formData.append('profile_photo', values.profile_photo);
                }

                const { data } = await axiosInstance.post('/register', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                showToast(data.message || 'Registration successful! Your account is pending admin approval.', 'success');
                navigate('/pending-approval');
            } catch (error) {
                if (error.response?.data?.errors) {
                    const errors = error.response.data.errors;
                    const firstError = Object.values(errors)[0];
                    setApiError(Array.isArray(firstError) ? firstError[0] : firstError);
                } else {
                    setApiError(error.response?.data?.message || 'Something went wrong. Please try again.');
                }
            } finally {
                setLoading(false);
            }
        },
    });

    const handleFileChange = (event) => {
        const file = event.currentTarget.files[0];
        formik.setFieldValue('profile_photo', file || null);

        if (file && SUPPORTED_FORMATS.includes(file.type)) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    return (
        <div className="auth-page d-flex justify-content-center align-items-center">
            <div className="auth-card card shadow-lg border-0" style={{ maxWidth: '520px', width: '100%' }}>
                <div className="card-body p-4 p-md-5">
                    <div className="text-center mb-4">
                        <h3 className="fw-bold mb-1">Create Account</h3>
                        <p className="text-muted small">Join the voting system</p>
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
                        <div className="text-center mb-4">
                            <div
                                className="profile-photo-upload mx-auto"
                                onClick={() => fileInputRef.current?.click()}
                                role="button"
                                tabIndex={0}
                            >
                                {preview ? (
                                    <img src={preview} alt="Profile preview" className="profile-photo-preview" />
                                ) : (
                                    <div className="profile-photo-placeholder">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                                            <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2M14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V4a2 2 0 0 0-1-2M2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1z" />
                                        </svg>
                                        <span className="d-block small mt-1">Upload Photo</span>
                                    </div>
                                )}
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                name="profile_photo"
                                accept="image/jpg,image/jpeg,image/png,image/webp"
                                className="d-none"
                                onChange={handleFileChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.profile_photo && formik.errors.profile_photo && (
                                <div className="text-danger small mt-1">{formik.errors.profile_photo}</div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label fw-semibold small">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : formik.touched.name ? 'is-valid' : ''}`}
                                placeholder="John Doe"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <div className="invalid-feedback">{formik.errors.name}</div>
                            )}
                        </div>

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

                        <div className="mb-3">
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

                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="form-label fw-semibold small">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                className={`form-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : formik.touched.confirmPassword ? 'is-valid' : ''}`}
                                placeholder="••••••••"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
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
                                    Creating Account...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    <p className="text-center text-muted small mt-4 mb-0">
                        Already have an account?{' '}
                        <Link to="/login" className="fw-semibold text-decoration-none">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
