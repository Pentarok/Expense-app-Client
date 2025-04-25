import React, { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import HomeNavbar from './homeNavbar';

export const homemenuContext = createContext();

const GeneralLayout = () => {
    const [homeMenuOpen, sethomeMenuOpen] = useState(false);

    return (
        <div
            className="min-h-screen bg-cover bg-center"
            style={{ backgroundImage: "url('https://res.cloudinary.com/dtrskzurx/image/upload/v1739979843/expensebg_sfirfe.jpg')" }}
        >
            <homemenuContext.Provider value={{ homeMenuOpen, sethomeMenuOpen }}>
                <HomeNavbar />
                <Outlet />
            </homemenuContext.Provider>
        </div>
    );
};

export default GeneralLayout;
