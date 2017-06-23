"use strict";

import React from 'react';
import {Table, Tabs, Button, Icon, Mention} from 'antd';

import {getUserInfo} from '../../common/AppCommon';

import './BBS.scss';

export default class BBS extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            detail: null
        };
        this.onSelect = this.onSelect.bind(this);
        this.onBack = this.onBack.bind(this);
    }

    onSelect(e) {
        e.preventDefault();
        let id = e.target.dataset.id;
        getUserInfo((() => {
            this.setState({
                detail: id
            });
        }).bind(this));

    }

    onBack() {
        this.setState({
            detail: null
        });
    }

    render() {

        return (
            <Tabs activeKey={this.state.detail ? '2' : '1'} className="zzone-community-bbs">
                <Tabs.TabPane tab="Tab 1" key="1">
                    <Table dataSource={dataSource} columns={getColumns(this.onSelect)}/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Tab 2" key="2">
                    <div className="zzone-community-bbs-title">
                        <a href="javascript:void(0)" onClick={this.onBack}><Icon type="double-left" /></a>
                        <span>
                            标题xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                        </span>
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <div style={{height: 100, width:100, background: 'gainsboro'}}>头像</div>
                                </td>
                                <td>
                                    <div>
                                        <p>{this.state.detail}</p>
                                        <br/>
                                        <br/>
                                        <p>123123</p>
                                        <br/>
                                        <p>阿斯顿发生的阿斯蒂芬阿道夫安定车秩序安定趣分期额read发啥的而且的大大时代阿斯蒂芬阿斯蒂芬水电费阿斯蒂芬阿斯顿发生的发斯蒂芬阿道夫阿道夫阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬爱的色放阿斯蒂芬阿斯蒂芬阿道夫ADCV字形从vasdfs阿什顿发</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div style={{height: 100, width:100, background: 'gainsboro'}}>头像</div>
                                </td>
                                <td>
                                    <div>
                                        <p>{this.state.detail}</p>
                                        <br/>
                                        <p>123123</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div style={{height: 100, width:100, background: 'gainsboro'}}>头像</div>
                                </td>
                                <td>
                                    <div>
                                        <p>{this.state.detail}</p>
                                        <br/>
                                        <br/>
                                        <p>123123</p>
                                        <br/>
                                        <p>阿斯顿发生的阿斯蒂芬阿道夫安定车秩序安定趣分期额read发啥的而且的大大时代阿斯蒂芬阿斯蒂芬水电费阿斯蒂芬阿斯顿发生的发斯蒂芬阿道夫阿道夫阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬爱的色放阿斯蒂芬阿斯蒂芬阿道夫ADCV字形从vasdfs阿什顿发</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="zzone-community-bbs-comment">
                        <Mention
                            style={{
                                height: 100
                            }}
                            multiLines={true}
                        />
                        <Button type="primary">
                            提交
                        </Button>
                    </div>
                </Tabs.TabPane>
            </Tabs>
        );
    }
};


const dataSource = [{
    key: '1',
    id: 't1',
    title: '求教一个java问题，类Object中clone()....',
    commentCount: 32
}, {
    key: '2',
    id: 't2',
    title: '各位大神，java是不是快要不行了？',
    commentCount: 42
}];

let i = 2;
while (++i < 10) {
    dataSource.push({
        key: i,
        id: 't' + i,
        title: '乱写乱写乱写乱写乱写乱写乱写乱写乱写' + i,
        commentCount: i * 10
    });
}

const getColumns = (onSelect) => [{
    key: 'title',
    dataIndex: 'title',
    title: '标题',
    render: (text, record) => {
        return (
            <a href="javascript:void(0)" data-id={record.id} onClick={onSelect}>{text}</a>
        );
    }
}, {
    key: 'commentCount',
    dataIndex: 'commentCount',
    title: '评论',
}];

