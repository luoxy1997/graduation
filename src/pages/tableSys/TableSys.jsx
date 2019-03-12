import React, {Component} from 'react';
import {Form, Input, Button, Table, Divider, Row, Col, Pagination} from 'antd';
import PageContent from '../../layouts/page-content';
import './style.less';
import ImportTable from './ImportTable';
import TabSqlDetails from './TabSqlDetails';
import {Modal} from "antd/lib/index";


export const PAGE_ROUTE = '/tableSys';
const FormItem = Form.Item;
const confirm = Modal.confirm;
@Form.create()


export default class SchemaSys extends Component {
    state = {
        importVisible: false,   //导入数据框
        addVisible: false,      //新增框
        sqlVisible: false,      //sql详情框
        record: null,           //表格中每一行数据
        dataSource: [],
        tableLoading: true,     //表格loading
        pageNum: 1,             //分页有关配置
        pageSize: 10,
        total: 0,


    };

    componentWillMount() {
        this.search();
    }

    //气泡确认框确认删除(修改统一)
    handleDelete = (record) => {
        this.setState({tableLoading: true});
        const {appName} = record;
        const {id} = record;
        const successTip = `删除“${appName}”成功！`;
        confirm({
            okText:"确认",
            cancelText:"取消",
            title: `您确定要删除“${appName}”？`,
            onOk: () => {
                this.props.ajax.del(`/tableinfo/${id}`, null, {successTip})
                    .then(() => {
                        this.search();
                        this.setState({tableLoading: false,});
                    })
                    .catch(() => this.setState({tableLoading: false}))

            },
            onCancel: () => {
                this.setState({tableLoading: false,});
            }
        });
    };

    //导入库从子页面传来的保存按纽值
    onOk = (value) => {
        this.props.ajax.post('/import/table', value, {successTip: '导入数据成功'})
            .then(() => {
                this.setState({importVisible: false});
            })
            .catch(() => this.setState({importVisible: true, loading: false}))
            .finally(() => this.setState({loading: false}));
        this.search();

    };

    //导入库
    importModal = () => {
        this.setState({importVisible: true});
    };

    //修改
    modifyTable = (record) => {
        const {id, name, remark} = record;
        this.props.history.push({pathname: '/modifyTable', state: {id, name, remark}})
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
        this.props.history.push({pathname: '/modifyLog', state: {tableId}});
        this.setState({changeLogVisible: true});
    };

    //默认获取数据
    search = (args = {}) => {
        const {pageNum = this.state.pageNum, pageSize = this.state.pageSize} = args;
        const value = this.props.form.getFieldsValue();
        this.props.ajax.get(`/tableinfo?pageNum=${pageNum}&pageSize=${pageSize}`, value)
            .then(res => {
                const dataSource = res && res.content.length && res.content.map(item => {
                    return {schemaName: item.schemaInfo && item.schemaInfo.name, appName: item.schemaInfo && item.schemaInfo.appName, ...item}
                });
                this.setState({
                    dataSource,
                    pageNum: res.number,
                    pageSize: res.size,
                    total: res.totalElements,
                    tableLoading: false,
                })
            })
            .catch(() => this.setState({tableLoading: false}))
            .finally(() => {
                this.setState({tableLoading: false});
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
        const {record, pageNum, pageSize, tableLoading, dataSource, total, importVisible, schemaData, sqlVisible} = this.state;
        const columns = [{
            title: '应用名称',
            dataIndex: 'appName',
            align: 'center'
        }, {
            title: 'schema名称',
            dataIndex: 'schemaName',
            align: 'center'
        }, {
            title: 'table名称',
            dataIndex: 'name',
            align: 'center'
        }, {
            title: '备注说明',
            dataIndex: 'remark',
            align: 'center'
        },
            {
                title: '操作',
                align: 'center',
                render: (record) => {
                    return (
                        <span>
                        <a onClick={() => {
                            this.modifyTable(record)
                        }}>修改</a>
                        <Divider type="vertical"/>
                       <a onClick={() => {
                           this.handleDelete(record)
                       }}>删除</a>
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
                    dataSource={dataSource}
                    styleName="table"
                    rowKey={record => record.id}
                    pagination={false}
                    loading={tableLoading}
                />

                <Pagination
                    current={pageNum}//当前的页数
                    total={total}//接受的总数
                    pageSize={pageSize}//一页的条数
                    onChange={this.changePage}//改变页数
                    showQuickJumper//快速跳转
                    style={{textAlign: 'center', marginTop: '20px'}}
                    showTotal={total => `共 ${total}条`}//共多少条
                />
                <ImportTable
                    visible={importVisible}
                    onOk={this.onOk}
                    schemaData={schemaData}
                    onCancel={() => {
                        this.setState({importVisible: false})
                    }}
                />
                <TabSqlDetails
                    visible={sqlVisible}
                    onCancel={() => {
                        this.setState({sqlVisible: false})
                    }}
                    record={record}

                />

            </PageContent>
        );
    }
}
