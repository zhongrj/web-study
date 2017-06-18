"use strict";

import React from 'react';
import {Card, Form, Input, Button, Icon} from 'antd';
const {Item} = Form;

import './Register.scss';

class Register extends React.Component {

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    validateConfirmPassword(rule, value, callback) {
        const {getFieldValue} = this.props.form;
        if (value && value !== getFieldValue('password')) {
            callback('两次输入不一致！');
        }
        callback();
    }


    render() {

        const {getFieldDecorator} = this.props.form;

        return (
            <div className="zzone-register">

                <div className="zzone-register-bg"/>

                <Card title="注册" className="zzone-register-content">
                    <Form className="zzone-register-form">
                        <Item>
                            {getFieldDecorator('account', {
                                rules: [{required: true, message: '用户名不能为空'}],
                            })(
                                <Input size="large" prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                       placeholder="用户名"/>
                            )}
                        </Item>

                        <Item>
                            {getFieldDecorator('password', {
                                rules: [
                                    {required: true, message: '密码不能为空'},
                                    {min: 6, max: 20, message: '密码长度应为6-20'}
                                ]
                            })(
                                <Input size="large" prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                                       placeholder="密码"/>
                            )}
                        </Item>

                        <Item>
                            {getFieldDecorator('confirmPassword', {
                                rules: [
                                    {required: true, message: '密码不能为空'},
                                    {validator: this.validateConfirmPassword.bind(this)}
                                ]
                            })(
                                <Input size="large" prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                                       placeholder="再次输入密码"/>
                            )}
                        </Item>

                        <Item>
                            <Button type="primary" className="zzone-register-button"
                                    onClick={this.handleSubmit.bind(this)}>
                                立即注册
                            </Button>
                        </Item>
                    </Form>
                </Card>
            </div>
        );
    }
}

Register = Form.create()(Register);
export default Register;