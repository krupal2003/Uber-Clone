import React, { createContext, useState } from 'react';

export const DataCaptainContext = createContext();

export const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const updateCaptain = (newCaptain) => {
        setCaptain(newCaptain);
    }

    const value={
        captain,
        setCaptain,
        updateCaptain,
        isLoading,
        setIsLoading,
        error,
        setError
    }

    return (
        <DataCaptainContext.Provider value={value}>
            {children}
        </DataCaptainContext.Provider>
    );
};

export default CaptainContext;