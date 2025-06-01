import React from 'react'
import { Outlet, Navigate } from 'react-router';
import { isTokenValid } from '../services/auth/usercontext/auth.helpers';
import { useAuth } from "../services/auth/usercontext/UserContext";

const Protected = () => {
    const { token } = useAuth()
    if (!isTokenValid(token)) {
        return <Navigate to="/login" replace />;
    } else {
        return <Outlet />
    }
}

export default Protected