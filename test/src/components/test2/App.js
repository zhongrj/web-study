"use strict";
import React, {Component} from 'react'
import {Layout} from 'antd';
const {Header, Content, Footer} = Layout;

import 'App.scss';

class App extends Component {
    render() {
        return (
            <Layout>
                <Header>
                    header
                </Header>
                <Layout>
                    <Layout.Sider>left sidebar</Layout.Sider>
                    <Content>main content</Content>
                    <Layout.Sider>right sidebar</Layout.Sider>
                </Layout>
                <Footer>footer</Footer>
            </Layout>
        );
    }
}

export default App