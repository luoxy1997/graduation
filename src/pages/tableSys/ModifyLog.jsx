import React, {Component} from 'react';
import {Form, Table, Icon, Pagination, Popconfirm,} from 'antd';
import PageContent from '../../layouts/page-content';
import SqlDesc from './SqlDesc';
import moment from 'moment';
import {Modal} from "antd/lib/index";

const confirm = Modal.confirm;
export const PAGE_ROUTE = '/modifyLog';


@Form.create()
export default class ModifyLog extends Component {
    state = {
        visible: false,
        sqlDescVisible: false,
        pageNum: 1,
        pageSize: 5,
        total: 0,
        dataSource: [],
        record: null,


    };

    componentWillMount() {
        const {pageNum, pageSize} = this.state;
        this.search(pageNum, pageSize);
    }
    //默认数据
    search = (args = {}) => {
        const id = this.props.location.state;
        const {pageSize = this.state.pageSize, pageNum = this.state.pageNum} = args;
        this.props.ajax.get(`/changelog?pageNum=${pageNum}&&pageSize=${pageSize}`, id)
            .then(res => {
                if (res) {
                    this.setState({
                        pageNum: res.number,
                        pageSize: res.size,
                        total: res.totalElements,
                        dataSource: res.content
                    })
                }
            })
    };

    // 默认获取数据分页
    changePage = (pageNum) => {
        //塞数据
        this.setState({pageNum: pageNum});
        //塞数据后立即执行函数并使用数据时，会产生异步，此时我们获取不到最新的值，所以我们这个时候传参
        this.search({pageNum: pageNum});
    };

    // //删除日志
    // deleteItem = (record) => {
    //     const id = record.id;
    //     this.props.ajax.del(`/changelog/${id}`)
    //         .then(() => {
    //             notify('success', '删除成功');
    //             this.search();
    //         });
    // };

    //删除日志(修改统一)
    handleDelete = (record) => {
        const {id} = record;
        const successTip = `删除“${id}”成功！`;
        confirm({
            title: `您确定要删除“${id}”？`,
            onOk: () => {
                this.props.ajax.del(`/changelog/${id}`, null, {successTip})
                    .then(() => {
                        const dataSource = this.state.dataSource.filter(item => item.id !== id);
                        this.setState({dataSource},this.search);
                    });

            },
        });
    };

    //查看Sql
    sqlDetails = (record) => {
        const {id} = record;
        this.setState({sqlDescVisible: true});
        if (id) {
            this.setState({
                record,
            })
        } else {
            this.setState({
                record: null
            })
        }


    };


    render() {
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                fixed: 'left',
                width: '60px'
            },
            {
                title: '表',
                dataIndex: 'tableId',
                width: '100px'
            },
            {
                title: '修改人',
                dataIndex: 'userId',
                width: '100px'
            },
            {
                title: '修改集',
                dataIndex: 'changeContent',
                width: '400px'
            },
            {
                title: '回滚',
                dataIndex: 'rollbackContent',
                width: '400px'
            },
            {
                title: '日期',
                dataIndex: 'updateTime',
                align: 'center',
                render: text => <span>{moment(text).format("YYYY-MM-DD HH:mm:ss")}</span>
            },
            {
                title: '操作',
                width: 100,
                fixed: 'right',
                align: 'center',
                render: record =>
                    <span>
                        <a onClick={() => {
                            this.handleDelete(record)
                        }}>删除</a><br/>
                        <a onClick={() => this.sqlDetails(record)}>查看SQL</a>
                    </span>
            },
        ];


        return (
            <PageContent>

                <div style={{fontWeight: 'bold', fontSize: '18px', paddingBottom: 20}}>
                    <div style={{float: 'left', background: '#1890ff', height: 28, width: 5, marginRight: 5}}></div>
                    <Icon type="form" style={{marginRight: 5}}/>
                    修改日志
                </div>
                <Table
                    columns={columns}
                    dataSource={this.state.dataSource}
                    pagination={false}
                    rowKey={record => record.id}
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
                <SqlDesc
                    visible={this.state.sqlDescVisible}
                    onCancel={() => {
                        this.setState({sqlDescVisible: false})
                    }}
                    record={this.state.record}
                />
            </PageContent>
        );
    }
}
