import React, {Component} from 'react';
import {Button, Divider, Table, Row, Col, Popconfirm, Pagination} from 'antd';
import InitialModal from './InitialModal';
import '../style.less';
import {Form} from "antd/lib/index";
import {ajaxHoc} from "../../../commons/ajax";

@ajaxHoc()
@Form.create()
export default class InitialItem extends Component {
    state = {
        visible: false,
        pageNum: 1,
        pageSize: 10,
        total: 0,
        dataSource: [],
        loading: false,
        record: null,
        columns: [], //动态的columns
        modalData: [],//弹框所需要的dataSource
    };
    search = (args = {}) => {
        const {pageNum = this.state.pageNum, pageSize = this.state.pageSize} = args;
        const tableId = this.props.tableId;
        //查询出动态的列
        this.props.ajax.get(`/columninfo?&&pageSize=9999`, {tableId: this.props.tableId})
            .then(res => {
                if (res) {
                    if (res) {
                        const columns = res.content.map(item => {
                                return {
                                    title: item.name,
                                    dataIndex: item.id
                                }
                            }
                        );
                        columns.push({
                            title: '操作',
                            render: (record) => {
                                return (
                                    <span>
                                    <a onClick={() => {
                                        this.addData(record)
                                    }}>修改</a>
                                    <Divider type="vertical"/>
                                    <Popconfirm title="确定删除这条数据吗?" onConfirm={this.confirm} onCancel={this.cancel} okText="确定" cancelText="取消">
                                        <a>删除</a>
                                    </Popconfirm>
                                </span>)
                            }

                        });
                        const modalData = res.content.map(item => {
                            return {
                                name: item.name,
                                id: item.id
                            }
                        });
                        this.setState({
                            columns,
                            modalData
                        })
                    }

                }
            })
            .finally(() => this.setState({loading: false}));
        //查询出数据，构造成DataSource
        this.props.ajax.get(`/init/${tableId}`)
            .then(res => {
                let obj = {};
                console.log(res, 'res');
                //将相同initRow的对象分类到一个、对象当中 obj格式是[initRow:[{},{},{}],initRow:[{},{},{}]]
                res.content.forEach(item => {
                    const key = item.initRowId.toString();
                    if (!obj[key]) {
                        obj[key] = [item];
                    } else {
                        obj[key].push(item);
                    }
                });
                //将对象转化为数组 数组格式是：[0:[{},{},{}],1:[{},{},{}]]
                const dataList = Object.keys(obj).map(key => obj[key]);
                //编辑数组，将每个对象中的columnId作为键名，value作为值
                const dataSource = dataList.map(item => {
                        let obj = {};
                        item.map(it => {
                            console.log(it,'kkkk');
                            obj[it.columnId] = it.value;
                            obj[`${it.columnId}valueIsFunc`] = it.valueIsFunc;
                        });
                        return obj;
                    }
                );
                this.setState({
                    dataSource
                })

            })
            .finally(() => this.setState({loading: false}));

    };

    // 默认获取数据分页
    changePage = (pageNum) => {
        //塞数据
        this.setState({pageNum: pageNum});
        //塞数据后立即执行函数并使用数据时，会产生异步，此时我们获取不到最新的值，所以我们这个时候传参
        this.search({pageNum: pageNum, pageSize: this.state.pageSize});
    };


    componentWillMount() {
        this.search();
    }

    addData = (record) => {
        this.setState({
            visible: true
        });

        if (record) {
            this.setState({record: record});
        } else {
            this.setState({record: null,});
        }
    };

    render() {
        const {visible, dataSource} = this.state;
        return (
            <div>
                <div style={{float: 'right', paddingRight: 20, marginTop: '-30px', marginBottom: '20px'}}>
                    <Button type="primary" onClick={()=>this.addData(null)}>+ 添加初始数据</Button>
                </div>
                <Table
                    dataSource={dataSource}
                    columns={this.state.columns}
                    styleName="table"
                    pagination={false}
                />
                <Pagination
                    current={this.state.pageNum}//当前的页数
                    total={this.state.total}//接受的总数
                    pageSize={this.state.pageSize}//一页的条数
                    onChange={this.changePage}//改变页数
                    showQuickJumper//快速跳转
                    style={{textAlign: 'center', marginTop: '20px'}}
                    showTotal={total => `共 ${total}条`}//共多少条
                />
                <InitialModal
                    visible={visible}
                    onCancel={() => {
                        this.setState({visible: false})
                    }}
                    record={this.state.record}
                    title={this.state.record ? "修改初始数据" : "添加初始数据"}
                    dataSource={this.state.modalData}
                    tableId={this.props.tableId}
                />


            </div>
        );
    }
}
