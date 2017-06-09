
import React from 'react';
import { Modal, Form, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

export default Form.create()(
    (props) => {
        const { visible, onCancel, onOk, flowData, list, form } = props;
        const { getFieldDecorator } = form;
        let options = list.map( (item, index) => 
            <Option key={index} value={item.groupName}>{item.groupName}</Option>
        );
        return (
            <Modal
                title="给流程分配规则组"
                visible={visible}
                onOk={onOk}
                onCancel={onCancel}
            >
                <Form horizontal>
                {
                    flowData.map((item, idx) => 
                        <FormItem key={idx} label={item.flowName}>
                            {getFieldDecorator(item.flowName, {
                                initialValue: item.rules
                            })(
                                <Select
                                    multiple
                                    style={{ width: '100%' }}
                                    placeholder="请选择"
                                >
                                    { options }
                                </Select>
                            )}
                        </FormItem>
                    )
                }
                </Form>
            </Modal>
        )
    }
);