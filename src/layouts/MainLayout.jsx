"use strict";
import React from 'react';
import { Menu, Dropdown, Icon, Breadcrumb, Modal } from 'antd';

import './MainLayout.scss';

export default class MainLayout extends React.Component {
    render() {
        return (
            <div className="zzone-layout">
                <aside className="zzone-layout-aside">
                    aside
                </aside>
                <div className="zzone-layout-main">
                    main
                </div>
            </div>
        );
    }
}