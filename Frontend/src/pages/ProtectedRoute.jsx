import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { DataUserContext } from '../context/UserContext';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true)
    const { user, setUser } = useContext(DataUserContext)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            // alert("You are not authorized to view this page. Please login first.");
            navigate('/login');
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            if (response.status === 200) {
                setUser(response.data.captain);
                setIsLoading(false);
            } else {
                navigate('/login');
            }
        }).catch((error) => {
            localStorage.removeItem('token'); // Clear token if there's an error
            navigate('/login');
        });
    }, [navigate]);

    if (isLoading) return <div>Loading...</div>;


    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoute