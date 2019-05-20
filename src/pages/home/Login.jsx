import React, {Component} from 'react'
import {connect} from "../../models/index";
import './style.less';
import topAd from './topAd.jpg';
import {Menu, Icon, Row, Input, Col, Button, Modal, Tabs, Form, Checkbox, Spin, message} from 'antd';
import logo from './logo.png';
import {ajaxHoc} from "../../commons/ajax";
import PropTypes from "prop-types";
import QRCode from 'qrcode.react';
import notify from './notify'
const TabPane = Tabs.TabPane;
@Form.create()
@ajaxHoc()
@connect()



export default class Login extends Component {
    state = {
        current: 'mail',
        userLogin: window.sessionStorage.getItem("uuid"),
        userNickName: window.sessionStorage.getItem("userName"),
        visible: false,
        index: 0,
        spinning: false,
        tip: null,
        loading: false
    };

    // 注册
    handleRegister = () => {
        const fields = ['userAccount', 'userPassword', 'userEmail'];
        this.setState({loading: true, tip: '正在登录中，请稍后...'});
        this.props.form.validateFieldsAndScroll(fields, (err, value) => {
            const params = {userAccount: value.userName, userPassword: value.password}
            this.props.ajax.post('/common/login/insertUserVal', value)
                .then(() => {
                    this.setState({userLogin: true, loading: false});
                })
        });

    };
    // 登录
    handleSubmit = () => {
        const fields = ['userName', 'password'];
        this.props.form.validateFieldsAndScroll(fields, (err, value) => {
            const params = {userAccount: value.userName, userPassword: value.password};
            this.setState({loading: true, tip: '正在登录中，请稍后...'});
            this.props.ajax.get('/common/login/into', params)
                .then((res) => {
                    if(res.data){
                        sessionStorage.setItem("user", JSON.stringify(res.data) );
                        this.forceUpdate();
                        this.props.cancel();
                    }else{
                        notify('error','登录失败，用户名或密码错误！')
                        this.props.cancel();
                    }
                    this.setState({loading: false});
                })
        });
    };


    handleLogin = () => {
        this.setState({visible: true});
    };
    handleCancel = () => {
        this.props.cancel();
    };

    render() {
        const {userLogin} = this.state;

        return (
            <Modal
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={null}
                width={500}
            > <Spin spinning={this.state.loading} tip={this.state.tip}>
                <Tabs defaultActiveKey="login" onChange={this.callback}>
                    <TabPane tab="登录" key="login">
                        <Form className="login-form">
                            <Form.Item>
                                {this.props.form.getFieldDecorator('userName', {
                                    rules: [{required: true, message: 'Please input your username!'}],
                                })(
                                    <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="请输入用户名"/>
                                )}
                            </Form.Item>
                            <Form.Item>
                                {this.props.form.getFieldDecorator('password', {
                                    rules: [{required: true, message: 'Please input your Password!'}],
                                })(
                                    <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password" placeholder="请输入密码"/>
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Icon type="question-circle" /> &nbsp;&nbsp;
                                <a className="login-form-forgot" href="">忘记密码</a>
                                或<a href="">立即注册!</a>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" icon="smile" style={{width: '100%'}} onClick={this.handleSubmit}>登录</Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                    <TabPane tab="注册" key="register">
                        <Form className="login-form">
                            <Form.Item>
                                {this.props.form.getFieldDecorator('userAccount', {
                                    rules: [{required: true, message: 'Please input your username!'}],
                                })(
                                    <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="请输入用户名"/>
                                )}
                            </Form.Item>
                            <Form.Item>
                                {this.props.form.getFieldDecorator('userEmail', {
                                    rules: [{required: true, message: 'Please input your Password!'}],
                                })(
                                    <Input prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="请输入邮箱"/>
                                )}
                            </Form.Item>
                            <Form.Item>
                                {this.props.form.getFieldDecorator('userPassword', {
                                    rules: [{required: true, message: 'Please input your Password!'}],
                                })(
                                    <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password" placeholder="请输入密码"/>
                                )}
                            </Form.Item>
                            <Form.Item>
                                {this.props.form.getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(
                                    <Checkbox>同意《云课网注册协议》
                                    </Checkbox>
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" icon="smile" style={{width: '100%'}} onClick={this.handleRegister}>注册</Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                </Tabs>
            </Spin>
            </Modal>

        );
    }
}

