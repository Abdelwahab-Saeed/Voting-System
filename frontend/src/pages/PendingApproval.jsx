import React from 'react';
import { Link } from 'react-router-dom';

export const PendingApproval = () => {
    return (
        <div className="auth-page d-flex justify-content-center align-items-center">
            <div className="auth-card card shadow-lg border-0 text-center" style={{ maxWidth: '600px', width: '100%' }}>
                <div className="card-body p-5">
                    <p className="alert alert-warning mt-5 text-center" role="alert">
                        Your account is pending admin approval. You cannot vote or receive votes until your account is approved.
                    </p>
                    <Link to="/login" className="btn btn-primary px-5 py-2 fw-semibold">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};
