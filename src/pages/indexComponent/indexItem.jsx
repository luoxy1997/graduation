import React, {Component} from 'react'
import {Icon, Row, Col, Form, Rate} from 'antd';
import PropTypes from "prop-types";
import p from './pp.jpg';
import p2 from './p2.jpg';
import p3 from './p3.jpg';

import './style.less';
import {ajaxHoc} from "../../commons/ajax";

@Form.create()
@ajaxHoc()


export default class IndexItem extends Component {
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

    componentWillMount = () => {
        this.props.ajax.get('/commodity/opera/queryCommodity?pageSize=5&pageNum=1')
            .then(res => {
                if (res) {
                    this.setState({commodities: res.data.list});
                }

            })
    };



    handleClass = (item) => {
        this.context.router.history.push({pathname:'/classInfo',state:item})
    };

    render() {
        return (
            <div style={{marginTop: '50px'}}>
                <div className="type-title">
                    <span className="tit-icon" style={{backgroundPosition: this.props.titleLeft}}></span>
                    <em>实</em>/<em>战</em>/<em>推</em>/<em>荐</em>/
                    <span className="tit-icon r" style={{backgroundPosition: this.props.rightLeft}}></span>
                </div>
                <Row style={{marginTop: '10px'}}>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <Row>
                            {this.state.commodities && this.state.commodities.map((item,index) => {
                                return (
                                    <Col span={4} style={{margin: '0 20px'}} onClick={()=>this.handleClass(item)} key={index}>
                                        <div className="item-banner">
                                            <img src={`data:image/png;base64,${item.commodityImage}`} alt={12} tit='ew' width="100%" className="item-img"/>
                                            <div className="item-label">
                                                {item.commodityPerValue.map((it,index) => {
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
                    </Col>
                    <Col span={2}></Col>

                </Row>
            </div>
        );
    }
}
