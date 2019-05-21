import React, {Component} from 'react';
import './style.less';
import PropTypes from "prop-types";
import classBg from './classTitleBg.jpg';
import Login from '../home/Login';

import {Popconfirm, Popover, Icon, Tag, Button} from 'antd';
import {ajaxHoc} from "../../commons/ajax";
import notify from './notify';


@ajaxHoc()
export default class CourseInfoTop extends Component {
    state = {
        visible: false
    }
    static contextTypes = {
        router: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);
    };

    handleBuy = () => {
        const {commodityState, uuid, commodityCredits} = this.props.commodities;
        if (window.sessionStorage.getItem("user")) {
            if (commodityState === '5') {
                const params = {userId: JSON.parse(window.sessionStorage.getItem("user")).uuid, commodityId: uuid, commodityCreadity: commodityCredits,};

                this.props.ajax.post('commodity/opera/getCreditsCommodity', params)
                    .then(() => {
                        notify('success', '积分兑换成功！')
                    })
                    .catch(() => {
                        notify('error', '积分失败！')
                    })
            } else {
                this.context.router.history.push({pathname: '/confirmGoods', state: this.props.commodities});
            }
        } else {
            this.setState({visible: true})
        }
    };
    handleAddCar = () => {
        const {uuid} = this.props.commodities;
        const params = {
            userId: JSON.parse(window.sessionStorage.getItem("user")).uuid,
            commodityId: uuid
        };
        this.props.ajax.post('/customer/cart/addCart', params)
            .then(() => {
                notify('success', '已收藏')
            })
            .catch(() => {
                notify('error', '收藏失败')

            })
    }

    render() {
        const {commodityName, commodityRemark, commodityPrice, commodityLevel, commodityPeople, commodityEvaluate, commodityCredits, commodityState} = this.props.commodities;

        const content = (
            <div>
                <div>
                    <p><Tag color="geekblue"><p><Icon type="sound"/>&nbsp;&nbsp;此商品为积分商品：可用积分免费兑换</p></Tag></p>
                    <p>用户共有积分:</p>
                    <p>商品积分：{commodityCredits}</p>

                </div>
                <div style={{textAlign: 'center'}}>
                    <Button size="small" type="primary" ghost onClick={this.handleBuy}>确认兑换</Button>
                </div>
            </div>
        );

        console.log(commodityState,'ooooo');
        return (
            <div className="course-infos-top" style={{background: `url(${classBg})`}}>
                <div className="info-wrap">
                    <div className="title-box">
                        <h1>{commodityName}</h1>
                        <h2>{commodityRemark}</h2>
                    </div>
                </div>
                <div className="fixed-wrap">
                    <div className="fixed-content">
                        <div className="price">
                            <div className="ori-price">
                                ￥{commodityPrice}
                            </div>
                            <div class="activity">
                                限时活动
                            </div>
                        </div>
                        <div className="info-bar">
                            <span>难度</span>
                            <span className="details">{commodityLevel}</span>
                            <i>.</i>
                            <span>时长</span>
                            <span className="details">16小时16分钟</span>
                            <i>.</i>
                            <span>学习人数</span>
                            <span className="details">{commodityPeople}</span>
                            <i>.</i>
                            <span>综合评分</span>
                            <span className="details">{commodityEvaluate * 4.4}分</span>
                        </div>
                        <div className="btns">
                            {commodityState === '5' ?
                                <Popover content={content}>
                                    <a className="red-btn">立即购买</a>
                                </Popover>
                                :
                                <a className="red-btn" onClick={this.handleBuy}>立即购买</a>
                            }

                            <Popconfirm title="确认加入收藏夹？" onConfirm={this.handleAddCar}>
                                <a className="add-chart">加入收藏</a>
                            </Popconfirm>
                        </div>
                    </div>


                </div>
                <Login
                    visible={this.state.visible}
                    cancel={() => {
                        this.setState({visible: false})
                    }}
                />
            </div>
        );
    }
}

