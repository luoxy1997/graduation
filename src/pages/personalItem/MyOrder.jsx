import React, {Component} from 'react'
import {ajaxHoc} from "../../commons/ajax";

import {Icon, Tabs, Collapse, Pagination, Row, Spin, Button, Popconfirm, Modal, Input, Form} from 'antd';
import goodsImg from './goodsimg.jpg'
import notify from './notify'
import './style.less';


const TabPane = Tabs.TabPane;


const Panel = Collapse.Panel;
@ajaxHoc()
@Form.create()
export default class Personal extends Component {
    state = {
        visible1: false,
        visible2: false,
        orders: [],
        pageSize: 5,
        pageNum: 1,
        total: 0,
        loading: true
    };

    componentDidMount() {
        this.handleSearch();
    }

    handleSearch = (args = {}) => {
        const {
            pageSize = this.state.pageSize,
            pageNum = this.state.pageNum,

        } = args;
        this.setState({loading: true});
        const userId = window.sessionStorage.getItem("user") && JSON.parse(window.sessionStorage.getItem("user")).uuid;
        this.props.ajax.get(`/customer/order/queryOrderInfoByUserId?userId=${userId}&pageNum=${pageNum}&pageSize=${pageSize}`)
            .then((res) => {
                this.setState({
                    orders: res.data.list,
                    total: res.data.total,
                    pageSize: res.data.pageSize,
                    pageNum: res.data.pageNum
                })
            })
            .finally(() => {
                this.setState({loading: false})
            })

    }


    // 默认获取数据分页
    changePage = (pageNum) => {
        //塞数据
        this.setState({pageNum: pageNum});
        //塞数据后立即执行函数并使用数据时，会产生异步，此时我们获取不到最新的值，所以我们这个时候传参
        this.handleSearch({pageNum: pageNum});
    };
    returnItem = (item) => {
        this.setState({visible1: true, item: item});


    }
    handleOk = () => {
        const {userId, uuid} = this.state.item;
        const {remark} = this.props.form.getFieldsValue();
        this.props.ajax.post('/customer/order/insertReturnOrder', {userId: userId, orderId: parseInt(uuid), remark: remark})
            .then(res => {
                this.handleSearch();
                this.setState({visible1: false});
            })
    }
    handleCancel1 = () => {
        this.setState({visible1: false});

    }
    handleCancel2 = () => {
        this.setState({visible2: false});
        this.video.pause();
    }
    pushItem = (item) => {
        this.setState({commodityUrl:null})
        this.props.ajax.get(`commodity/opera/queryCommodity?pageNum=1&pageSize=1&CommodityId=${item.commodityId}`)
            .then(res => {
                if (res.data.list[0].commodityStatus === 'mp4') {
                    this.setState({commodityUrl: res && res.data.list[0].commodityUrl, visible2: true})

                } else {
                    window.location.href=res && res.data.list[0].commodityUrl;
                    notify('success','文件已下载')
                }
            })
    }

    render() {
        const {pageNum, total, pageSize,} = this.state;
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
                    <h2>我的订单</h2>
                </div>
                <Spin spinning={this.state.loading} tip="正在获取资源...">

                    <div className="myOrder">
                        <ul className="myOrder-list">
                            {this.state.orders.map(item => {
                                    return <li>
                                        <p className="myOrder-number">
                                            <Icon type="bars" style={{fontSize: '18px', paddingTop: '9px', paddingRight: '15px', color: 'rgb(221,52,21)'}}/>
                                            订单编号：{item.orderId}
                                        </p>
                                        <div className="myOrder-course">
                                            <dl className="course-del">
                                                <dd className="clearfix">
                                                    <div className="del-box">
                                                        <a>
                                                            <p className="course-name" style={{paddingLeft: '100px'}}>{item.commodityName}</p>
                                                        </a>
                                                        <p className="price-btn-box"></p>
                                                    </div>

                                                </dd>
                                            </dl>
                                            <div className="course-money">
                                                <div className="type-box">
                                                    <p className="type-text">原价</p>
                                                    <div className="type-price"><s> ¥398.00</s></div>
                                                </div>
                                                <div className="type-box">
                                                    <p className="type-text">折扣</p>
                                                    <div className="type-price"> ¥398.00</div>
                                                </div>
                                                <div className="type-box">
                                                    <p className="type-text">实付</p>
                                                    <div className="type-price" style={{color: '#f01414', fontSize: '18px'}}> ¥{item.commodityPrice}</div>
                                                </div>
                                            </div>
                                            <div className="course-action">

                                                {item.orderState === 1 || null ?
                                                    <Popconfirm title="确认要退货?" onConfirm={() => this.returnItem(item)} style={{marginTop: '30px', float: 'left'}}>
                                                        <Button type="dashed">
                                                            申请退货
                                                        </Button>
                                                    </Popconfirm> :
                                                    (item.orderState === 2 ? <Button type="primary" style={{marginTop: '30px', marginLeft: '50px', float: 'left'}}>
                                                                退货成功
                                                            </Button> :
                                                            (item.orderState === 4 ?
                                                                <Button type="danger" ghost style={{marginTop: '10px',marginLeft: '50px', float: 'left'}}>
                                                                    退货失败
                                                                </Button> : <Button type="danger" ghost style={{marginTop: '30px', float: 'left', marginLeft: '50px'}}>
                                                                    退货待审核中
                                                                </Button>)

                                                    )

                                                }
                                                {item.orderState === 1 ||item.orderState === 4 ?

                                                    <Button type="primary" style={{marginTop: '30px', float: 'left', marginLeft: '45px'}} onClick={() => this.pushItem(item)}>
                                                        查看课程详情
                                                    </Button> : null

                                                }


                                            </div>
                                        </div>
                                    </li>
                                }
                            )}
                        </ul>
                    </div>

                </Spin>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible1}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel1}
                >
                    <Form onSubmit={this.handleSubmit} style={{width: '400px', margin: '0 auto'}}>
                        <Form.Item
                            {...formItemLayout}
                            label="退货理由"
                        >
                            {getFieldDecorator('remark', {
                                rules: [{
                                    required: true, message: "请输入退货理由！ ",
                                }],
                            })(
                                <Input placeholder="请输入退货理由"/>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    visible={this.state.visible2}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel2}
                    width='900px'
                    title={null}
                    wrapClassName={'web'}
                    style={{zIndex: 9999999}}
                >

                    <video width="800" src={this.state.commodityUrl} controls="controls" autoPlay="autoplay" ref={video => this.video = video}>
                        您的浏览器不支持 video 标签。
                    </video>

                </Modal>
                <Row style={{width: '100%'}}>
                    <Pagination
                        current={pageNum}//当前的页数
                        total={total}//接受的总数
                        pageSize={pageSize}//一页的条数
                        onChange={this.changePage}//改变页数
                        showQuickJumper//快速跳转
                        showTotal={total => `共 ${total}条`}//共多少条
                        style={{textAlign: 'center', marginTop: '20px', display: 'block', width: '100%'}}
                    />
                </Row>

            </div>
        );
    }
}

