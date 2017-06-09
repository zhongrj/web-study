
import './Polling.scss';
import React from 'react';
import AJAX from '../../utils/ajax';
import { Table, Button, Modal, Form, Input } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const confirm = Modal.confirm;

const showResult = status => {
    if (status === 'success') {
        Modal.success({
            title: '操作成功'
        });
    } else {
        Modal.error({
            title: '操作失败'
        });
    }
}

export default createForm()(React.createClass({
    getInitialState() {
        return {
            showEditJob: false,
            isEditing: false,
            editItem: {}
        }
    },
    componentWillMount() {
        this.refreshData();
    },
    refreshData() {
        AJAX({
            url: 'JOB_LIST',
            type: 'POST',
            success: res => {
                this.setState({ data1: res });
            }
        });
        AJAX({
            url: 'RUN_JOB_LIST',
            type: 'POST',
            success: res => {
                this.setState({ data2: res });
            }
        });
    },
    handleAddJob() {
        this.setState({ showEditJob: true, isEditing: false, editItem: {} });
    },
    handleJobEditOk() {
        this.setState({ showEditJob: false });
    },
    handleJobEditCancel() {
        this.setState({ showEditJob: false });
    },
    handleAction(row, type) {
        let _this = this;
        switch(type) {
            case 'pause':
                confirm({
                    title: '是否暂停该任务？',
                    onOk() {
                        AJAX({
                            url: 'JOB_PAUSE',
                            type: 'POST',
                            data: {
                                jobName: row.jobName,
                                jobGroup: row.jobGroup
                            },
                            success: res => {
                                showResult(res.status);
                                _this.refreshData();
                            }
                        });
                    },
                    onCancel() { },
                });
                break;
            case 'resume':
                confirm({
                    title: '是否启动该任务？',
                    onOk() {
                        AJAX({
                            url: 'JOB_RESUME',
                            type: 'POST',
                            data: {
                                jobName: row.jobName,
                                jobGroup: row.jobGroup
                            },
                            success: res => {
                                showResult(res.status);
                                _this.refreshData();
                            }
                        });
                    },
                    onCancel() { },
                });
                break;
            case 'del':
                confirm({
                    title: '是否删除该任务？',
                    onOk() {
                        AJAX({
                            url: 'JOB_DEL',
                            type: 'POST',
                            data: {
                                jobName: row.jobName,
                                jobGroup: row.jobGroup
                            },
                            success: res => {
                                showResult(res.status);
                                _this.refreshData();
                            }
                        });
                    },
                    onCancel() { },
                });
                break;
            case 'edit':
                this.setState({
                    showEditJob: true,
                    isEditing: true,
                    editItem: row
                });
                break;
            case 'exc':
                confirm({
                    title: '是否立即执行一次该任务？',
                    onOk() {
                        AJAX({
                            url: 'JOB_EXC',
                            type: 'POST',
                            data: {
                                jobName: row.jobName,
                                jobGroup: row.jobGroup
                            },
                            success: res => {
                                showResult(res.status);
                                _this.refreshData();
                            }
                        });
                    },
                    onCancel() { },
                });
                break;
            default: 
                break;
        }
    },
    handleSubmit() {
        let _this = this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            const form = this.props.form;
            form.validateFields((err, values) => {
                if (err) {
                    return;
                }

                console.log('Received values of form: ', values);
                let url = this.state.isEditing ? 'JOB_EDIT' : 'JOB_ADD';
                AJAX({
                    url: url,
                    type: 'POST',
                    data: values,
                    success: res => {
                        if(res.status === 'success') {
                            Modal.success({
                                title: this.state.isEditing ? '修改成功' : '添加成功'
                            });
                            _this.refreshData();
                        } else {
                            Modal.error({
                                title: res.msg
                            });
                        }
                    }
                });
                
                form.resetFields();
                this.setState({ showEditJob: false });
            });
        });
    },
    render() {
        const columns1 = [{
            title: '任务名称',
            dataIndex: 'jobName'
        },{
            title: '任务组名',
            dataIndex: 'jobGroup'
        },{
            title: '任务类名',
            dataIndex: 'jobClass'
        },{
            title: '触发器名称',
            dataIndex: 'triggerName'
        },{
            title: '触发器组名',
            dataIndex: 'triggerGroup'
        },{
            title: 'CRON表达式',
            dataIndex: 'cronExpression'
        },{
            title: '状态',
            dataIndex: 'status'
        },{
            title: '操作',
            render: (test, record) => (
                <span>
                    <a href="javascript: void(0);" onClick={this.handleAction.bind(this, record, 'pause')}>暂停</a>
                    <span className="ant-divider" />
                    <a href="javascript: void(0);" onClick={this.handleAction.bind(this, record, 'resume')}>启动</a>
                    <span className="ant-divider" />
                    <a href="javascript: void(0);" onClick={this.handleAction.bind(this, record, 'del')}>删除</a>
                    <span className="ant-divider" />
                    <a href="javascript: void(0);" onClick={this.handleAction.bind(this, record, 'edit')}>修改</a>
                    <span className="ant-divider" />
                    <a href="javascript: void(0);" onClick={this.handleAction.bind(this, record, 'exc')}>立即执行一次</a>
                </span>
            )
        },{
            title: '备注',
            dataIndex: 'description'
        },{
            title: '参数串',
            dataIndex: 'jobDataParams'
        }];

        const columns2 = [{
            title: '任务名称',
            dataIndex: 'jobName'
        },{
            title: '任务组名',
            dataIndex: 'jobGroup'
        },{
            title: '触发器名称',
            dataIndex: 'triggerName'
        },{
            title: '触发器组名',
            dataIndex: 'triggerGroup'
        },{
            title: 'CRON表达式',
            dataIndex: 'cronExpression'
        },{
            title: '备注',
            dataIndex: 'description'
        },{
            title: '参数串',
            dataIndex: 'jobDataParams'
        }];
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } };
        let editJobObj = this.state.editItem;
        return (
            <div>
                <Button type="primary" onClick={this.handleAddJob}>添加任务</Button>
                <Table 
                    columns={columns1} 
                    dataSource={this.state.data1} 
                    title={() => '已配置的 任务-触发器 列表'} 
                    pagination={false} 
                />
                <Table 
                    columns={columns2} 
                    dataSource={this.state.data2} 
                    title={() => '正在运行的触发器列表'} 
                    pagination={false} 
                />
                <Modal 
                    title={ this.state.editItem ? "编辑任务" : "添加任务" }
                    visible={this.state.showEditJob}
                    onOk={this.handleSubmit}
                    onCancel={this.handleJobEditCancel}
                >
                    <Form horizontal>
                        <FormItem {...formItemLayout} label="任务名称" hasFeedback>
                            {getFieldDecorator('jobName', {
                                initialValue: editJobObj.jobName,
                                rules: [{ required: true, message: '请输入任务名称' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="任务组名" hasFeedback>
                            {getFieldDecorator('jobGroup', {
                                initialValue: editJobObj.jobGroup,
                            })(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="触发器名称" hasFeedback>
                            {getFieldDecorator('triggerName', {
                                initialValue: editJobObj.triggerName,
                                rules: [{ required: true, message: '请输入触发器名称' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="触发器组" hasFeedback>
                            {getFieldDecorator('triggerGroup', {
                                initialValue: editJobObj.triggerGroup
                            })(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="业务逻辑类" hasFeedback>
                            {getFieldDecorator('jobClass', {
                                initialValue: editJobObj.jobClass,
                                rules: [{ required: true, message: '请输入业务逻辑类' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="cron表达式" hasFeedback>
                            {getFieldDecorator('cronExpression', {
                                initialValue: editJobObj.cronExpression,
                                rules: [{ required: true, message: '请输入cron表达式' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="参数串" hasFeedback>
                            {getFieldDecorator('jobDataParams', {
                                initialValue: editJobObj.jobDataParams
                            })(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="任务描述" hasFeedback>
                            {getFieldDecorator('description', {
                                initialValue: editJobObj.description
                            })(<Input />)}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}));