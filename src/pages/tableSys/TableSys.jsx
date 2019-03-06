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
        data: null,
        total: 0,


    };

    componentWillMount() {
        this.search();
    }

    //气泡确认框确认删除
    confirm = (record) => {
        const {id} = record;
        this.props.ajax.del(`/tableinfo/${id}`)
            .then(() => {
                    this.search({pageNum: 1, pageSize: this.state.pageSize});
                    notify('success', '删除成功');
                }
            );
    };

    //导入库
    importModal = (value) => {
        this.setState({importVisible: true});
        console.log(value, 'value')
    };
    //修改
    modifyTable = () => {
        this.props.history.push('/modifyTable')
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
        const tableId = record.id;
        const schemaId = record.schemaInfo.id;
        this.props.history.push({pathname: '/modifyLog', state: {tableId,schemaId}});
        this.setState({changeLogVisible: true});
    };

    //默认获取数据
    search = (args = {}) => {
        const {pageNum = this.state.pageNum, pageSize = this.state.pageSize} = args;
        const value = this.props.form.getFieldsValue();
        this.props.ajax.get(`/tableinfo?pageNum=${pageNum}&pageSize=${pageSize}`,value)
            .then(res => {
                const data = res && res.content.length && res.content.map(item => {
                    return {schemaName: item.schemaInfo.name, appName: item.schemaInfo.appName, ...item}
                });
                this.setState({
                    data,
                    pageNum: res.number,
                    pageSize: res.size,
                    total: res.totalElements
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
                                        placeholder="请输入应用名称"
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
                                {getFieldDecorator('tableName')(
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
                                    onClick={this.search}
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

                <Table
                    columns={columns}
                    dataSource={this.state.data}
                    styleName="table"
                    rowKey={record => record.name}/>
                <Pagination
                    current={this.state.pageNum}//当前的页数
                    total={this.state.total}//接受的总数
                    pageSize={this.state.pageSize}//一页的条数
                    onChange={this.changePage}//改变页数
                    showQuickJumper//快速跳转
                    style={{textAlign: 'center', marginTop: '20px'}}
                    showTotal={total => `共 ${total}条`}//共多少条
                />
                <ImportTable
                    visible={this.state.importVisible}
                    onOK={this.importModal}
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
