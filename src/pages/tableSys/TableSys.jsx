import React, {Component} from 'react';
import {Form, Input, Button, Table, Divider, Modal} from 'antd';
import PageContent from '../../layouts/page-content';
import './style.less';
import ImportTable from './ImportTable';
import InitialData from "./InitialData";
export const PAGE_ROUTE = '/tableSys';
const FormItem = Form.Item;
const confirm = Modal.confirm;
@Form.create()


export default class SchemaSys extends Component {
    state={
        importVisible: false,   //导入数据框
        addVisible: false,  //新增框
        sqlVisible: false,  //sql详情框
        record: null,
    };

    //导入库
    importModal = (value) =>{
        this.setState({importVisible: true});
        console.log(value,'value')
    };

    //新增或修改
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
        },  {
            title: '备注说明',
            dataIndex: 'address',
            key: 'address1',
        },
            {
            title: '操作',
            render: (record) => {
                return (
                    <span>
                        <a onClick={() => {this.addModal(record)}}>修改</a>
                        <Divider type="vertical" />
                        <a onClick={() => {this.deleteItem(record)}}>删除</a>
                        <Divider type="vertical" />
                        <a onClick={() => {this.sqlModal(record)}}>查看修改SQL</a>
                        <Divider type="vertical" />
                        <a onClick={() => {this.sqlModal(record)}}>修改日志</a>
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
        return (
            <PageContent>
                <Form layout="inline"
                      style={{padding: '24px', background: '#fbfbfb', border: '1px solid #d9d9d9', borderRadius: '6px'}}
                >
                    <FormItem
                        label="应用"
                    >
                        <Input
                            placeholder="请输入应用名称"
                        />

                    </FormItem>
                    <FormItem
                        label="schema"
                    >
                        <Input
                            placeholder="请输入schema"
                        />

                    </FormItem>
                    <FormItem
                        label="table"
                    >
                        <Input
                            placeholder="请输入表名"
                        />

                    </FormItem>
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
                </Form>
                <Table columns={columns} dataSource={data} styleName="table" />
                <ImportTable
                    visible={this.state.importVisible}
                    onOK={this.importModal}
                    onCancel={()=>{this.setState({importVisible: false})}}
                />
                <InitialData
                    visible={this.state.initalVisble}
                />

            </PageContent>
        );
    }
}
