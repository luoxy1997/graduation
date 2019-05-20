import React, {Component} from 'react';
import {Modal, Button, Tabs, Icon, Form, Col, Rate, Row, Input, Tooltip} from 'antd';
import Header from '../home/Header';
import './style.less';
import {connect} from "../../models";
import p2 from './p2.jpg';
import {ajaxHoc} from "../../commons/ajax";
import PropTypes from "prop-types";

const TabPane = Tabs.TabPane;

export const PAGE_ROUTE = '/search';
@connect()
@Form.create()
@ajaxHoc()
export default class Search extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);
    };

    state = {
        commodities: [{}], // 商品
    };
    state = {
        current: 'mail',
        userLogin: false,
        userNickName: '抹茶儿',
        visible: false,
    };

    componentWillMount() {
        this.props.ajax.get(`/commodity/opera/queryCommodity?pageNum=1&pageSize=10`, {commodityName: this.props.location.state.commodityName})
            .then(res => {
                this.setState({commodities: res.data.list, total: res.data.total})
            })
    }

    componentWillReceiveProps() {
        this.props.ajax.get(`/commodity/opera/queryCommodity?pageNum=1&pageSize=10`, {commodityName: this.props.location.state.commodityName})
            .then(res => {
                this.setState({commodities: res.data.list, total: res.data.total})
            })
    }

    searchCourse = () => {
        const value = this.props.form.getFieldsValue();
        this.props.ajax.get(`/commodity/opera/queryCommodity?pageNum=1&pageSize=10`, {commodityName: value.commodityName})
            .then(res => {
                this.setState({commodities: res.data.list, total: res.data.total})
            })
    };

    handleClass = (item) => {
        this.context.router.history.push({pathname: '/classInfo', state: item})
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Header theme="dark" background="black"/>
                <div className="search-main">
                    <div className="search-header">
                        <Form.Item>
                            {getFieldDecorator('commodityName',)(
                                <div>
                                    <Input
                                        style={{float: 'left'}}
                                        style={{height: 50, width: 800, marginTop: '10px'}}
                                        prefix={<Icon type="search" style={{color: 'rgba(0,0,0,.45)',}}/>}
                                        placeholder="请输入要搜索的课程"
                                    />
                                    <Tooltip title="点击搜索您感兴趣的课程" onClick={this.searchCourse} style={{float: 'left'}}>
                                        <span style={{
                                            background: '#f01414', height: 49, width: 100, lineHeight: '48px',
                                            fontSize: '16px',
                                            color: '#fff',
                                            display: 'inline-block',

                                        }}>搜索
                                        </span>
                                    </Tooltip>
                                </div>
                            )}

                        </Form.Item>
                    </div>
                </div>
                <div style={{width: '1200px', margin: '0 auto'}}>
                    <div style={{marginTop: '20px', marginLeft: '25px'}}><Icon type="bulb"/>&nbsp;&nbsp;{`共找到${this.state.total}个相关内容`}</div>
                    <Row style={{marginTop: '20px'}}>
                        {this.state.commodities && this.state.commodities.map((item, index) => {
                            return (
                                <Col span={4} style={{margin: '0 20px'}} onClick={() => this.handleClass(item)} key={index}>
                                    <div className="item-banner">
                                        <img src={`data:image/png;base64,${item.commodityImage}`} alt={12} tit='ew' width="100%" className="item-img"/>
                                        <div className="item-label">
                                            {item.commodityPerValue.map((it, index) => {
                                                    return (<label key={index}>{it}</label>)
                                                }
                                            )}

                                        </div>
                                        <div className="item-status">
                                            <label>{item.commodityCD}</label>
                                        </div>
                                    </div>
                                    <div className="item-content">
                                        <label>{item.commodityName}</label>
                                    </div>
                                    <div className="item-info">
                                        <span>{item.commodityExampl}</span>
                                        <span>{item.commodityLevel}</span>
                                        <span><Icon type="user"/>{item.commodityPeople}</span>
                                        <Rate disabled defaultValue={item.commodityEvaluate}/>
                                    </div>
                                    <div className="item-info item-sales">
                                        <span>￥{item.commodityPrice}</span>
                                        <span style={{color: '#93999f'}}><s>￥{item.commodityOPrice}</s></span>
                                        <span style={{background: 'rgba(240,20,20,.09)', padding: 3}}>限时优惠</span>
                                    </div>

                                </Col>
                            )
                        })
                        }
                    </Row>
                </div>

            </div>
        );
    }
}

