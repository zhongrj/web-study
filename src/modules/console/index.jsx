"use strict";

import React from 'react';

import HorizontalLayout from "../../common/layouts/main/HorizontalLayout";
import SideMenu from '../../common/components/menu/SideMenu';

export default class Console extends React.Component {
    render() {
        return (
            <HorizontalLayout side={SideMenu} />
        );
    }
}