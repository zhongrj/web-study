"use strict";
import React from 'react';
import MainLayout from './layouts/MainLayout';
import Test1 from "./components/Test1";
import Test2 from "./components/Test2";

const Test = () => (
    <MainLayout>
        <Test1/>
        <Test2/>
    </MainLayout>
);

export default Test;