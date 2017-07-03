"use strict";

import React from 'react';
import {Form, Input, Button, Icon, message} from 'antd';
const {Item} = Form;
import {Service} from '../../common/AppCommon';

class Info extends React.Component {

    constructor(props) {
        super(props);

        this.submit = this.submit.bind(this)
    }

    submit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                return false;
            }
            Service.modifyInfo(values, ((data) => {
                console.log(data);
                message.success(data.msg);
            }).bind(this));
        });
    }

    render() {

        const {getFieldDecorator} = this.props.form;

        return (
            <div>
                <Form style={{
                    width: 300,
                    margin: 'auto'
                }}>
                    <Item label="昵称">
                        {getFieldDecorator('name', {
                            rules: [{required: true, message: '昵称不能为空'}],
                        })(
                            <Input size="large" prefix={<Icon type="user"/>} onPressEnter={this.submit}/>
                        )}
                    </Item>

                    <Item label="手机">
                        {getFieldDecorator('mobile', {
                            rules: [{required: true, message: '手机号不能为空'}],
                        })(
                            <Input size="large" prefix={<Icon type="mobile"/>} onPressEnter={this.submit}/>
                        )}
                    </Item>

                    <Item label="邮箱">
                        {getFieldDecorator('email', {
                            rules: [{required: true, message: '邮箱不能为空'}],
                        })(
                            <Input size="large" prefix={<Icon type="mail"/>} onPressEnter={this.submit}/>
                        )}
                    </Item>

                    <Item>
                        <Button type="primary" onClick={this.submit}>
                            保存
                        </Button>
                    </Item>
                </Form>
            </div>
        );
    }
}
export default Form.create()(Info);