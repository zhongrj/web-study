"use strict";

import React from 'react';
import {Card, Form, Input, Button, Icon} from 'antd';
const {Item} = Form;
import {Ajax} from '../../../common';

import './Login.scss';



class Login extends React.Component {

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                return false;
            }
            console.log(values);
            Ajax({
                url: '/login',
                type: 'POST_JSON',
                data: {
                    source: 'web',
                    macId: '123123',
                    user: values
                },
                success: (data) => {
                    console.log(data);
                }
            });
        });
    }

    render() {

        const {getFieldDecorator} = this.props.form;

        return (
            <div className="zzone-login">

                <div className="zzone-login-bg"/>

                <Card title="登录" className="zzone-login-content">
                    <Form className="zzone-login-form">
                        <Item>
                            {getFieldDecorator('account', {
                                rules: [{required: true, message: '用户名不能为空'}],
                            })(
                                <Input size="large" prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                       placeholder="用户名/手机号/邮箱"/>
                            )}
                        </Item>

                        <Item>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: '密码不能为空'}],
                            })(
                                <Input size="large" prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                                       placeholder="密码"/>
                            )}
                        </Item>

                        <Item>
                            <Button type="primary" className="zzone-login-button"
                                    onClick={this.handleSubmit.bind(this)}>
                                登陆
                            </Button>
                            <div className="zzone-login-help">
                                <a href="#forgetPassword">忘记密码</a>
                                <span>|</span>
                                <a href="#register">立即注册</a>
                            </div>
                        </Item>
                    </Form>
                </Card>

            </div>
        );
    }
}

Login = Form.create()(Login);
export default Login;