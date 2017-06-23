"use strict";

import React from 'react';
import {Card, Form, Input, Button, Icon} from 'antd';
const {Item} = Form;
import CookieUtils from '../../utils/CookieUtils';
import {LocationHash} from '../../config/Config';

import './Login.scss';

class Login extends React.Component {

    constructor(props){
        super(props);

        this.submit = this.submit.bind(this)
    }

    submit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                return false;
            }
            this.props.login(values);
        });
    }

    render() {

        if (CookieUtils.get('token')) {
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
                                       placeholder="用户名/手机号/邮箱" onPressEnter={this.submit}/>
                            )}
                        </Item>

                        <Item>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: '密码不能为空'}],
                            })(
                                <Input size="large" prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                                       placeholder="密码" onPressEnter={this.submit}/>
                            )}
                        </Item>

                        <Item>
                            <Button type="primary" className="zzone-login-button"
                                    onClick={this.submit}>
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