import React, {Component} from 'react';
import goodsImg from './img/goodsimg.jpg';
import pay_s from './img/pay_s.png';
import Header from '../home/Header';
import {ajaxHoc} from "../../commons/ajax";
import notify from './notify'

import {Modal, Button, Icon, Table, Collapse, Divider, Tag, Popconfirm, Pagination} from 'antd';


import './style.less';
import PropTypes from "prop-types";

const Panel = Collapse.Panel;
export const PAGE_ROUTE = '/payCarts';
@ajaxHoc()

export default class VideoItem extends Component {
    state = {
        visible: false,
        loading: true,
        pageSize: 5,
        pageNum: 1,
        total: 0,
    };
    static contextTypes = {
        router: PropTypes.object
    };
    componentWillReceiveProps(){
        this.handleSearch();
    }

    constructor(props, context) {
        super(props, context);
    };

    handleSearch = (args = {}) => {
        const {
            pageSize = this.state.pageSize,
            pageNum = this.state.pageNum,
        } = args;
        this.setState({loading: true});
        const userId = window.sessionStorage.getItem("user") && JSON.parse(window.sessionStorage.getItem("user")).uuid;
        this.props.ajax.get(`/customer/cart/queryCart?userId=${userId}&pageSize=${pageSize}&pageNum=${pageNum}`)
            .then(res => {
                this.setState({orders: res.data.list, total: res.data.total, pageSize: res.data.pageSize, pageNum: res.data.pageNum})
            })
            .finally(() => {
                this.setState({loading: false})
            })
    }

    componentWillMount() {
        this.handleSearch();
    }

    // 默认获取数据分页
    changePage = (pageNum) => {
        //塞数据
        this.setState({pageNum: pageNum});
        //塞数据后立即执行函数并使用数据时，会产生异步，此时我们获取不到最新的值，所以我们这个时候传参
        this.handleSearch({pageNum: pageNum});
    };


    handleCancel = () => {
        this.setState({visible: false});
    };
    addBorder = (e) => {
        this.wechat.style.border = '2px solid #f3f5f7';
        this.alipay.style.border = '2px solid #f3f5f7';
        e.target.style.border = '2px solid red';
    };
    handleClass = (item) => {
        this.setState({loading: true});
        this.props.ajax.get(`/commodity/opera/queryCommodity?uuid=${item.uuid}&pageNum=1&pageSize=1`)
            .then((res) => {
                console.log(res.data.list[0]);
                this.context.router.history.push({pathname: '/classInfo', state: res.data.list[0]})
            })
            .finally((err) => {
                this.setState({loading: false});
            })
    };
    handleDelete = (record) => {
        this.setState({loading: true});
        this.props.ajax.post(`/customer/cart/deleteCart`, [record.uuid])
            .then((res) => {
                res && notify('success', '删除成功！');
                this.handleSearch();
            })
            .catch(err => {
                notify('error', '删除失败！')
            })
            .finally(()=>{this.setState({loading: false});})
    }


    render() {
        const columns = [{
            title: '课程名称',
            dataIndex: 'commodityName',
            render: text => <div>
                <a style={{paddingLeft: '20px', width: '400px', display: 'inline-block', fontSize: '16px'}}>{text}</a>
            </div>,
            width: '60%'
        }, {
            title: '类别',
            dataIndex: 'commodityKind',
        }, {
            title: '操作',
            render: (record) =>
                <div>
                    <Tag color="blue" onClick={() => this.handleClass(record)}>查看详情</Tag>
                    <Divider type="vertical"/>
                    <Popconfirm title="确认删除吗?" onConfirm={() => this.handleDelete(record)}>
                        <Tag color="geekblue">删除</Tag>
                    </Popconfirm>
                </div>,
            align: 'center'
        }];
        const data = [{
            key: '1',
            name: 'John Brown',
            age: 32,
        },];


        return (
            <div>
                <Header theme="dark" background="black"/>
                <div className="confirm-wrap">
                    <div className="wrap">
                        <div className="chart-header pay-chart-header">
                            <div className="chart-title">
                                <p>我的收藏</p>
                            </div>
                        </div>
                        <div className="cart-body">
                            <div style={{paddingTop: '40px'}}>
                                {data.length ?
                                    <div>
                                        <Table columns={columns} dataSource={this.state.orders} loading={this.state.loading} pagination={false}/>
                                        <Pagination
                                            current={this.state.pageNum}//当前的页数
                                            total={this.state.total}//接受的总数
                                            pageSize={this.state.pageSize}//一页的条数
                                            onChange={this.changePage}//改变页数
                                            showQuickJumper//快速跳转
                                            showTotal={total => `共 ${total}条`}//共多少条
                                            style={{textAlign: 'center', marginTop: '20px', display: 'block', width: '100%'}}
                                        />
                                    </div>
                                    :
                                    <div style={{lineHeight: '350px', fontSize: '30px', width: '320px', fontWeight: '300', textAlign: 'center', margin: '0 auto'}}><Icon type="shopping-cart"
                                                                                                                                                                         style={{paddingRight: '20px', fontSize: '40px', fontWeight: '300',}}/>购物车空空如也哦
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    visible={this.state.visible}
                    title="请选择付款方式"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="取消" onClick={this.handleCancel}>取消</Button>,
                        <Button key="确认" type="primary" onClick={this.handleOk}>
                            确认付款
                        </Button>,
                    ]}
                >

                    <div className="pay-list" style={{width: '420px', height: '100px', margin: '0 auto'}}>
                        <a className="pay-way" onClick={this.addBorder} ref={wechat => this.wechat = wechat} style={{border: '2px solid red'}}>
                        </a>
                        <a className="pay-way alipay" onClick={this.addBorder} ref={alipay => this.alipay = alipay}></a>
                    </div>


                </Modal>
            </div>
        );
    }
}

