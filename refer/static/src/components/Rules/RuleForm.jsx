
import React from 'react';
import ReactDOM from 'react-dom';
import AJAX from '../../utils/ajax';
import DynamicFieldSet from '../Common/DynamicFieldSet';
import { Modal, Form, Input, InputNumber, Select, Icon, Button, message } from 'antd';
const FormItem = Form.Item;
const OptGroup = Select.OptGroup;
const Option = Select.Option;

let RuleForm = React.createClass({
    getInitialState() {
        return {
            codeList: [],
            ruleMap: {}
        }
    },
    componentWillMount() {
        AJAX({
            url: 'CODE_LIST',
            type: 'POST',
            success: res => {
                this.setState({ codeList: res });
            }
        });
    },
    componentWillReceiveProps(nextProps){
        /*if ('curRule' in nextProps) {
            const curRule = nextProps.curRule;
            this.setState(curRule);
        }*/
    },
    getRuleName( str ) {
        const list = this.state.codeList; 
        let result = "";
        for( var i=0, len=list.length; i<len; i++ ) {
            var name = list[i].ruleName;
            var item = list[i].rule;
            for( var j=0, l=item.length; j<l; j++ ) {
                if ( item[j].name == str ) {
                    result = name;
                    break;
                }
            }
            if ( result != '' ) break;
        }
        return result;
    },
    handleCodeSelect(value, opt) {
        this.props.form.resetFields();
        const ruleName = ReactDOM.findDOMNode( opt ).parentNode.previousSibling.innerText;
        this.getRuleMap( ruleName, value );
    },
    getRuleMap(ruleName, codeName) {
        AJAX({
            url: 'RULE_MAP',
            type: 'POST',
            data: {
                ruleName: ruleName,
                codeName: codeName
            },
            success: res => {
                this.setState({ ruleMap: res });
            }
        });
    },
    handleKeyWordSelect(index, val){
        // ReactDOM.findDOMNode(this.refs[`formatKey-${index}`]).value = val;
        ReactDOM.findDOMNode(this.refs[`formatKey-${index}`]).querySelector('input').value = val;
    },
    handleCopy(index) {
        let input = ReactDOM.findDOMNode(this.refs[`formatKey-${index}`]).querySelector('input');
        input.focus();
        input.select();
        document.execCommand('copy');
        input.blur();
        message.success('内容已复制');
    },
    checkFiledSet(rule, value, callback) {
        if( value.every( v => v.trim() !== '' ) ) {
            callback();
            return;
        }
        callback( '请为所有项输入内容' );
    },
    render() {
        const { visible, onCancel, onOk, form, curRule, factList } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = { labelCol: { span: 8 }, wrapperCol: { span: 15 } };
        const formItemLayoutWithOutLabel = { wrapperCol: { span: 15, offset: 8 } };
        const isEditing = !!curRule.ruleCodeName;
        let ruleMap = this.state.ruleMap;
        let params = ruleMap.ruleParams ? ruleMap.ruleParams : [];

        return (
            <Modal
                title="新建规则"
                visible={visible}
                onOk={() => { this.setState({ ruleMap: {} }); onOk()}}
                onCancel={() => { this.setState({ ruleMap: {} }); onCancel()}}
            >
                <Form horizontal>
                    <FormItem {...formItemLayout} label="要执行规则代码">
                    {getFieldDecorator('ruleCodeName', {
                        initialValue: curRule.ruleCodeName,
                        rules: [{ required: true, message: '请选择规则代码' }],
                    })(
                        <Select disabled={ isEditing } onSelect={this.handleCodeSelect}>
                            { this.state.codeList.map( (group, index) => 
                                <OptGroup key={index} label={group.ruleName}>
                                    { group.rule.map( (rule, idx) => 
                                        <Option key={idx} value={rule.name}>{rule.name}</Option> 
                                    ) }
                                </OptGroup> 
                            ) }
                        </Select>
                    )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="规则名称">
                    {getFieldDecorator('ruleName', {
                        initialValue: curRule.ruleName,
                        rules: [{ required: true, message: '请输入规则名称' }]
                    })(
                        <Input />
                    )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="优先级">
                    {getFieldDecorator('priority', {
                        initialValue: isEditing ? `${curRule.priority}` : '',
                        rules: [{ required: true, message: '请输入优先级' }]
                    })(
                        <Input />
                    )}
                    </FormItem>
                    {factList.map((fact, index) =>
                        <FormItem {...formItemLayout} key={index} label={ fact.factName }>
                            <Select 
                                showSearch 
                                optionFilterProp="children" 
                                onSelect={this.handleKeyWordSelect.bind(this, index)} 
                                style={{ width: '40%' }}
                            >
                                { fact.factCode.map((item, idx) => 
                                    <Option key={idx} value={`$\{${fact.factName}.${item}\}`}>{item}</Option>) }
                            </Select>
                            <div style={{ width: '56%', float: 'right' }}>
                                <Input 
                                    ref={`formatKey-${index}`}  
                                    size="large" 
                                    value=""
                                    addonAfter={<Icon type="copy" onClick={this.handleCopy.bind(this, index)} />} 
                                />
                            </div>
                        </FormItem>
                    )}
                           
                    {params.map( (param, index) => 
                        <FormItem 
                            key={index} 
                            {...( param.description ? formItemLayout : formItemLayoutWithOutLabel )} 
                            label={param.description || ''}>
                            { !!param.supportValues.length ? 
                                getFieldDecorator(param.name, {
                                    initialValue: param.value,
                                    rules: [{ required: true, message: `请选择${param.description}` }]
                                })(
                                    <Select>
                                        { param.supportValues.map( (val, idx) => 
                                            <Option key={idx} value={val}>{val}</Option> 
                                        ) }
                                    </Select>
                                ) : param.multi ?
                                getFieldDecorator(param.name, {
                                    initialValue: param.values,
                                    rules: [{ validator: this.checkFiledSet }]
                                })(
                                    <DynamicFieldSet />
                                ) : 
                                getFieldDecorator(param.name, {
                                    initialValue: param.value,
                                    rules: [{ required: true, message: `请输入${param.description}` }]
                                })(
                                    <Input />
                                )
                            }
                        </FormItem>
                    )}
                </Form>
            </Modal>
        )
    }
});


export default Form.create()(RuleForm);
