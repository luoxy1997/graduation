import React, {Component} from 'react';
import {Form, Input, Button, Table, Divider, Pagination} from 'antd';
import PageContent from '../../layouts/page-content';
import ImportModal from './ImportModal';
import AddSchema from './AddSchema';
import SqlDetails from './SqlDetails';
import './style.less';

export const PAGE_ROUTE = '/schemaSys';
const FormItem = Form.Item;
@Form.create()


export default class SchemaSys extends Component {
    state = {
        pageNum: 1,
        pageSize: 5,
        importVisible: false,   //导入数据框
        addVisible: false,  //新增框
        sqlVisible: false,  //sql详情框
        record: {},
        total: 0,
        visible:false,
        dataSource: [],
        loading: false,
        id: "",
        display:'none',
    };

    componentWillMount() {
        this.search();
    }

    //查询
    search = (args = {}) => {
        const {pageNum = this.state.pageNum, pageSize = this.state.pageSize} = args;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.ajax.get(`/schemainfo?pageNum=${pageNum}&pageSize=${pageSize}`, values)
                    .then(res => {
                        console.log(res, "search.res");
                        let total = 0;
                        let dataSource = [];
                        let pageNum = this.state.pageNum;
                        if (res) {
                            total = res.totalElements || 0;
                            dataSource = res.content || [];
                            pageNum = res.number;
                        }
                        this.setState({total, dataSource, pageNum});
                    })
                    .finally(() => this.setState({loading: false}));
            }
        });
    };

    // 默认获取数据分页
    changePage = (pageNum) => {
        //塞数据
        this.setState({pageNum: pageNum});
        //塞数据后立即执行函数并使用数据时，会产生异步，此时我们获取不到最新的值，所以我们这个时候传参
        this.search({pageNum: pageNum, pageSize: this.state.pageSize});
    };

    //导入库
    importModal = (value) => {
        this.setState({importVisible: true});

    };


    //新增或修改
    addModal = (record) => {
        this.setState({visible: true});
        //修改
        if (record) {
            this.setState({record: record,display:'none'});
        } else {
            this.setState({record: null,display:'block'});
        }
    };

    onOk = (values) => {
        const {loading} = this.state;
        const {record} = this.state;
        const submitAjax = record ? this.props.ajax.put : this.props.ajax.post;
        const url = `/schemainfo`;
        const successTip = record ? '修改成功' : '添加成功';
        if (loading) return;
         submitAjax(url, values,{successTip})
                .then(res => {
                    this.setState({visible: false});
                    this.search({pageNum:1})
                })
                .catch(() => this.setState({visible: true,loading:false}));

    };

    //查看sql
    sqlModal = (record) => {
        this.setState({
            id: record.id,
            sqlVisible: true,
        });
    };

    importData = () => {
        this.props.history.push('/ImportEdit')

    };

    render() {
        const {importVisible, visible, sqlVisible, dataSource,display} = this.state;
        const {getFieldDecorator} = this.props.form;
        const columns = [{
            title: '应用',
            dataIndex: 'appName',
            key: 'appName',
        }, {
            title: 'schema',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '备注说明',
            dataIndex: 'remark',
            key: 'remark',
        }, {
            title: '操作',
            render: (record) => {
                return (
                    <span>
                        <a onClick={() => {
                            this.addModal(record)
                        }}>修改</a>
                        <Divider type="vertical"/>
                        <a onClick={() => {
                            this.sqlModal(record)
                        }}>查看SQL</a>
                    </span>)
            }
        },];

        return (
            <PageContent>
                <Form layout="inline"
                      style={{padding: '24px', background: '#fbfbfb', border: '1px solid #d9d9d9', borderRadius: '6px'}}
                >
                    <FormItem
                        label="应用"
                    >
                        {getFieldDecorator('appName')(
                            <Input placeholder="请输入应用名称！"/>
                        )}

                    </FormItem>
                    <FormItem
                        label="schema"
                    >
                        {getFieldDecorator('name')(
                            <Input placeholder="请输入schema名称！"/>
                        )}

                    </FormItem>
                    <FormItem>

                        <Button type="primary" htmlType="submit" onClick={() => this.search({pageNum: 1})} style={{marginRight: 10, marginLeft: 10}}>查询</Button>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" onClick={() => this.addModal(null)} style={{marginRight: 10}}>添加</Button>
                    </FormItem>
                    <FormItem>
                        <Button  type="primary" htmlType="submit" onClick={this.importData} style={{marginRight: 10}}>导入</Button>

                    </FormItem>
                </Form>
                <Table columns={columns} dataSource={dataSource} styleName='table' pagination={false} rowKey={(record) =>record.id}/>
                <Pagination
                    current={this.state.pageNum}//当前的页数
                    total={this.state.total}//接受的总数
                    pageSize={this.state.pageSize}//一页的条数
                    onChange={this.changePage}//改变页数
                    showQuickJumper//快速跳转
                    style={{textAlign: 'center', marginTop: '20px'}}
                    showTotal={total => `共 ${total}条`}//共多少条
                />
                <ImportModal
                    visible={importVisible}
                    onCancel={() => {
                        this.setState({importVisible: false})
                    }}
                    onOK={this.importModal}

                />
                <AddSchema
                    visible={visible}
                    onCancel={() => {
                        this.setState({visible: false})
                    }}
                    display={display}
                    title={this.state.record ? "修改" : "添加"}
                    onOk={this.onOk}
                    record={this.state.record}

                />
                <SqlDetails
                    id={this.state.id}
                    visible={sqlVisible}
                    onCancel={() => {
                        this.setState({sqlVisible: false})
                    }}
                />
            </PageContent>
        );
    }
}
