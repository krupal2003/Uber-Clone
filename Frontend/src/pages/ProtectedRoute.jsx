import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            // alert("You are not authorized to view this page. Please login first.");
            navigate('/login');
        }
    }, [navigate]);

    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoute