"use strict";

import React from 'react';
import {Layout} from 'antd';

import './App.scss';

class App extends React.Component {
    render() {
        return (
            <Layout className="zzone-layout">
                <div className="zzone-layout-header">
                    header
                </div>
                <div className="zzone-layout-body">
                    <div className="zzone-layout-sider">
                        <span style={{color: 'white'}}>left sidebar</span>
                    </div>
                    <div className="zzone-layout-content">
                        <div className="zzone-layout-container">
                            <div style={{height: 700}}>
                                main content
                            </div>
                        </div>
                        <div className="zzone-layout-footer">
                            @CopyRight © ... - Power By zhongrj
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

export default App;
