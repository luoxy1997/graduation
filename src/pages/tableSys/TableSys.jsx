import React, {Component} from 'react';
import {Form, Input, Button, Table, Divider, Row, Col, Popconfirm, Pagination} from 'antd';
import PageContent from '../../layouts/page-content';
import './style.less';
import ImportTable from './ImportTable';
import SqlDetails from '../schema/SqlDetails';
import notify from './notify';


export const PAGE_ROUTE = '/tableSys';
const FormItem = Form.Item;
@Form.create()


export default class SchemaSys extends Component {
    state = {
        importVisible: false,   //导入数据框
        addVisible: false,  //新增框
        sqlVisible: false,  //sql详情框
        record: null,
        pageNum: 1,
        pageSize: 10,
        data:[],
        loading:false,
    };

    componentWillMount() {
        this.search();
    }

    //气泡确认框确认删除
    confirm = (record) => {
        const {id} = record;
        this.props.ajax.del(`/tableinfo/${id}`)
            .then(() => {
                    notify('success', '删除成功');
                }
            );
    };

    //导入库从子页面传来的保存按纽值
    onOk = (value) => {
        const {loading} = this.state;
        if (loading) return;
        this.setState({loading: true});
        this.props.ajax.post('/import/table', value,{successTip:'导入数据成功'})
            .then(() => {
                this.setState({importVisible: false});
            })
            .catch(() => this.setState({importVisible: true,loading:false}))
            .finally(() => this.setState({loading: false}));
    };

    //导入库
    importModal = () => {
        this.setState({importVisible: true});
    };
    //修改
    modifyTable = (record) => {
        const {id,name,remark}= record;
        this.props.history.push({ pathname:'/modifyTable',state:{id,name,remark} })
    };

    //新增
    addTable = () => {
        this.props.history.push('/addTable')

    };


    //查看sql
    sqlModal = (record) => {
        this.setState({sqlVisible: true, record});
    };

    //修改日志
    sqlDetails = (record) => {
        const id = record.name;
        this.props.history.push({pathname: '/modifyLog', state: {id}});
        this.setState({changeLogVisible: true});
    };

    //默认获取数据
    search = (args = {}) => {
        const {pageNum = this.state.pageNum, pageSize = this.state.pageSize} = args;
        this.props.ajax.get(`/tableinfo?pageNum=${pageNum}&pageSize=${pageSize}`)
            .then(res => {
                const data = res.content.map(item => {
                    return {
                        schemaName: item.schemaInfo.name,
                        appName: item.schemaInfo.appName,
                        ...item
                    }
                });
                this.setState({
                    data,
                    pageNum: res.number,
                    pageSize: res.size,
                });
            })

    };
    // 默认获取数据分页
    changePage = (pageNum) => {
        //塞数据
        this.setState({pageNum: pageNum});
        //塞数据后立即执行函数并使用数据时，会产生异步，此时我们获取不到最新的值，所以我们这个时候传参
        this.search({pageNum: pageNum, pageSize: this.state.pageSize});
    };


    render() {
        const {getFieldDecorator} = this.props.form;
        const columns = [{
            title: '应用名称',
            dataIndex: 'appName',
        }, {
            title: 'schema名称',
            dataIndex: 'schemaName',
        }, {
            title: 'table名称',
            dataIndex: 'name',
        }, {
            title: '备注说明',
            dataIndex: 'remark',
        },
            {
                title: '操作',
                render: (record) => {
                    return (
                        <span>
                        <a onClick={() => {
                            this.modifyTable(record)
                        }}>修改</a>
                        <Divider type="vertical"/>
                        <Popconfirm title="确定删除这条数据吗?" onConfirm={() => this.confirm(record)} onCancel={this.cancel} okText="确定" cancelText="取消">
                            <a>删除</a>
                        </Popconfirm>
                        <Divider type="vertical"/>
                        <a onClick={() => {
                            this.sqlModal(record)
                        }}>查看SQL</a>
                        <Divider type="vertical"/>
                        <a onClick={() => {
                            this.sqlDetails(record)
                        }}>修改日志</a>
                    </span>)
                }
            },];

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        return (
            <PageContent>
                <Form layout="inline"
                      style={{padding: 24, background: '#fbfbfb', border: '1px solid #d9d9d9', borderRadius: '6px'}}
                >
                    <Row>
                        <Col span={6}>
                            <FormItem label="应用" {...formItemLayout}>
                                {getFieldDecorator('appName')(
                                    <Input
                                        placeholder="请输入schema"
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label="schema" {...formItemLayout}>
                                {getFieldDecorator('schemaName')(
                                    <Input
                                        placeholder="请输入schema"
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="table"
                            >
                                {getFieldDecorator('schemaName')(
                                    <Input
                                        placeholder="请输入表名"
                                    />
                                )}

                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                >
                                    查询
                                </Button>
                            </FormItem>
                            <FormItem>
                                <Button
                                    type="primary" ghost
                                    htmlType="submit"
                                    onClick={() => this.addTable(null)}
                                >
                                    添加
                                </Button>
                            </FormItem>
                            <FormItem>
                                <Button
                                    type="dashed"
                                    htmlType="submit"
                                    onClick={this.importModal}
                                >
                                    导入
                                </Button>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>

                <Table columns={columns} dataSource={this.state.data} styleName="table" pagination={false}  rowKey={record => record.name}/>
                <Pagination
                    current={this.state.pageNum}//当前的页数
                    pageSize={this.state.pageSize}//一页的条数
                    onChange={this.changePage}//改变页数
                    showQuickJumper//快速跳转
                    style={{textAlign: 'center', marginTop: '20px'}}
                />
                <ImportTable
                    visible={this.state.importVisible}
                    onOk={this.onOk}
                    schemaData = {this.state.schemaData}
                    onCancel={() => {
                        this.setState({importVisible: false})
                    }}
                />


                <SqlDetails
                    visible={this.state.sqlVisible}
                    onCancel={() => {
                        this.setState({sqlVisible: false})
                    }}
                    record={this.state.record}

                />

            </PageContent>
        );
    }
}
