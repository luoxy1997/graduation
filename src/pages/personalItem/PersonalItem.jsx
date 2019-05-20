import React, {Component} from 'react'
import {Input, Modal, Icon, Form, Radio, Spin, Steps, Button, Alert} from 'antd';
import './style.less';
import {connect} from "../../models";
import {ajaxHoc} from "../../commons/ajax";
import notify from './notify'

const Step = Steps.Step;

@Form.create()

@ajaxHoc()

export default class PersonalItem extends Component {
    state = {
        visible: false,
        passwordVisible: false,
        data: {},
        loading: true,
        current: 0,
        code: null
    };


    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleSearch = () => {
        this.setState({loading: true});
        const uuid = window.sessionStorage.getItem("user") && JSON.parse(window.sessionStorage.getItem("user")).uuid;
        this.props.ajax.get(`common/login/queryUserInfo?uuid=${uuid}`)
            .then(res => {
                this.setState({data: res.data})
            })
            .finally(() => this.setState({loading: false}))
    };

    componentWillMount() {
        this.handleSearch();
    }

    handleOk = (e) => {
        const fields = ['userPhone', 'userAge', 'userAccount', 'userSex'];
        const uuid = window.sessionStorage.getItem("user") && JSON.parse(window.sessionStorage.getItem("user")).uuid;
        this.props.form.validateFieldsAndScroll(fields, (err, value) => {
            this.props.ajax.post('/common/login/updateUser', {...value, uuid})
                .then(res => {
                    this.handleSearch();
                })
        });
        this.setState({
            visible: false,
        });
    };

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });

    };
    showPasswordModal = () => {
        this.setState({
            passwordVisible: true,
        });

    };

    handlePasswordCancel = () => {
        this.setState({
            passwordVisible: false,
            current: 0
        });
    };

    next() {
        const uuid = window.sessionStorage.getItem("user") && JSON.parse(window.sessionStorage.getItem("user")).uuid;
        if (this.state.current === 0) {
            const email = this.props.form.getFieldValue('email');
            if (email === this.state.data.userEmail) {
                const fields = ['userPassword'];
                this.props.form.validateFieldsAndScroll(fields, (err, value) => {
                    this.props.ajax.post('customer/manager/findPassword', {userEmail: this.state.data.userEmail})
                        .then(res => {
                            this.setState({code: res.data})
                        })
                });

                const current = this.state.current + 1;
                this.setState({current});
            } else {
                notify('error', '邮箱和注册时不相符！')
            }

        }
        if (this.state.current === 1) {
            const code = this.props.form.getFieldValue('code');
            if (code === this.state.code) {
                const current = this.state.current + 1;
                this.setState({current});
            } else {
                notify('error', '验证码输入错误')
            }

        }

        if (this.state.current === 2) {
            const userPassword = this.props.form.getFieldValue('userPassword');
            const password = this.props.form.getFieldValue('password');
            const fields = ['userPassword'];
            if (userPassword !== password) {
                notify('error', '两次密码不一致！');
            } else {
                this.props.form.validateFieldsAndScroll(fields, (err, value) => {
                    this.props.ajax.post('/common/login/updateUser', {userPassword: userPassword, uuid})
                        .then(res => {
                            const current = this.state.current + 1;
                            this.setState({current});
                        })
                });
            }

        }
        if (this.state.current === 3) {
            this.setState({passwordVisible: false, current: 0});
        }
    }


    render() {
        const {userAccount, userSex, userPhone, userAge} = this.state.data;
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 18},
            },
        };
        return (
            <div className="right-container">
                <div className="right-title">
                    <h2>个人中心</h2>
                    <a onClick={this.showModal}><Icon type="edit" style={{paddingRight: '10px'}}/>编辑资料</a>
                    <a onClick={this.showPasswordModal}><Icon type="lock" style={{paddingRight: '10px'}}/>修改密码</a>
                </div>
                <Spin spinning={this.state.loading} tip="正在获取资源...">
                    <div className="personalMsg">
                        <div className="myMsg">
                            <div className="info-box clearfix">
                                <label className="pull-left">昵称</label>
                                <div>{userAccount}</div>
                            </div>
                            <div className="info-box clearfix">
                                <label className="pull-left">性别</label>
                                <div>{userSex}</div>
                            </div>
                            <div className="info-box clearfix">
                                <label className="pull-left">年龄</label>
                                <div>{userAge}</div>
                            </div>
                            <div className="info-box clearfix">
                                <label className="pull-left">联系电话</label>
                                <div>{userPhone}</div>
                            </div>


                        </div>
                    </div>
                    <Modal
                        title="修改个人资料"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        width={600}
                    >
                        <Form onSubmit={this.handleSubmit} style={{width: '400px', margin: '0 auto'}}>
                            <Form.Item
                                {...formItemLayout}
                                label="昵称"
                            >
                                {getFieldDecorator('userAccount', {
                                    rules: [{
                                        required: true, message: "请输入昵称！ ",
                                    }],
                                    initialValue: userAccount
                                })(
                                    <Input/>
                                )}
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label="性别"
                            >
                                {getFieldDecorator('userSex', {
                                    rules: [{
                                        required: true, message: '请选择性别！',
                                    }],
                                    initialValue: userSex || '男'
                                })(
                                    <Radio.Group buttonStyle="solid">
                                        <Radio.Button value="男">男</Radio.Button>
                                        <Radio.Button value="女">女</Radio.Button>
                                    </Radio.Group>
                                )}
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label="年龄"
                            >
                                {getFieldDecorator('userAge', {
                                    initialValue: userAge
                                })(
                                    <Input/>
                                )}
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label="联系电话"
                            >
                                {getFieldDecorator('userPhone', {
                                    initialValue: userPhone
                                })(
                                    <Input/>
                                )}
                            </Form.Item>


                        </Form>
                    </Modal>
                    <Modal
                        title="修改密码"
                        visible={this.state.passwordVisible}
                        onOk={this.handlePasswordOk}
                        onCancel={this.handlePasswordCancel}
                        footer={null}
                        width={600}
                    >
                        <Steps size="small" current={this.state.current}>
                            <Step title="输入邮箱"/>
                            <Step title="输入验证码"/>
                            <Step title="输入新密码"/>
                            <Step title="完成"/>
                        </Steps>


                        <Form onSubmit={this.handleSubmit} style={{width: '400px', margin: '30px auto'}}>
                            {this.state.current === 0 ?
                                <div>
                                    <Form.Item
                                        {...formItemLayout}
                                        label="注册时邮箱"
                                    >
                                        {getFieldDecorator('email', {
                                            rules: [{
                                                required: true, message: '不能为空',
                                            }],
                                        })(
                                            <Input placeholder="请输入注册时所填邮箱" prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}/>
                                        )}
                                    </Form.Item>
                                </div> : null}
                            {this.state.current === 1 ? <Form.Item
                                {...formItemLayout}
                                label="输入验证码"
                            >
                                {getFieldDecorator('code', {
                                    rules: [{
                                        required: true, message: '不能为空',
                                    }],
                                })(
                                    <Input placeholder="请输入邮箱中收到的验证码" prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}/>
                                )}
                            </Form.Item> : null}
                            {this.state.current === 2 ?
                                <div>
                                    <Form.Item
                                        {...formItemLayout}
                                        label="新密码"
                                    >
                                        {getFieldDecorator('userPassword', {
                                            rules: [{
                                                required: true, message: '请输入密码！',
                                            }],
                                        })(
                                            <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password" s/>
                                        )}
                                    </Form.Item>
                                    <Form.Item
                                        {...formItemLayout}
                                        label="确认密码"
                                    >
                                        {getFieldDecorator('password', {
                                            rules: [{
                                                required: true, message: '请重新输入密码！',
                                            }],
                                        })(
                                            <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"/>
                                        )}
                                    </Form.Item>
                                </div> : null}
                            {this.state.current === 3 ?
                                <div style={{textAlign: 'center', fontSize: '15px', color: '#da5749'}}>
                                    <Icon type="smile"/>&nbsp;&nbsp;修改成功
                                </div> : null}


                        </Form>
                        <div style={{textAlign: 'center',}}>
                            <Button type="primary" onClick={() => this.next()}>
                                {this.state.current === 3 ? '关闭' : "下一步"}
                            </Button>
                        </div>
                    </Modal>
                </Spin>
            </div>
        );
    }
}

