import React from 'react'
import { useEffect } from 'react';
import { createContext } from 'react';
import { io } from 'socket.io-client';

export const SocketDataContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`);

const SocketContext = ({ children }) => {

    useEffect(() => {
        // Basic connection logic
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

    }, []);

    return (
        <SocketDataContext.Provider value={{socket}}>
            {children}
        </SocketDataContext.Provider>
    )
}

export default SocketContext