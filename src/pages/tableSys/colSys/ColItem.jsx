import React, {Component} from 'react';
import {Button, Divider, Col, Row, Table, Popconfirm, Input, Radio, Select, Modal, Form} from 'antd';
import '../style.less';
import sqlFormatter from "sql-formatter";

const TextArea = Input.TextArea;
const FormItem = Form.Item;
const {Option} = Select;
const uuid = require('uuid/v1');
@Form.create()

export default class ColItem extends Component {
    state = {
        colVisible: false,
        record: null,
        sql: null,
        data: [],
    };

    //气泡确认框确认
    confirm = (record) => {
        const {data} = this.state;
        const newData = data.filter(item => {
            return item.id !== record.id;
        });
        this.setState({
            data: newData,
        })



    };

    componentWillMount() {
        const sql = sqlFormatter.format("er_tables t order by t.NUM_ROWS desc;");
        this.setState({sql})
    }


    addCol = (record) => {
        this.setState({
            colVisible: true,
        });
        if (record) {
            this.setState({record: record});
        } else {
            this.setState({record: null});
        }
    };

    handleOk = () => {
        const {record} = this.state;
        //  修改
        if (record) {
            this.props.form.validateFields((err, value) => {
                const modifyData = this.state.data.filter(item => {
                    return item.id !== record.id;
                });
                modifyData.push(value);
                this.setState({
                    data: modifyData,
                    colVisible: false,
                });

            });
        } else {
            //新增
            this.props.form.validateFields((err, value) => {
                if (!err) {
                    const data = this.state.data;
                    data.push(value);
                    this.setState({
                        data: data,
                        colVisible: false,
                    });

                }
            })
        }

    };


    render() {
        const {getFieldDecorator} = this.props.form;
        const {record, data} = this.state;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 12},
            },
        };
        const formDescLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 18},
            },
        };
        const options = ["bigint", "blob", "boolean", "char", "clob", "currency", "datetime", "date", "decimal", "double", "float", "int", "mediumint", "nchar", "nvarchar", "number", "smallint", "time", "timestamp", "tinyint", "varchar"];
        const columns = [{
            title: '列名',
            dataIndex: 'name',
        }, {
            title: '类型',
            dataIndex: 'type',
        }, {
            title: '长度',
            dataIndex: 'length',
        }, {
            title: '主键',
            dataIndex: 'primaryKey',
        }, {
            title: 'Not Null',
            dataIndex: 'notNull',
        }, {
            title: '自增',
            dataIndex: 'autoincrement',
        }, {
            title: '默认值',
            dataIndex: 'defaultValue',
        }, {
            title: '备注',
            dataIndex: 'remark',
        }, {
            title: '操作',
            render: (record) => {
                return (
                    <span>
                        <a onClick={() => {
                            this.addCol(record)
                        }}>修改</a>
                        <Divider type="vertical"/>
                        <Popconfirm title="确定删除这条数据吗?" onConfirm={() => this.confirm(record)} okText="确定" cancelText="取消">
                            <a>删除</a>
                        </Popconfirm>
                    </span>)
            }
        }];

        const item = this.props.form.getFieldValue('defaultValueIsFunc') ?
            <FormItem label="默认值" {...formItemLayout}>
                {getFieldDecorator('defaultValue', {
                    initialValue: record && record.defaultValue
                })(
                    <Input/>
                )}
            </FormItem> :
            <FormItem label="默认值" {...formItemLayout}>
                {getFieldDecorator('defaultValue', {
                    initialValue: record && record.defaultValue
                })(
                    <Select>
                        <Option value='1'>当前时间</Option>
                    </Select>
                )}
            </FormItem>;


        return (
            <div>
                <div style={{float: 'right', paddingRight: 20, marginTop: '-30px', marginBottom: '20px'}}>
                    <Button type="primary" onClick={() => this.addCol(null)}>+ 添加列</Button>
                </div>
                <Table
                    dataSource={data}
                    columns={columns}
                    styleName="table"
                    rowKey={record => record.id}
                    pagination={null}
                />
                <Modal
                    mask
                    width="700px"
                    title={record ? '修改' : '添加'}
                    visible={this.state.colVisible}
                    destroyOnClose={true}
                    onOk={this.handleOk}
                    onCancel={() => {
                        this.setState({colVisible: false})
                    }}
                    footer={[
                        <Button key="submit" type="primary" onClick={this.handleOk}>
                            保存
                        </Button>,
                    ]}
                >
                    <Form>
                        <Row>
                            <Col span={12}>
                                <FormItem {...formItemLayout}>
                                    {getFieldDecorator('id', {
                                        initialValue: uuid(),
                                    })(
                                        <Input type="hidden"/>
                                    )}

                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem label="列名" {...formItemLayout}>
                                    {getFieldDecorator('name', {
                                        initialValue: record && record.name
                                    })(
                                        <Input/>
                                    )}

                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="类型" {...formItemLayout}>
                                    {getFieldDecorator('type', {
                                        initialValue: record && record.type
                                    })(
                                        <Select>
                                            {options.map(
                                                (item, index) => {
                                                    return (
                                                        <Option key={index} value={index}>{item}</Option>
                                                    )
                                                }
                                            )}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem label="长度" {...formItemLayout}>
                                    {getFieldDecorator('length', {
                                        initialValue: record && record.address
                                    })(
                                        <Input/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                {item}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem label="主键" {...formItemLayout}>
                                    {getFieldDecorator('primaryKey', {
                                        initialValue: record && record.primaryKey
                                    })(
                                        <Radio.Group buttonStyle="solid">
                                            <Radio.Button value="a">是</Radio.Button>
                                            <Radio.Button value="b">否</Radio.Button>

                                        </Radio.Group>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="默认值为函数" {...formItemLayout}>
                                    {getFieldDecorator('defaultValueIsFunc', {
                                        initialValue: record && record.defaultValueIsFunc,
                                    })(
                                        <Radio.Group buttonStyle="solid">
                                            <Radio.Button value={true}>是</Radio.Button>
                                            <Radio.Button value={false}>否</Radio.Button>

                                        </Radio.Group>
                                    )}
                                </FormItem>
                            </Col>

                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem label="Not Null" {...formItemLayout}>
                                    {getFieldDecorator('notNull', {
                                        initialValue: record && record.notNull
                                    })(
                                        <Radio.Group buttonStyle="solid">
                                            <Radio.Button value="0">是</Radio.Button>
                                            <Radio.Button value="1">否</Radio.Button>

                                        </Radio.Group>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="自增" {...formItemLayout}>
                                    {getFieldDecorator('autoincrement', {
                                        initialValue: record && record.autoincrement
                                    })(
                                        <Radio.Group buttonStyle="solid">
                                            <Radio.Button value="1">是</Radio.Button>
                                            <Radio.Button value="0">否</Radio.Button>

                                        </Radio.Group>
                                    )}
                                </FormItem>
                            </Col>

                        </Row>
                        <Row>
                            <Col span={24}>
                                <FormItem label="备注" {...formDescLayout}>
                                    {getFieldDecorator('remark', {
                                        initialValue: record && record.remark
                                    })(
                                        <TextArea rows={2}/>
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
