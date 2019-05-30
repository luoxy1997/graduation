import React, {Component} from 'react'
import {connect} from "../../models/index";
import './style.less';
import topAd from './topAd.jpg';
import {Affix, Icon, Row, Input, Col, Button, Modal, Tabs, Form, Checkbox, Spin, message} from 'antd';
import logo from './logo.png';
import {ajaxHoc} from "../../commons/ajax";
import PropTypes from "prop-types";
import QRCode from 'qrcode.react';
import notify from './notify'
import huiyuan from './huiyuan.png'

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
        loading: false,
        top: 10,
        bottom: 10,
        url: ''
    };
    handleQRCancel = () => {
        this.setState({qrCodeVisible: false});
    };

    onClick1 = () => {
        if (window.sessionStorage.getItem("user")) {
            const userId = window.sessionStorage.getItem("user") && JSON.parse(window.sessionStorage.getItem("user")).uuid;
            this.setState({qrCodeVisible: true});
            this.props.ajax.get(`/manager/opera/GetHYEWM?userId=${userId}`)
                .then(res => {
                    this.setState({url: res.data.image, visible: false, qrCodeVisible: true, loading: false})
                })
        } else {
            notify('error', '请您先登录！')
        }
    }
    confirmRegister = () => {
        const userId = window.sessionStorage.getItem("user") && JSON.parse(window.sessionStorage.getItem("user")).uuid;
        this.props.ajax.post(`/customer/manager/registerHY?userId=${userId}`)
            .then(res => {
                res && notify('success', '注册会员成功！')
                this.setState({qrCodeVisible: false});
            })
            .catch(err => {
                notify('error', '系统错误')
            })
    }


    render() {
        const {userLogin} = this.state;

        return (
            <Affix offsetTop={this.state.top} style={{position: 'absolute', top: 400, right: 0, zIndex: 9999}}>
                {/*<img src={huiyuan} alt=" " tit="" width={80}/>*/}
                {/*<div>*/}
                    {/*<Button type="primary" size="small" onClick={this.onClick1}>&nbsp;&nbsp;注册会员</Button>*/}
                {/*</div>*/}
                <Modal
                    visible={this.state.qrCodeVisible}
                    onCancel={this.handleQRCancel}
                    width={400}
                    footer={null}
                    style={{textAlign: 'center'}}
                >

                    <img src={`data:image/png;base64,${this.state.url}`} alt={12} width="170px" tit='ew' className="item-img"/>
                    <h3>等待您完成支付...</h3>
                    <p>请在支付页面继续完成支付</p>
                    <Button type="primary" onClick={this.confirmRegister}>确认</Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button type="dashed">取消</Button>


                </Modal>
            </Affix>

        );
    }
}

