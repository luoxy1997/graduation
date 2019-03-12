import React, {Component} from 'react';
import {Button, Divider, Table, Modal, Form, Pagination} from 'antd';
import '../style.less';
import ColEditModal from "./ColEditModal";
import {ajaxHoc} from "../../../commons/ajax";
import {connect} from '../../../models';

const confirm = Modal.confirm;
@ajaxHoc()
@Form.create()
@connect()
@connect(state => {
    const {colData} = state.colData;
    return {colData};
})
export default class ColItem extends Component {
    state = {
        colVisible: false,
        record: null,
        sql: null,
        pageNum: 1,
        pageSize: 10,
        total: 0,
        dataSource: [],
        loading: true,
    };


    search = (args = {}) => {
        const {pageNum = this.state.pageNum, pageSize = this.state.pageSize} = args;
        const tableId = {tableId: this.props.tableId};
        this.props.ajax.get(`/columninfo?pageNum=${pageNum}&pageSize=${pageSize}`, tableId)
            .then(res => {
                if (res) {
                    const total = res.totalElements || 0;
                    const dataSource = res.content || [];
                    const pageNum = res.number;
                    this.setState({total, dataSource, pageNum, loading: false});

                }

            })
            .finally(() => this.setState({loading: false}));
        //查询出所有的列，发送redux
        this.props.ajax.get(`/columninfo?pageSize=9999`, tableId)
            .then(res => {
                if (res) {
                    //构造初始化数据所table所需要的列，发送redux
                    const columns = res.content.map(item => {
                            return {
                                title: item.name,
                                dataIndex: item.id,
                                width:'250px'
                            }
                        }
                    );
                    this.props.action.colData.setColData(columns);
                }

            })

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

    //新增或修改
    addCol = (record) => {
        this.setState({colVisible: true});
        //修改
        if (record) {
            this.setState({record: record});
        } else {
            this.setState({record: null,});
        }
    };


    handleDelete = (record) => {
        const {name, id} = record;
        const successTip = `删除“${name}”成功！`;
        this.setState({loading: true});
        confirm({
            title: `您确定要删除“${name}”？`,
            onOk: () => {
                this.props.ajax.del(`/columninfo/${id}`, null, {successTip})
                    .then(() => {
                        const dataSource = this.state.dataSource.filter(item => item.id !== id);
                        this.setState({dataSource,loading: false});
                        this.search({pageNum: 1, pageSize: this.state.pageSize, });
                    })
                    .catch(() => {
                        this.setState({
                            loading: false
                        });
                    })

            },
            onCancel:() => {
                this.setState({
                    loading: false
                });
            }
        });
    };

    handleOk = (values) => {
        const {record} = this.state;
        const submitAjax = record ? this.props.ajax.put : this.props.ajax.post;
        const url = '/columninfo';
        const successTip = record ? '修改成功' : '添加成功';
        this.setState({loading: true});
        submitAjax(url, values, {successTip})
            .then(() => {
                this.setState({colVisible: false, loading: false});
                this.search({pageNum: 1})
            })
            .finally(() => this.setState({loading: false}));
    };


    render() {
        const {record, dataSource, loading} = this.state;

        const columns = [{
            title: '列名',
            dataIndex: 'name',
            key: 'name',
            align: 'center'
        }, {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            align: 'center'
        }, {
            title: '长度',
            dataIndex: 'length',
            key: 'length',
            align: 'center'
        }, {
            title: '主键',
            dataIndex: 'primaryKey',
            key: 'primaryKey',
            align: 'center',
            render: (text) => text ? "Y" : "N"
        }, {
            title: 'Not Null',
            dataIndex: 'notNull',
            key: 'notNull',
            align: 'center',
            render: (text) => text ? "Y" : "N"
        }, {
            title: '自增',
            dataIndex: 'autoincrement',
            key: 'autoincrement',
            align: 'center',
            render: (text) => text ? "Y" : "N"
        }, {
            title: '默认值',
            dataIndex: 'defaultValue',
            key: 'defaultValue',
            align: 'center',
            render: (text) => text ? "Y" : "N"
        }, {
            title: '备注',
            dataIndex: 'remark',
            align: 'center',
            key: 'remark',
        }, {
            title: '操作',
            align: 'center',
            render: (record) => {
                return (
                    <span>
                        <a onClick={() => {
                            this.addCol(record)
                        }}>修改</a>
                        <Divider type="vertical"/>
                        <a onClick={() => {
                            this.handleDelete(record)
                        }}>删除</a>
                    </span>)
            }
        }];


        return (
            <div>
                <div style={{float: 'right', paddingRight: 20, marginTop: '-30px', marginBottom: '20px'}}>
                    <Button type="primary" onClick={() => this.addCol(null)}>+ 添加列</Button>
                </div>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    styleName="table"
                    rowKey={record => record.id}
                    pagination={false}
                    loading={loading}
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
                <ColEditModal
                    mask
                    width="700px"
                    title={record ? '修改' : '添加'}
                    visible={this.state.colVisible}
                    destroyOnClose={true}
                    onOk={this.handleOk}
                    onCancel={() => {
                        this.setState({colVisible: false})
                    }}
                    tableId={this.props.tableId}
                    record={this.state.record}
                >
                </ColEditModal>

            </div>
        );
    }
}
