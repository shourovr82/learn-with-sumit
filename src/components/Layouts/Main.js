import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../pages/Common/Navbar';
import useAuthCheck from '../hooks/useAuthCheck';

const Main = () => {
    const authChecked = useAuthCheck();

    return !authChecked ? (
        <div>Checking Authentication...</div>
    ) : (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default Main;