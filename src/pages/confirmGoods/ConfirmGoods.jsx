import React, {Component} from 'react';
import goodsImg from './img/goodsimg.jpg';
import pay_s from './img/pay_s.png';
import Header from '../home/Header';
import {ajaxHoc} from "../../commons/ajax";
import QRCode from 'qrcode.react';
import moment from 'moment'
import {Divider, Modal, Button, Spin, Icon, Collapse} from 'antd';
import notify from './notify'

import './style.less';
import {Menu} from "antd/lib/menu";

const Panel = Collapse.Panel;

export const PAGE_ROUTE = '/confirmGoods';
@ajaxHoc()
export default class VideoItem extends Component {
    state = {
        visible: false,
        type: 'wechat',
        url: '',
        qrCodeVisible: false,
        loading: false
    };

    componentWillMount() {
        this.props.ajax.get('/manager/opera/getActiveInfo')
            .then(res => {
                if (res.data) {
                    this.setState({count: res.data.activeDiscount || 1, start: moment(res.data.activeStartDate).format('YYYY-MM-DD'), end: moment(res.data.activeEndDate).format('YYYY-MM-DD')})

                }
            })
    }

    handlePay = () => {
        this.setState({visible: true});

    };
    handleCancel = () => {
        this.setState({visible: false});
    };
    addBorder = (type) => {
        console.log(type);
        this.setState({type});
    };
    handleOk = () => {

        const {commodityName, uuid, commodityPrice, commodityCredits, commodityStatus, commodityUrl} = this.props.location.state;
        if (commodityStatus === 'doc') {
            window.location.href=commodityUrl;
            notify('success','资料已下载')
        };
        console.log(commodityCredits);
        const params = {
            userId: JSON.parse(window.sessionStorage.getItem("user")).uuid,
            orderType: this.state.type,
            orderPrice: commodityPrice,
            orderName: commodityName,
            commodityId: uuid,
            extension: 'test',
            redirectUrl: '1231',
            commodityCredits
        };
        this.setState({loading: true});
        this.props.ajax.post('/customer/orders/pay', params)
            .then(res => {
                this.setState({url: res.data, visible: false, qrCodeVisible: true, loading: false})
            })


    };

    handleQRCancel = () => {
        this.setState({qrCodeVisible: false});
    };

    chooseType = () => {
        this.setState({
            visible: true, qrCodeVisible: false
        })
    }


    render() {
        const {commodityName, commodityOPrice, commodityPrice, commodityCredits, commodityImage} = this.props.location.state;
        console.log(this.props.location.state);

        return (
            <div>
                <Header theme="dark" background='black'/>
                <div className="confirm-wrap">
                    <div className="wrap">
                        <div className="chart-header">
                            <div className="chart-title">
                                <p>确认订单</p>
                            </div>
                        </div>
                        <div className="cart-body">
                            <div className="title-box">
                                <p className="goods-info-title">
                                    商品信息
                                </p>
                                <a>
                                    我有疑问，需要反馈？
                                </a>
                            </div>
                            <div className="detail-box">
                                <div className="item-cart">
                                    <ul>
                                        <li className="item-cart">
                                            <div className="item-img">
                                                <img src={`data:image/png;base64,${commodityImage}`} alt="" tit=""/>


                                            </div>
                                            <div className="text-info-box">
                                                <p>{commodityName}</p>
                                            </div>
                                            <div className="info-price">
                                                <em>￥</em>
                                                <span>{commodityPrice}</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <Divider>请仔细确认订单信息</Divider>
                            <Collapse bordered={false} defaultActiveKey={['1']}>
                                <Panel header="优惠活动" key="1">
                                    <p style={{paddingLeft: 24, color: '#f01414'}}>
                                        {` 活动时间：${this.state.start}-${this.state.end}        折扣：${this.state.count}`}
                                    </p>
                                </Panel>
                            </Collapse>
                            <div className="pay-box">
                                <div className="goods-total-price-box">
                                    <div className="price-num">
                                        <em>￥</em>
                                        <span>{(commodityPrice / this.state.count).toFixed(2)} * {this.state.count}折扣</span>
                                    </div>
                                    <div className="price-text">
                                        共
                                        <span>1</span>
                                        件商品，商品总金额
                                    </div>
                                </div>
                                <div className="goods-total-price-box">
                                    <div className="price-num price">
                                        <em>￥</em>
                                        <span>{commodityPrice}</span>
                                    </div>
                                    <div className="price-text">
                                        应付
                                    </div>
                                </div>
                            </div>
                            {/*<div className="pay-account-box">*/}
                            {/*<div className="pay-account">*/}
                            {/*购买账号：抹茶味的胡萝卜*/}
                            {/*</div>*/}
                            {/*</div>*/}
                            <a className="buy-btn" onClick={this.handlePay}>提交订单</a>
                        </div>
                        <Modal
                            visible={this.state.visible}
                            title="请选择付款方式"
                            onCancel={this.handleCancel}
                            footer={[
                                <Button key="取消" onClick={this.handleCancel}>取消</Button>,
                                <Button key="确认" type="primary" onClick={this.handleOk}>
                                    确认付款
                                </Button>,
                            ]}
                        >
                            <Spin spinning={this.state.loading} tip="正在调起支付接口,请稍后...">
                                <div className="pay-list" style={{width: '420px', height: '100px', margin: '0 auto'}}>
                                    <a className="pay-way" onClick={() => this.addBorder('wechat')} style={{border: this.state.type === 'wechat' ? '2px solid rgb(218,87,73)' : null}}>
                                    </a>
                                    <a className="pay-way alipay" onClick={() => this.addBorder('alipay')} ref={alipay => this.alipay = alipay} style={{border: this.state.type === 'alipay' ? '2px solid rgb(218,87,73)' : null}}></a>
                                </div>
                            </Spin>

                        </Modal>
                        <Modal
                            visible={this.state.qrCodeVisible}
                            onCancel={this.handleQRCancel}
                            width={400}
                            footer={null}
                            style={{textAlign: 'center'}}
                        >

                            <QRCode value={this.state.url}/>
                            <h3>等待您完成支付...</h3>
                            <p>请在支付页面继续完成支付</p>
                            <div className="success-btn" onClick={this.chooseType}>
                                <Icon type="sync"/> 重新选择支付方式
                            </div>
                        </Modal>


                    </div>
                </div>
            </div>
        );
    }
}

