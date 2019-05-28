import React, {Component} from 'react'
import {connect} from "../../models/index";
import './style.less';
import topAd from './topAd.jpg';
import {Menu, Icon, Row, Input, Col, Button, Tooltip, Tabs, Form, Checkbox, Popconfirm, message, Spin, Modal} from 'antd';
import logo from './logo.png';
import {ajaxHoc} from "../../commons/ajax";
import PropTypes from "prop-types";
import Login from './Login'
import {hashHistory} from 'react-router'
import Link from '../../layouts/page-link';
import notify from './notify';

const TabPane = Tabs.TabPane;
@Form.create()
@ajaxHoc()
@connect()
export default class Header extends Component {
    state = {
        current: 'mail',
        userLogin: window.sessionStorage.getItem("user") !== null && JSON.parse(window.sessionStorage.getItem("user")).uuid,
        userNickName: window.sessionStorage.getItem("user") !== null && JSON.parse(window.sessionStorage.getItem("user")).userName,
        visible: false,
        index: 0,
        spinning: false
    };

    static contextTypes = {
        router: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);
    };

    // 注册
    handleRegister = () => {
        const fields = ['userAccount', 'userPassword', 'userEmail'];
        this.props.form.validateFieldsAndScroll(fields, (err, value) => {
            const params = {userAccount: value.userName, userPassword: value.password}
            this.props.ajax.post('/common/login/insertUserVal', value)
                .then(() => {

                })
        });

    };
    // 登录
    handleSubmit = () => {
        const fields = ['userName', 'password'];
        this.props.form.validateFieldsAndScroll(fields, (err, value) => {
            const params = {userAccount: value.userName, userPassword: value.password};
            this.props.ajax.get('/common/login/into', params)
                .then((res) => {
                    this.setState({userNickName: res.data.userName, userLogin: true, visible: false})
                    window.sessionStorage.setItem("user", JSON.stringify(res.data));
                })
                .catch(err => {
                    notify('error', '用户名或密码不正确，请重新输入')
                })
        });
    };


    // 退出登录
    handleLogOut = () => {
        this.setState({spinning: true});
        setTimeout(() => {
            window.sessionStorage.removeItem("user");
            this.setState({userLogin: false, userNickName: null, spinning: false});
            message.success('您已退出云课网(￣▽￣)~*');
        }, 2000)

    };

    handleClick = (e) => {
        if (e.key !== 'personal' && e.key !== 'search') {
            this.context.router.history.push(e.key)
        }
        if (e.key === '/search') {
            console.log('this');
            this.context.router.history.push({pathname: '/kind', state: {commodityKind: '教学类'}})
        }
        if (e.key === '/search1') {
            this.context.router.history.push({pathname: '/kindType', state: {commodityKind: '儿童类'}})
        }
    };


    handleLogin = () => {
        this.setState({visible: true});
    };
    handleCancel = () => {
        this.setState({visible: false});
    };

    componentDidMount() {
        setTimeout(this.props.action.page.hideHead);
    }

    handlePersonal = () => {
        this.context.router.history.push('/Personal')

    };
    searchCourse = () => {
        const value = this.props.form.getFieldsValue();
        this.context.router.history.push({pathname: '/search', state: value});

    };
    handlepayChart = () => {
        this.forceUpdate();
        this.context.router.history.push('/payCarts')

    };


    render() {
        const {getFieldDecorator} = this.props.form;
        const userShow = this.state.userLogin ?
            <Menu.Item key="personal">
                <Button type="primary" size="small">{this.state.userNickName}</Button>
                &nbsp;&nbsp;
                <Button type="dashed" size="small" onClick={this.handlePersonal}>个人中心</Button>
                &nbsp;&nbsp;
                <Button type="dashed" size="small" onClick={this.handlepayChart}>我的收藏</Button>
                &nbsp;&nbsp;

                <Popconfirm title="确认要退出此账号?" onConfirm={this.handleLogOut}>
                    <Button type="danger" size="small">退出</Button>
                </Popconfirm>

            </Menu.Item>
            :
            <Menu.Item key="personal">
                <Button type="dashed" size="small" onClick={this.handleLogin}>注册/登录</Button>

                {/*<QRCode value="wxp://f2f1J1pUoSkm2wR4eLg7fncTJQc5gTif_Ybc" />*/}
            </Menu.Item>;
        return (
            <div style={{position: 'relative'}}>
                <Form>
                    <Spin spinning={this.state.spinning}>
                        <img src={topAd} alt='topAd' tit="21" width='100%' style={{position: 'relative', top: 0, height: '45px'}}/>
                        <Row style={{lineHeight: '50px', boxShadow: '0 4px 8px 0 rgba(7,17,30,.1)', background: this.props.background}}>
                            <Col span={2}></Col>
                            <Col span={4}>
                                <a href="/" className="logo">
                                    <img src={logo} alt="" tit="" width={150}/>
                                </a>
                            </Col>
                            <Col span={16}>
                                <Menu
                                    onClick={this.handleClick}
                                    mode="horizontal"
                                    style={{borderBottom: 'none'}}
                                    theme={this.props.theme}
                                    style={{marginTop: '5px'}}
                                >

                                    <Menu.Item key="/">

                                        <Link to={{
                                            pathname: '/',
                                            state: {commodityKind: '教学类'}

                                        }}>
                                            首页
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="/search">
                                        <Link to={{
                                            pathname: '/search',

                                        }}>
                                            Java
                                        </Link>

                                    </Menu.Item>
                                    <Menu.Item key="/search1">
                                        儿童类
                                    </Menu.Item>
                                    <Menu.Item key="/mall">
                                        积分商城
                                    </Menu.Item>

                                    <Menu.Item key="search">
                                        <Form.Item style={{height: 20, marginTop: '5px'}}>
                                            {getFieldDecorator('commodityName', {})(
                                                <Input
                                                    placeholder="前端react"
                                                    suffix={
                                                        <Tooltip title="点击搜索您感兴趣的课程" onClick={this.searchCourse}>
                                                            <Icon type="search" style={{color: 'rgba(0,0,0,.45)'}}/>
                                                        </Tooltip>
                                                    }
                                                />
                                            )}

                                        </Form.Item>
                                    </Menu.Item>

                                    {userShow}

                                </Menu>


                            </Col>
                            <Col span={2}></Col>
                            <Modal
                                visible={this.state.visible}
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                                footer={null}
                                width={500}
                            >
                                <Tabs defaultActiveKey="login" onChange={this.callback}>
                                    <TabPane tab="登录" key="login">
                                        <Form className="login-form">
                                            <Form.Item>
                                                {getFieldDecorator('userName', {
                                                    rules: [{required: true, message: '请填写用户名！'}],
                                                })(
                                                    <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="请输入用户名"/>
                                                )}
                                            </Form.Item>
                                            <Form.Item>
                                                {getFieldDecorator('password', {
                                                    rules: [{required: true, message: '请填写密码！'}],
                                                })(
                                                    <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password" placeholder="请输入密码"/>
                                                )}
                                            </Form.Item>
                                            <Form.Item>
                                                <Button type="primary" icon="smile" style={{width: '100%'}} onClick={this.handleSubmit}>登录</Button>
                                            </Form.Item>
                                        </Form>
                                    </TabPane>
                                    <TabPane tab="注册" key="register">
                                        <Form className="login-form">
                                            <Form.Item>
                                                {getFieldDecorator('userAccount', {
                                                    rules: [{required: true, message: '请输入用户名!'}],
                                                })(
                                                    <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="请输入用户名"/>
                                                )}
                                            </Form.Item>
                                            <Form.Item>
                                                {getFieldDecorator('userEmail', {
                                                    rules: [{required: true, message: '请输入邮箱'}],
                                                })(
                                                    <Input prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="请输入邮箱"/>
                                                )}
                                            </Form.Item>
                                            <Form.Item>
                                                {getFieldDecorator('userPassword', {
                                                    rules: [{required: true, message: '请输入密码'}],
                                                })(
                                                    <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password" placeholder="请输入密码"/>
                                                )}
                                            </Form.Item>
                                            <Form.Item>
                                                {getFieldDecorator('remember', {
                                                    valuePropName: 'checked',
                                                    initialValue: true,
                                                })(
                                                    <Checkbox>同意《慕课网注册协议》
                                                    </Checkbox>
                                                )}
                                            </Form.Item>
                                            <Form.Item>
                                                <Button type="primary" icon="smile" style={{width: '100%'}} onClick={this.handleRegister}>注册</Button>
                                            </Form.Item>
                                        </Form>
                                    </TabPane>
                                </Tabs>
                            </Modal>
                        </Row>
                    </Spin>

                </Form>
            </div>
        );
    }
}
