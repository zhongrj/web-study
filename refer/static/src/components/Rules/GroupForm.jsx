
import React from 'react';
import { Modal, Form, Select, Input } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

export default Form.create()(
    props => {
        const { visible, onCancel, onOk, objList, form, curGroup } = props;
        const { getFieldDecorator } = form;
        const isEditing = !!curGroup.groupName;
        return (
            <Modal 
                title={`${isEditing ? '修改' : '新建'}规则组` }
                visible={visible}
                onOk={onOk}
                onCancel={onCancel}
            >
                <Form>
                    <FormItem label="规则组名" hasFeedback>
                        {getFieldDecorator('groupName', {
                            initialValue: curGroup.groupName,
                            rules: [{ required: true, message: '请输入规则组名' }],
                        })(
                            <Input disabled={ isEditing } />
                        )}
                    </FormItem>
                    <FormItem label="需要用到的业务对象">
                         {getFieldDecorator('factCodeList', {
                             initialValue: curGroup.rgList
                         })(
                            <Select
                                multiple
                                style={{ width: '100%' }}
                                placeholder="请选择"
                            >
                                { objList.map( (item, idx) => <Option key={idx} value={item}>{item}</Option> ) }
                            </Select>
                         )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
);