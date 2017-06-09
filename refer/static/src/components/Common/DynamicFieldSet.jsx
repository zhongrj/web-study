import './DynamicFieldSet.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Icon, Button } from 'antd';
const FormItem = Form.Item;

export default React.createClass({
    getInitialState() {
        const values = this.props.value || [''];
        return {
            value: values
        }
    },
    /*componentWillReceiveProps(nextProps) {
        if ( 'value' in nextProps ) {
            const values = nextProps.value;
            this.setState({
                value: values
            });
        }
    },*/
    add() {
        let values = this.state.value;
        values.push( '' );
        this.setState({
            value: values
        });
        
    },
    remove(idx) {
        let values = this.state.value;
        if ( values.length === 1 ) return;
        values.splice( idx, 1 );
        this.setState({
            value: values
        });
    },
    handleChange(idx, e) {
        let values = this.state.value;
        values[idx] = e.target.value;
        // console.log( values )
        this.setState({
            value: values
        });
    },
    render() {
        const values = this.state.value;
        const items = values.map( (value, index) => {
            return (
                <p key={index}>
                    <Input 
                        style={{ width: '88%', marginRight: 8 }} 
                        onChange={this.handleChange.bind(this, index)} 
                        defaultValue={value}
                    />
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        disabled={values.length === 1}
                        onClick={() => this.remove(index)}
                    />
                </p>
            )
        } )
        return (
            <div>
                {items}
                <Button type="dashed" onClick={this.add} style={{ width: '88%' }}><Icon type="plus" /> Add</Button>
            </div>
        );
    }
});

