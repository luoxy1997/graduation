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

        this.props.ajax.get('/commodity/opera/queryCommodity?pageSize=5&pageNum=3')
            .then(res => {
                if (res) {
                    this.setState({orders: res.data.list});
                }

            })
            .finally(() => {
                this.setState({loading: false})
            })

    }
    pushItem = (item) => {
        console.log('9999');
        this.setState({commodityUrl: item.commodityUrl,visible2: true});


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
        console.log(item.commodityName);
        if(item.commodityName==='喜洋洋与灰太狼(第二集)'||item.commodityName==='喜洋洋与灰太狼(第三集)'){

            this.setState({commodityUrl:item.commodityUrl,visible2:true})

        }else{
            notify('error','仅供借阅前两节')
        }

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
                    <h2>会员借阅</h2>
                </div>
                <Spin spinning={this.state.loading} tip="正在获取资源...">

                    <div className="myOrder">
                        <ul className="myOrder-list">
                            {this.state.orders.map(item => {
                                    return <li>

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
                                                    <p className="type-text">种类</p>
                                                    <div className="type-price">{item.commodityKind}</div>
                                                </div>
                                                <div className="type-box">
                                                    <p className="type-text">等级</p>
                                                    <div className="type-price"> {item.commodityLevel}</div>
                                                </div>
                                                <div className="type-box">
                                                    <p className="type-text">价钱</p>
                                                    <div className="type-price" style={{color: '#f01414', fontSize: '18px'}}> ¥{item.commodityPrice}</div>
                                                </div>
                                            </div>
                                            <div className="course-action">


                                                    <Button type="primary" style={{marginTop: '30px', float: 'left', marginLeft: '45px'}} onClick={() => this.pushItem(item)}>
                                                        查看课程详情
                                                    </Button>


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


            </div>
        );
    }
}

