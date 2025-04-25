import React, { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import GeneralNavbar from './GeneralNavbar';

export const homemenuContext = createContext();

const GeneralContextLayout = () => {


    return (
        <div
      className='w-full'      
        >

                <GeneralNavbar />
                <Outlet />
         
        </div>
    );
};

export default GeneralContextLayout;
