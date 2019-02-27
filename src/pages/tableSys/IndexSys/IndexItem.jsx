import React, {Component} from 'react';
import {Button, Divider, Table, Popconfirm, message, Form, Row, Select, Col, Modal, Input} from 'antd';
import '../style.less';

const FormItem = Form.Item;
const {Option} = Select;
const {TextArea} = Input;
@Form.create()

export default class IndexItem extends Component {
    state = {
        visible: false,
        record: null,
        selectedRows: [],        //选中列信息的行
        tableConfig: [{         //添加索引配置列信息
            key: '0',
            name: 'id',
        }, {
            key: '1',
            name: 'name',
        }, {
            key: '2',
            name: 'sex',
        }],
        indexData: [],           //索引表格信息
    };
    //气泡确认框确认
    confirm = (e) => {
        message.success('删除成功');
    };
    addIndex = (record) => {
        const id = record.id;
        this.setState({
            visible: true,
        });
        if (id) {
            this.setState({record: record});
        } else {
            this.setState({record: null});
        }
    };

    handleOk = () => {
        this.props.form.validateFields((err, value) => {
            const {selectedRowKeys} = this.state;
            if (!err) {
                const tableData = selectedRowKeys && selectedRowKeys.length && selectedRowKeys.map(item => {
                    return {
                        name: this.state.tableConfig[item].name,
                        order: value.order[item],
                        number: value.number[item],
                    }
                });
                delete value.order;
                delete value.number;
                const result = {...value, columns: tableData};    //添加索引信息后数据
                const indexData = this.state.indexData;
                indexData.push(result);
                this.setState({
                    indexData,
                    visible: false,
                });

            }
        });
    };


    render() {
        const {getFieldDecorator} = this.props.form;
        const {record} = this.state;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 17},
            },
        };
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys,
                    selectedRows
                });

            }
        };

        const columns = [{
            title: '索引名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '索引类型',
            dataIndex: 'type',
            key: 'type',
        }, {
            title: '列',
            dataIndex: 'row',
            key: 'row',
        }, {
            title: '操作',
            render: (record) => {
                return (
                    <span>
                        <a onClick={() => {
                            this.addIndex(record)
                        }}>修改</a>
                        <Divider type="vertical"/>
                        <Popconfirm title="确定删除这条数据吗?" onConfirm={this.confirm} onCancel={this.cancel} okText="确定" cancelText="取消">
                            <a>删除</a>
                        </Popconfirm>


                    </span>)
            }
        },];


        const columns2 = [{
            align: 'center',
            title: '列',
            dataIndex: 'name',
            render: text => <a>{text}</a>,
        }, {
            align: 'center',
            title: '顺序',
            render: (text, record) =>
                <FormItem>
                    {getFieldDecorator(`number[${record.key}]`, {
                        initialValue: record && record.number,
                        onChange: this.handleChange
                    })(
                        <Input
                            style={{width: 100}}
                            onChange={e => {
                                record.money = e.target.value;
                            }}
                        />
                    )}

                </FormItem>
        }, {
            align: 'center',
            title: '排序',
            render: (text, record) =>
                <FormItem>
                    {getFieldDecorator(`order[${record.key}]`, {
                        initialValue: record && record.order,
                        onChange: this.handleChange
                    })(
                        <Select style={{width: 120}} placeholder='选择排序方式'>
                            <Option value="ASC">ASC</Option>
                            <Option value="DESC">DESC</Option>
                        </Select>
                    )}

                </FormItem>
        }];

        return (
            <div>
                <div style={{float: 'right', paddingRight: 20, marginTop: '-30px', marginBottom: '20px'}}>
                    <Button type="primary" onClick={this.addIndex}>+ 添加索引</Button>
                </div>
                <Table dataSource={this.state.indexData} columns={columns} styleName="table"/>
                <Modal
                    mask
                    width="500px"
                    title={record ? '修改' : '添加'}
                    visible={this.state.visible}
                    onCancel={() => {
                        this.setState({visible: false})
                    }}
                    footer={[
                        <Button key="submit" type="primary" onClick={this.handleOk}>
                            保存
                        </Button>,
                    ]}
                >
                    <Form>
                        <Row>
                            <FormItem label="索引名称" {...formItemLayout}>
                                {getFieldDecorator('name', {
                                    initialValue: record && record.name
                                })(
                                    <Input/>
                                )}

                            </FormItem>
                        </Row>
                        <Row>
                            <FormItem label="索引类型" {...formItemLayout}>
                                {getFieldDecorator('type', {
                                    initialValue: record && record.type,
                                    onChange: this.handleChange
                                })(
                                    <Select>
                                        <Option value="PRIMARY KEY">PRIMARY KEY</Option>
                                        <Option value="INDEX">INDEX</Option>
                                        <Option value="INDEX">INDEX</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Row>
                        <Row>
                            <FormItem>
                                <Table
                                    columns={columns2}
                                    dataSource={this.state.tableConfig}
                                    bordered
                                    pagination={false}
                                    rowSelection={rowSelection}
                                />
                            </FormItem>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <FormItem label="备注" {...formItemLayout}>
                                    {getFieldDecorator('remark', {
                                        initialValue: record && record.remark
                                    })(
                                        <TextArea rows={4}/>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>


                    </Form>
                </Modal>
            </div>


        );
    }
}
