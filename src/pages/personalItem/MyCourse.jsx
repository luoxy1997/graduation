import React, {Component} from 'react'
import {ajaxHoc} from "../../commons/ajax";

import {Icon, Tabs, Collapse, Pagination, Row, Spin, Popconfirm, Button, Modal} from 'antd';
import notify from './notify'

import './style.less';

const TabPane = Tabs.TabPane;


const Panel = Collapse.Panel;
@ajaxHoc()
export default class Personal extends Component {
    state = {
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

    handleCancel2 = () => {
        this.setState({visible2: false});
        this.video.pause();
    }
    pushItem = (item) => {

        if (item.commodityStatus === 'mp4') {
            this.setState({commodityUrl: item.commodityUrl, visible2: true})

        } else {
            window.location.href=item.commodityUrl;
            notify('success','文件已下载')
        }
    }

    handleSearch = (args = {}) => {
        const {
            pageSize = this.state.pageSize,
            pageNum = this.state.pageNum,
        } = args;
        this.setState({loading: true});
        const userId = window.sessionStorage.getItem("user") && JSON.parse(window.sessionStorage.getItem("user")).uuid;
        this.props.ajax.get(`commodity/opera/getCommodityByUserId?pageNum=${pageNum}&pageSize=${pageSize}&userUuid=${userId}`)
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

    render() {
        const {pageNum, total, pageSize,} = this.state;
        console.log(this.state.orders);
        return (
            <div className="right-container">
                <div className="right-title">
                    <h2>我上传的课程</h2>
                </div>
                <Spin spinning={this.state.loading} tip="正在获取资源...">

                    <div className="myOrder">
                        <ul className="myOrder-list">
                            {this.state.orders.map(item => {
                                return <li>
                                    <p className="myOrder-number">
                                        <Icon type="bars" style={{fontSize: '18px', paddingTop: '9px', paddingRight: '15px', color: 'rgb(221,52,21)'}}/>
                                        我上传的课程
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
                                            <div style={{paddingRight: '200px'}}>

                                            </div>
                                            <div className="type-box" style={{paddingRight: '200px'}}>
                                                <p className="type-text">价格</p>
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
                            })}
                        </ul>
                    </div>
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

                </Spin>
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

