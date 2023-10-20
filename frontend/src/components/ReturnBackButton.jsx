import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@chakra-ui/react';


const ReturnBackButton = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isHomeRoute = pathname === "/";

    if (isHomeRoute) {
        return null;
    }

    const handleGoBack = () => {
        navigate(-1);
    };

    return <Button color="teal" onClick={handleGoBack}>Back</Button>;
};

export default ReturnBackButton;
