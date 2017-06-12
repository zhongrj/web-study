"use strict";

import React from 'react';
import {} from 'antd';

import './App.scss'

class App extends React.Component{
    render(){
        return (
            <div className="zzone-layout">
                <div className="zzone-layout-header">
                    header
                </div>

                <div className="zzone-layout-content">
                    <div className="zzone-layout-container">
                        <div style={{height: 1200, width: 300}}>
                            main content
                        </div>
                    </div>
                </div>

                <div className="zzone-layout-footer">
                    @CopyRight © ... - Power By zhongrj
                </div>
            </div>
        );
    }
}

export default App;
