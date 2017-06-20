"use strict";

import React from 'react';
import {Card, Form, Input, Button, Icon} from 'antd';
const {Item} = Form;
import {Ajax, Session} from '../../../common';
import {Url, getBaseModel, LocationHash} from '../../config/Config';

import './Login.scss';

class Login extends React.Component {

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                return false;
            }
            let model = getBaseModel();
            model.user = values;
            Ajax({
                url: Url.login,
                type: 'POST_JSON',
                data: model,
                success: (data) => {
                    document.cookie = "token=" + data.content.token;
                    Session.token = data.content.token;
                    location.hash = LocationHash.index;
                }
            });
        });
    }

    render() {

        if (Session.token) {
            location.hash = LocationHash.index;
        }

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