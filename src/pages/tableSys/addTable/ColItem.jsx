import React, {Component} from 'react';
import {Button, Divider, Col, Row, Table, Popconfirm, Input, Radio, Select, Modal, Form,} from 'antd';
import '../style.less';
import {connect} from '../../../models';
import notify from '../notify'
const TextArea = Input.TextArea;
const FormItem = Form.Item;
const {Option} = Select;
const confirm = Modal.confirm;
const uuid = require('uuid/v1');
@Form.create()

@connect()
@connect(state => {
    const {data} = state.colData;
    return {data};
})

export default class ColItem extends Component {
    state = {
        colVisible: false,
        record: null,
        sql: null,
        data: [],
    };

    //气泡确认框确认删除(修改统一)
    handleDelete = (record) => {
        const {name} = record;
        confirm({
            title: `您确定要删除“${name}”？`,
            onOk: () => {
                const data = this.state.data.filter(item => {
                    return item.id !== record.id;
                });
                notify('success', `删除${name}成功~`);
                this.setState({data}, () => this.sendData());
            },
        });
    };


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

    //新增/修改/删除时，redux发送数据
    sendData = () => {
        const columns = this.state.data.map(item => {
            return {
                name: item.name,
                key: item.name,
            }
        });
        this.props.action.colData.setData(columns);
        this.props.fetchCol(this.state.data);
    };

    handleOk = () => {
        const {record,} = this.state;
        let {data} = this.state;
        this.props.form.validateFields((err, value) => {
            if (!err) {
                //新增修改索引
                if (record) {
                    data = this.state.data.filter(item => {
                        return item.id !== record.id;
                    });
                }
                data.push(value);
                notify('success', '操作成功~');
                this.setState({
                    data,
                    colVisible: false,
                }, () => {
                    this.sendData();
                })



            }

        });

    };
    //自定义校验重复列名
    validateName = (rule, value, callback) => {
        const {data, record} = this.state;
        let duplicate = true;
        if (data.length !== 0) duplicate = data.every(item => item.name !== value);
        if (duplicate) {
            callback();
        } else {
            if (record && record.name === value) {
                callback();
            } else {
                callback('不能建立重复列名');
            }
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
                            <a onClick={()=>this.handleDelete(record)}>删除</a>
                    </span>)
            }
        }];
        let isFunction = this.state.record && this.state.record.defaultValueIsFunc;
        const defaultValueIsFunc = this.props.form.getFieldValue('defaultValueIsFunc');
        if (defaultValueIsFunc === true) isFunction = true;
        if (defaultValueIsFunc === false) isFunction = false;
        const defaultValue = record && record.defaultValue
        const item = isFunction ?
            <FormItem label="默认值" {...formItemLayout}>
                {getFieldDecorator('defaultValue', {
                    initialValue: defaultValue || 'current_datetime'
                })(
                    <Select placeholder="请选择默认值">
                        <Option value='current_datetime'>current_datetime</Option>
                        <Option value='current_timestamp'>current_timestamp</Option>

                    </Select>
                )}
            </FormItem>
            :
            <FormItem label="默认值" {...formItemLayout}>
                {getFieldDecorator('defaultValue', {
                    initialValue: defaultValue
                })(
                    <Input placeholder="请输入默认值"/>
                )}
            </FormItem>;


        return (
            <div>
                <div style={{float: 'right', paddingRight: 20, marginTop: '-30px', marginBottom: '20px'}}>
                    <Button type="primary" onClick={() => this.addCol(null)} icon="plus">添加列</Button>
                </div>
                <Table
                    dataSource={data}
                    columns={columns}
                    styleName="table"
                    rowKey={record => record.name}
                    pagination={false}
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
                                        initialValue: record && record.name,
                                        rules: [{
                                            required: true, message: '请输入列名!',
                                        },
                                            {validator: (rule, value, callback) => this.validateName(rule, value, callback)},
                                        ],
                                    })(
                                        <Input placeholder="请输入列名"/>
                                    )}

                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="类型" {...formItemLayout}>
                                    {getFieldDecorator('type', {
                                        initialValue: record && record.type,
                                        rules: [{
                                            required: true, message: '请输入类型!',
                                        }]
                                    })(
                                        <Select placeholder="请输入类型">
                                            {options.map(
                                                (item, index) => {
                                                    return (
                                                        <Option key={index} value={item}>{item}</Option>
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
                                        initialValue: record && record.length
                                    })(
                                        <Input placeholder="请输入长度"/>
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
                                        initialValue: record && record.primaryKey,
                                        rules: [{
                                            required: true, message: '请选择是否为主键!',
                                        }]
                                    })(
                                        <Radio.Group buttonStyle="solid">
                                            <Radio.Button value={1}>是</Radio.Button>
                                            <Radio.Button value={0}>否</Radio.Button>

                                        </Radio.Group>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="默认值为函数" {...formItemLayout}>
                                    {getFieldDecorator('defaultValueIsFunc', {
                                        initialValue: isFunction || false,
                                        onChange: () => {
                                            this.props.form.setFieldsValue({defaultValue: void 0});
                                        }
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
                                        initialValue: record && record.notNull,
                                        rules: [{
                                            required: true, message: '请选择是否为空!',
                                        }]
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
                                        initialValue: record && record.autoincrement,
                                        rules: [{
                                            required: true, message: '请选择是否自增!',
                                        }]
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
                                        <TextArea rows={2} placeholder="请输入备注"/>
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
