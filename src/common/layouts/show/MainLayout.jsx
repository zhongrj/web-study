"use strict";

import React from 'react';

import './MainLayout.scss'

export default class MainLayout extends React.Component{
    render(){
        let Header = this.props.header;
        let Footer = this.props.footer;
        return (
            <div className="zzone-layout">
                <div className="zzone-layout-header">
                    <Header/>
                </div>

                <div className="zzone-layout-content">
                    <div className="zzone-layout-container">
                        <div style={{height: 1200, width: 300}}>
                            {this.props.children}
                        </div>
                    </div>
                </div>

                <div className="zzone-layout-footer">
                    <Footer/>
                </div>
            </div>
        );
    }
}