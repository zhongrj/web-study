"use strict";

import React from 'react';
import {Table, Tabs, Button, Icon, Form, Input, message} from 'antd';
const {Item} = Form;

import {Service} from '../../common/AppCommon';

import './BBS.scss';

export default class BBS extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tab: 'postList',
            pageNo: 1,
            pageSize: 5,
            page: null,
            loading: false,
            post: null,
        };
        this.onBack = this.onBack.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onClick = this.onClick.bind(this);
        this.getPostList = this.getPostList.bind(this);
        this.pageChange = this.pageChange.bind(this);
    }

    onBack() {
        this.setState({
            tab: 'postList',
            page: null,
            post: null
        });
        this.getPostList();
    }

    onSelect(e) {
        e.preventDefault();
        let id = e.target.dataset.id,
            title = e.target.dataset.title;
        this.setState({
            tab: 'commentList',
            post: {
                id: id,
                title: title
            }
        });
    }

    onClick() {
        this.setState({
            tab: 'postForm'
        });
    }

    getPostList() {
        this.setState({
            loading: true,
        });
        let {pageNo, pageSize} = this.state;
        Service.postList({
            pageNo: pageNo,
            pageSize: pageSize
        }, ((data) => {
            let page = data.content,
                list = page.list;
            list.map((item, i) => {
                item.key = i;
            });
            this.setState({
                loading: false,
                page: page,
            });
        }).bind(this));
    }

    pageChange(pageNo, pageSize) {
        this.state.pageNo = pageNo;
        this.state.pageSize = pageSize;
        this.getPostList();
    }

    getColumns() {
        return [{
            key: 'title',
            dataIndex: 'title',
            title: '标题',
            render: (text, record) => {
                return (
                    <a href="javascript:void(0)" data-id={record.id} data-title={record.title}
                       onClick={this.onSelect}>{text}</a>
                );
            }
        }, {
            key: 'user.name',
            dataIndex: 'user.name',
            title: '作者'
        }, {
            key: 'commentCount',
            dataIndex: 'commentCount',
            title: '评论',
        }];
    }

    componentDidMount() {
        this.getPostList();
    }

    render() {

        let {tab, pageNo, pageSize, page, loading, post} = this.state;

        return (
            <Tabs activeKey={tab} className="zzone-community-bbs">


                <Tabs.TabPane tab="postList" key="postList">
                    <Button type="primary" style={{width: '100%'}} onClick={this.onClick}>
                        发贴
                    </Button>
                    <Table
                        loading={loading}
                        dataSource={page ? page.list : null}
                        columns={this.getColumns()}
                        pagination={page ? {
                            total: page.total,
                            onChange: this.pageChange,
                            pageSize: pageSize
                        } : false}
                    />
                </Tabs.TabPane>


                <Tabs.TabPane tab="commentList" key="commentList">
                    <CommentTab post={post} onBack={this.onBack}/>
                </Tabs.TabPane>


                <Tabs.TabPane tab="postForm" key="postForm">
                    <PostForm onBack={this.onBack}/>
                </Tabs.TabPane>


            </Tabs>
        );
    }
};


class CommentTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: null,
            pageNo: 1,
            pageSize: 5
        };

        this.submit = this.submit.bind(this);
        this.getCommentList = this.getCommentList.bind(this);
    }

    submit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                return false;
            }
            values.postId = this.props.post.id;
            Service.comment(values, ((data) => {
                this.props.form.resetFields();
                message.success(data.msg);
                this.getCommentList();
            }).bind(this));
        });
    }

    getCommentList() {
        let id = this.props.post.id,
            {pageNo, pageSize} = this.state;
        Service.commentList({
            postId: id,
            pageNo: pageNo,
            pageSize: pageSize
        }, ((data) => {
            this.setState({
                page: data.content
            });
        }).bind(this));
    }

    getCommentRows(page) {
        let list = page.list,
            total = page.total,
            result = [];
        list.map((comment, i) => {
            result.push(
                <div key={i} className="zzone-community-bbs-comment-row">
                    <div className="zzone-community-bbs-comment-avatar"/>
                    <div className="zzone-community-bbs-comment-username">
                        {comment.user.name}
                    </div>
                    <div className="zzone-community-bbs-comment-content">
                        {comment.content}
                    </div>
                </div>
            );
        });
        return result;
    }

    componentDidMount() {
        this.getCommentList();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.post !== this.props.post && this.props.post) {
            this.getCommentList();
        }
    }

    render() {

        if (!this.props.post) {
            return (<div/>);
        }

        const {getFieldDecorator} = this.props.form;
        let post = this.props.post,
            page = this.state.page,
            onBack = this.props.onBack;

        return (
            <div className="zzone-community-bbs-comment">
                <div className="zzone-community-bbs-comment-title">
                    <a href="javascript:void(0)" onClick={onBack}><Icon type="double-left"/></a>
                    <span>
                        {post.title}
                    </span>
                </div>
                <div className="zzone-community-bbs-comment-list">
                    {page ? this.getCommentRows(page) : null}
                </div>
                <div className="zzone-community-bbs-comment-form">
                    <Form>
                        <Item>
                            {getFieldDecorator('content', {
                                rules: [{required: true, message: '评论不能为空'}],
                            })(
                                <Input type="textarea" rows={4}/>
                            )}
                        </Item>
                        <Button type="primary" onClick={this.submit}>
                            提交
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}
CommentTab = Form.create()(CommentTab);


class PostForm extends React.Component {

    constructor(props) {
        super(props);

        this.submit = this.submit.bind(this);
    }

    submit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                return false;
            }
            Service.post(values, ((data) => {
                message.success(data.msg);
                this.props.onBack();
            }).bind(this));
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 14
            },
        };

        const tailFormItemLayout = {
            wrapperCol: {
                span: 14,
                offset: 6
            }
        };

        return (
            <div className="zzone-community-bbs-post-form">
                <Form>
                    <Item {...formItemLayout} label="标题">
                        {getFieldDecorator('title', {
                            rules: [{required: true, message: '标题不能为空'}],
                        })(
                            <Input size="large" placeholder="标题" onPressEnter={this.submit}/>
                        )}
                    </Item>
                    <Item {...formItemLayout} label="内容">
                        {getFieldDecorator('content', {
                            rules: [{required: true, message: '内容不能为空'}],
                        })(
                            <Input type="textarea" rows={4}/>
                        )}
                    </Item>
                    <Item {...tailFormItemLayout}>
                        <Button type="primary" onClick={this.submit}>
                            提交
                        </Button>
                        <Button type="primary" style={{marginLeft: 10}} onClick={this.props.onBack}>
                            返回
                        </Button>
                    </Item>
                </Form>
            </div>
        );
    }
}
PostForm = Form.create()(PostForm);