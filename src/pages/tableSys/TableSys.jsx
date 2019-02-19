import React, {Component} from 'react';
import {Form, Input, Button, Table, Divider, Modal, Row, Col, Popconfirm, message} from 'antd';
import PageContent from '../../layouts/page-content';
import './style.less';
import ImportTable from './ImportTable';
import ChangeLog from "./ChangeLog";
import SqlDetails from '../schema/SqlDetails'


export const PAGE_ROUTE = '/tableSys';
const FormItem = Form.Item;
const confirm = Modal.confirm;
@Form.create()


export default class SchemaSys extends Component {
    state = {
        importVisible: false,   //导入数据框
        addVisible: false,  //新增框
        sqlVisible: false,  //sql详情框
        record: null,
    };

    //气泡确认框确认
    confirm = (e) => {
        message.success('删除成功');
    };

    //导入库
    importModal = (value) => {
        this.setState({importVisible: true});
        console.log(value, 'value')
    };
    //修改
    modifyTable = () => {
        this.props.history.push('/modifyTable')
    }

    //新增
    addTable = () => {
        this.props.history.push('/addTable')

    };

    //删除
    deleteItem = (record) => {
        confirm({
            title: '确认删除？',
            onOk: () => {
                console.log(record);
            }
        });
    };

    //查看sql
    sqlModal = (record) => {
        this.setState({sqlVisible: true});
    };

    //修改日志
    sqlDetails = (record) => {
        const id = record.name;
        this.props.history.push({ pathname: '/modifyLog', state: { id } });
        this.setState({changeLogVisible: true});
    };


    render() {
        const columns = [{
            title: '应用',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'schema',
            dataIndex: 'age',
            key: 'age',
        }, {
            title: 'table',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: '备注说明',
            dataIndex: 'address',
            key: 'address1',
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
                        <Popconfirm title="确定删除这条数据吗?" onConfirm={this.confirm} onCancel={this.cancel} okText="确定" cancelText="取消">
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

        const data = [{
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        }, {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        }, {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        }];
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

                                <Input
                                    placeholder="请输入应用名称"
                                />

                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label="schema" {...formItemLayout}>
                                <Input
                                    placeholder="请输入schema"
                                />

                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="table"
                            >
                                <Input
                                    placeholder="请输入表名"
                                />

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

                <Table columns={columns} dataSource={data} styleName="table"/>
                <ImportTable
                    visible={this.state.importVisible}
                    onOK={this.importModal}
                    onCancel={() => {
                        this.setState({importVisible: false})
                    }}
                />

                <ChangeLog
                    visible={this.state.changeLogVisible}
                    onCancel={() => {
                        this.setState({changeLogVisible: false})
                    }}
                />
                <SqlDetails
                    visible={this.state.sqlVisible}
                    onCancel={() => {
                        this.setState({sqlVisible: false})
                    }}
                />

            </PageContent>
        );
    }
}
