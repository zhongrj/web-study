
import React from 'react';
import AJAX from '../../utils/ajax';
import RSA from '../../utils/rsa';
import { Form, Row, Col, Input, Button } from 'antd';
const FormItem = Form.Item;

export default Form.create()(React.createClass({
    getInitialState() {
        return {
            passwordDirty: false,
        };
    },
    handleSubmit(e) {
        e.preventDefault();
        // const onSubmit = this.props.onSubmit;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                console.log( values )
                AJAX({
                    url: 'RSA_KEY',
                    type: 'POST',
                    success: res => {
                        const data = res.content;
                        const key = RSA.getKeyPair( data.e, '', data.n );
                        const oldPwd = RSA.encryptedString(key, values.oldPwd);
                        const newPwd = RSA.encryptedString(key, values.newPwd);
                        AJAX({
                            url: 'PWD_EDIT',
                            type: 'POST',
                            data: {
                                oldPassword: oldPwd,
                                newPassword: newPwd,
                            },
                            success: res => {
                                this.setState({ errorMsg: res.msg });
                                if (res.status === 'success') {
                                    this.setState({ showMsg: false });
                                    location.href = '#/';
                                } else {
                                    this.setState({ showMsg: true, msgType: 'error' });
                                }
                            }
                        });
                    }
                });
            }
        });
    },
    handlePasswordBlur(e) {
        const value = e.target.value;
        this.setState({ passwordDirty: this.state.passwordDirty || !!value });
    },
    checkPassword(rule, value, callback) {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('newPwd')) {
            callback('两次输入密码不一致！');
        } else {
            callback();
        }
    },
    checkConfirm(rule, value, callback) {
        const form = this.props.form;
        if (value && this.state.passwordDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    },
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } };
        const tailFormItemLayout = { wrapperCol: { span: 14, offset: 6 } };
        return (
            <Row>
                <Col span='12'>
                    <Form horizontal onSubmit={this.handleSubmit}>
                        <FormItem {...formItemLayout} label="旧密码" hasFeedback>
                            {getFieldDecorator('oldPwd', {
                                rules: [{
                                    required: true, message: '请填写旧密码！'
                                }]
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="新密码" hasFeedback /*help="密码为6-20位字符，由字母和数字组成"*/>
                            {getFieldDecorator('newPwd', {
                                rules: [{
                                    required: true, message: '请填写新密码！',
                                }, {
                                    validator: this.checkConfirm
                                }]
                            })(
                                <Input type="password" onBlur={this.handlePasswordBlur} />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="确认新密码" hasFeedback>
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: true, message: '请再次输入密码！'
                                }, {
                                    validator: this.checkPassword
                                }]
                            })(
                                <Input type="password" placeholder="两次输入密码保持一致" />
                            )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" size="large">确定</Button>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        )
    }
}));
