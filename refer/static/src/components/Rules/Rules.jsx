
import './Rules.scss';
import React from 'react';
import AJAX from '../../utils/ajax';
import AllotForm from './AllotForm';
import GroupForm from './GroupForm';
import RuleForm from './RuleForm';
import { Table, Button, Modal, Form, Input, Select } from 'antd';
const ButtonGroup = Button.Group;
const FormItem = Form.Item;
const Option = Select.Option;
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

export default React.createClass({
    getInitialState() {
        return {
            objList: [],
            rulesGroupList: [],
            flowData: [],
            expandedRowKeys: [0],
            showAllotForm: false,
            showGroupForm: false,
            factList: [],
            curGroup: {},
            curRule: {},
            showRuleForm: false
        }
    },
    componentWillMount() {
        AJAX({
            url: 'OBJECT_LIST',
            type: 'POST',
            success: res => {
                this.setState({ objList: res });
            }
        });
        this.refreshData();
        this.getFlowData();
    },
    refreshData() {
        AJAX({
            url: 'GROUP_LIST',
            type: 'POST',
            success: res => {
                res.forEach( (item, idx) => {item.key = idx} );
                this.setState({ rulesGroupList: res });
            }
        });
    },
    getFlowData() {
        AJAX({
            url: 'FLOW_INFO',
            type: 'POST',
            success: res => {
                this.setState({ flowData: res });
            }
        });
    },
    getFactCodeList( name, cb ) {
        AJAX({
            url: 'FACTCODE_LIST',
            type: 'POST',
            data: {
                ruleGroupName: name
            },
            success: res => {
                cb( res );
            }
        })
    },
    activeConfig() {
        let _this = this;
        confirm({
            title: '是否更新激活规则配置？',
            onOk() {
                AJAX({
                    url: 'UPDATE_CONFIG',
                    type: 'POST',
                    success: res => {
                        showResult(res.status);
                        _this.refreshData();
                    }
                });
            },
            onCancel() { },
        });
    },
    handleAllot() {
        this.setState({ showAllotForm: true });
    },
    handleAllotOk() {
        const form = this.allotForm;
        form.validateFields((err, values) => {
            if (err) return; 
            let _this = this;
            let maps = [];
            for ( let [k, v] of Object.entries(values) ) {
                maps.push({
                    flowName: k,
                    ruleGroupNames: v
                });
            }
            AJAX({
                url: 'FLOW_SAVE',
                type: 'POST',
                headers: [{
                    key: 'Content-Type', 
                    val: 'application/json;charset=utf-8'
                }],
                data: JSON.stringify(maps),
                success: res => {
                    if(res.status === 'success') {
                        Modal.success({ title: '操作成功' });
                        _this.getFlowData();
                    } else {
                        Modal.error({ title: '操作失败' });
                    }
                }
            });
        });
        form.resetFields();
        this.setState({ showAllotForm: false });
    },
    handleAllotCancel() {
        this.setState({ showAllotForm: false });
    },
    handleGroup() {
        this.setState({ showGroupForm: true, curGroup: {} });
    },
    handleGroupOk() {
        const form = this.groupForm;
        const isEditing = !(obj => {
            for (var name in obj) return false; return true;
        })(this.state.curGroup);

        form.validateFields((err, values) => {
            if (err) return; 
            let _this = this;
            let url = isEditing ? 'GROUP_EDIT' : 'GROUP_ADD';
            AJAX({
                url: url,
                type: 'POST',
                headers: [{
                    key: 'Content-Type', 
                    val: 'application/json;charset=utf-8'
                }],
                data: JSON.stringify(values),
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
            this.setState({ showGroupForm: false });
        });
    },
    handleGroupCancel() {
        this.setState({ showGroupForm: false });
    },
    handleRuleOk() {
        const _this = this;
        const form = this.ruleForm;
        const curRule = this.state.curRule;
        form.validateFields((err, values) => {
            if (err) return;
            let temp = {
                priority: values.priority,
                ruleCodeName: values.ruleCodeName,
                ruleName: values.ruleName
            }
            let tempList = [];

            delete (values.priority);
            delete (values.ruleCodeName);
            delete (values.ruleName);

            for (let key in values) {
                if ( Array.isArray( values[key] ) ) {
                    tempList.push({
                        name: key,
                        values: values[key]
                    });
                } else {
                    tempList.push({
                        name: key,
                        value: values[key]
                    });
                }
            }
            
            let postData = {
                ruleGroupName: curRule.ruleGroupName,
                rule: Object.assign( {}, temp, { params: tempList } )
            }

            AJAX({
                url: !!curRule.ruleCodeName ? 'RULE_EDIT' : 'RULE_ADD',
                type: 'POST',
                headers: [{
                    key: 'Content-Type',
                    val: 'application/json;charset=utf-8'
                }],
                data: postData,
                success: res => {
                    if(res.status === 'success') {
                        Modal.success({
                            title: !!curRule.ruleCodeName ? '修改成功' : '添加成功'
                        });
                        _this.refreshData();
                    } else {
                        Modal.error({
                            title: res.msg
                        });
                    }
                }
            });

            this.setState({ showRuleForm: false });
        });
    },
    handleRuleCancel() {
        this.setState({ showRuleForm: false });
    },
    handleAction(row, type) {
        // console.log( row )
        let _this = this;
        let gname = row.groupName;
        switch (type) {
            case 'modifyGroup':
                this.setState({ showGroupForm: true, curGroup: row });
                break;
            case 'addRule':
                this.ruleForm.resetFields();
                this.getFactCodeList( gname, list => {
                    this.setState({ 
                        showRuleForm: true, 
                        curRule: { ruleGroupName: gname }, 
                        factList: list
                    });
                } )
                break;
            case 'modifyRule':
                this.ruleForm.resetFields();
                this.getFactCodeList( gname, list => {
                    AJAX({
                        url: 'RULE_DETAIL',
                        type: 'POST',
                        data: {
                            groupName: gname,
                            ruleName: row.ruleName
                        },
                        success: res => {
                            this.setState({ 
                                showRuleForm: true, 
                                curRule: Object.assign({}, res, { ruleGroupName: gname }),
                                factList: list
                            });
                        }
                    });
                });
                break;
            case 'delRule':
                confirm({
                    title: '是否删除该规则？',
                    onOk() {
                        AJAX({
                            url: 'RULE_DEL',
                            type: 'POST',
                            data: {
                                groupName: row.groupName,
                                ruleName: row.ruleName
                            },
                            success: res => {
                                showResult(res.status);
                                _this.refreshData();
                            }
                        });
                    },
                    onCancel() { },
                });
            default:
                break;
        }
    },
    handleExpand(expanded, record) {
        this.setState({ expandedRowKeys: [ expanded ? record.key : undefined ] });
    },
    render() {
        const columns1 = [{
            title: '规则组名',
            dataIndex: 'groupName'
        },{
            title: '操作',
            render: (test, record) => (
                <span>
                    <a href="javascript: void(0);" onClick={this.handleAction.bind(this, record, 'modifyGroup')}>修改规则组</a>
                    <span className="ant-divider" />
                    <a href="javascript: void(0);" onClick={this.handleAction.bind(this, record, 'addRule')}>添加规则</a>
                </span>
            )
        }];
        const columns2 = [{
            title: '规则名',
            dataIndex: 'ruleName'
        },{
            title: '规则代码名',
            dataIndex: 'ruleCodeName'
        },{
            title: '优先级',
            dataIndex: 'priority'
        },{
            title: '操作',
            render: (test, record) => (
                <span>
                    <a href="javascript: void(0);" onClick={this.handleAction.bind(this, record, 'modifyRule')}>修改</a>
                    <span className="ant-divider" />
                    <a href="javascript: void(0);" onClick={this.handleAction.bind(this, record, 'delRule')}>删除</a>
                </span>
            )
        }];
        return (
            <div>
                <div className="topBtnGroup">
                    <Button type="primary" onClick={this.activeConfig}>更新激活规则配置</Button>
                    <Button type="primary" onClick={this.handleGroup}>新建规则组</Button>
                    <Button type="primary" onClick={this.handleAllot}>给流程分配规则组</Button>
                </div>
                <Table 
                    columns={columns1} 
                    dataSource={this.state.rulesGroupList} 
                    pagination={false} 
                    defaultExpandAllRows={false}
                    onExpand={this.handleExpand}
                    expandedRowKeys={this.state.expandedRowKeys}
                    expandedRowRender={ record => 
                        <Table 
                            columns={columns2} 
                            pagination={false} 
                            dataSource={record.rules.map( 
                                rule => Object.assign(rule, {groupName: record.groupName}) 
                            )} 
                        />
                    }
                />
               
                <AllotForm
                    ref={ form => this.allotForm = form}
                    visible={this.state.showAllotForm} 
                    flowData={this.state.flowData}
                    list={this.state.rulesGroupList} 
                    onCancel={this.handleAllotCancel}
                    onOk={this.handleAllotOk}
                />
                <GroupForm
                    ref={ form => this.groupForm = form}
                    visible={this.state.showGroupForm} 
                    objList={this.state.objList}
                    curGroup={this.state.curGroup}
                    onCancel={this.handleGroupCancel}
                    onOk={this.handleGroupOk}
                />
                <RuleForm
                    ref={ form => this.ruleForm = form } 
                    visible={this.state.showRuleForm}
                    factList={this.state.factList}
                    curRule={this.state.curRule}
                    onCancel={this.handleRuleCancel}
                    onOk={this.handleRuleOk}
                />
            </div>
        )
    }
});