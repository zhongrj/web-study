
import './Login.scss';
import React from 'react';
import AJAX from '../../utils/ajax';
import RSA from '../../utils/rsa';
import { Alert, Col, Button, Form, Input, Checkbox } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;

function noop() {
  return false;
}

let Login = React.createClass({

	getInitialState() {
	    return {
	        showMsg: false,
	        errorMsg: this.props.errorMsg || '错误提示的文案',
	        msgType: 'warning'
	    };
	},

	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((errors, values) => {
			if (!!errors) {
				console.log('Errors in form!!!');
				return;
			}
			AJAX({
				url: 'RSA_KEY',
				type: 'POST',
				success: res => {
					const data = res.content;
					const key = RSA.getKeyPair( data.e, '', data.n );
					values.password = RSA.encryptedString(key, values.password);
					AJAX({
						url: 'LOGIN',
						type: 'POST',
						data: values,
						success: res => {
							this.setState({ errorMsg: res.msg });
							if (res.status === 'success') {
								this.setState({ showMsg: false });
								localStorage.setItem( 'userId', values.userId );
								location.href = '#/';
							} else {
								this.setState({ showMsg: true, msgType: 'error' });
							}
						}
					});
				}
			});
		});
	},

	render() {
		const { getFieldDecorator, getFieldError, isFieldValidating } = this.props.form;

		return (
			<div className="yy-login">
				<div className="yy-login-form">
					<div className="yy-login-form_wrap">

						<img src={require('../../assets/logo.png')} width="100" className="yy-login-logo" />

						<div className="yy-form-error" className={ this.state.showMsg ? 'show' : 'hide' }>
							<Alert message={this.state.errorMsg} type={this.state.msgType} showIcon/>							
						</div>

						<Form horizontal>

							<FormItem
								hasFeedback
								help={isFieldValidating('userId') ? '校验中...' : (getFieldError('userId') || []).join(', ')}
							>
								{getFieldDecorator('userId', {
									rules: [{ required: true, whitespace: true, message: '请填用户名' }]
								})(
									<Input placeholder="用户名" />
								)}
							</FormItem>

							<FormItem hasFeedback>
								{getFieldDecorator('password', {
									rules: [{ required: true, whitespace: true, message: '请填写密码' }]
								})(
									<Input type="password" autoComplete="off" placeholder="密码"
										onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
									/>
								)}
							</FormItem>

							<FormItem>
								<Checkbox className="pull-right">记住我（公共场所慎用）</Checkbox>
							</FormItem>

							<FormItem>
								<Button type="primary" className="ant-col-24" size="large" onClick={this.handleSubmit}>登录</Button>
							</FormItem>

						</Form>

					</div>
				</div>
			</div>
		);
	},
});

Login = createForm()(Login)

export default Login;