import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { DataCaptainContext } from '../context/CaptainContext';

const CaptainProtectedRoute = ({ children }) => {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const { captain, setCaptain } = useContext(DataCaptainContext);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            if (response.status === 200) {
                setCaptain(response.data);
                setIsLoading(false);
            } else {
                navigate('/captain-login');
            }
        }).catch((error) => {
            localStorage.removeItem('token'); // Clear token if there's an error
            navigate('/captain-login');
        });
    }, [navigate]);



    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            {children}
        </>
    )
}

export default CaptainProtectedRoute