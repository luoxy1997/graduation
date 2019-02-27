import React, {Component} from 'react';
import {Form, Input, Button, Table, Divider, Modal} from 'antd';
import PageContent from '../../layouts/page-content';
import ImportModal from './ImportModal';
import AddSchema from './AddSchema';
import SqlDetails from './SqlDetails';
import './style.less';
export const PAGE_ROUTE = '/schemaSys';
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

    };

    //新增或修改
    addModal = (record,value) => {
        console.log(record,'cccccc');
        this.setState({addVisible: true});
        //修改
        if(record){
           this.setState({record: record});
           console.log(record,'修改');
           console.log(value,'修改');
        }else{
            this.setState({record: null});
            console.log(record,'新增');
            console.log(value,'新增');
        }

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
    sqlModal = () => {
        this.setState({sqlVisible: true});
    };

    render() {
        const {importVisible, addVisible, sqlVisible} = this.state;
        const columns = [{
            title: '应用',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'schema',
            dataIndex: 'age',
            key: 'age',
        }, {
            title: '备注说明',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: '操作',
            render: (record) => {
                return (
                    <span>
                        <a onClick={() => {this.addModal(record)}}>修改</a>
                        <Divider type="vertical" />
                        <a onClick={() => {this.deleteItem(record)}}>删除</a>
                        <Divider type="vertical" />
                        <a onClick={() => {this.sqlModal(record)}}>查看SQL</a>
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
                            onClick={() => this.addModal(null)}
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
                <Table columns={columns} dataSource={data} styleName='table' />
                <ImportModal
                    visible= {importVisible}
                    onCancel= {()=>{this.setState({importVisible:false})}}
                    onOK={this.importModal}

                />
                <AddSchema
                    visible= {addVisible}
                    onCancel= {()=>{this.setState({addVisible:false})}}
                    title={this.state.record ? "修改" : "添加"}
                    onOK={this.addModal}
                    record={this.state.record}

                />
                <SqlDetails
                    visible= {sqlVisible}
                    onCancel= {()=>{this.setState({sqlVisible:false})}}
x2xw
                />
            </PageContent>
        );
    }
}
