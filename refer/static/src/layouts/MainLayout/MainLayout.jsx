
import './MainLayout.scss';

import React from 'react';
import AJAX from '../../utils/ajax';
import { Menu, Dropdown, Icon, Breadcrumb, Modal } from 'antd';
import NavLink from '../../components/NavLink';

const onProfileMenuClick = ({item, key, keyPath}) => {
    switch ( +key ) {
		case 2:
			AJAX({
				url: 'LOGOUT',
				type: 'POST',
				success: res => {
					if ( res.status === 'success' ) {
						location.href = '#/login';
					}
				}
			});
			break;
		default:
			break;
    }
}

const profileMenu = (
	<Menu onClick={ onProfileMenuClick }>
		{/*<Menu.Item key="0">
			<NavLink to="/profile">个人信息</NavLink>
		</Menu.Item>*/}
		<Menu.Item key="1">
			<NavLink to="/password">修改密码</NavLink>
		</Menu.Item>
		<Menu.Divider />
		<Menu.Item key="2">
            <span className="pull-left">登出</span>
            <Icon type="logout" className="pull-right" />
            <div className="clearfix"></div>
        </Menu.Item>
	</Menu>
);

const MainLayout = React.createClass({
    getInitialState() {
        return {
            collapse: false,
            breadcrumbArr: [],
			current: this.props.location.pathname
        }
    },
	componentWillUpdate(nextProps) {
		let oldPath = this.props.location.pathname,
			newPath = nextProps.location.pathname;
		if( newPath != oldPath ) {
			this.setState({ current: newPath });
		}
	},
    onCollapseChange() {
        this.setState( { collapse: !this.state.collapse } );
    },
    handleClick(e) {
		this.setState({ current: e.key });
    },
    render() {
        let collapse = this.state.collapse;
        let asideClass = `yy-layout-aside${ collapse ? '  yy-layout-aside-collapse' : ''}`
        return (
            <div className="yy-layout-wrap">
                <div className={asideClass}>
                    <aside className="yy-layout-sider">
                        <div className="yy-layout-logo">
                            <img src={require('../../assets/logo.png')} alt="logo" width="32"/>
                            <span>友金普惠</span>
                        </div>
                        <Menu onClick={this.handleClick}
                            mode={collapse ? 'vertical' : 'inline'}
							theme="dark"
							ref="sideMenu"
							selectedKeys={[this.state.current]}
                        >
                            <Menu.Item key="/polling" className="yy-aside-menu_item">
								<Icon type="home" />
								<NavLink to="/polling">轮询管理</NavLink>
							</Menu.Item>
                            <Menu.Item key="/rules" className="yy-aside-menu_item">
								<Icon type="edit" />
								<NavLink to="/rules">规则管理</NavLink>
							</Menu.Item>
							<Menu.Item key="/password" className="yy-aside-menu_item">
								<Icon type="setting" />
								<NavLink to="/password">修改密码</NavLink>
							</Menu.Item>
                        </Menu>
                        <div className="yy-aside-action" onClick={this.onCollapseChange}>
							{collapse ? <Icon type="right" /> : <Icon type="left" />}
						</div>
                    </aside>
                    <div className="yy-layout-main">
						<div className="yy-layout-header">
							<div className="yy-sysname pull-left">
								<span>内评管理系统</span>
							</div>
							<div className="yy-profile pull-right">
								<Dropdown overlay={profileMenu}>
									<a className="ant-dropdown-link" href="#">
										<Icon type="user" /> {localStorage.getItem('userId')}<Icon type="down" />
									</a>
								</Dropdown>               
							</div>
						</div>
						<div className="yy-layout-breadcrumb">
							<Breadcrumb>
								{
									this.state.breadcrumbArr.map(item =>
										<Breadcrumb.Item key={item.id}>{item.name}</Breadcrumb.Item>)
								}
							</Breadcrumb>
						</div>
						<div className="yy-layout-container">
							<div className="yy-layout-content">
								<div style={{ minHeight: 600 }}>
									{this.props.children}
								</div>
							</div>
						</div>
						<div className="yy-layout-footer">
							Copyright © 2017 内评管理系统 - Powered By 友金普惠 V1.0.0
						</div>
					</div>
                </div>
            </div>
        )
    }
});

export default MainLayout;