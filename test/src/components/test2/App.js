"use strict";
import React, {Component} from 'react'
import {Layout, Menu} from 'antd';
const { Header, Sider, Content, Footer } = Layout;


class App extends Component {
    render() {
        return (
            <Layout>
                <Header>header</Header>
                <Layout>
                    <Sider>left sidebar</Sider>
                    <Content>main content</Content>
                    <Sider>right sidebar</Sider>
                </Layout>
                <Footer>footer</Footer>
            </Layout>
        );
    }
}

export default App