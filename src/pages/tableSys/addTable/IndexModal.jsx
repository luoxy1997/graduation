import React, {Component} from 'react';
import {Button, Col, Form, Input, InputNumber, Modal, Row, Select, Table, message} from "antd";
import notify from '../notify';
import {connect} from '../../../models';

const FormItem = Form.Item;
const {Option} = Select;
const {TextArea} = Input;
const uuid = require('uuid/v1');
@Form.create()
@connect()
@connect(state => {
    const {data} = state.colData;
    return {data};
})

export default class IndexModal extends Component {
    state = {
        selectedRowKeys: this.props.selectedRowKeys,
        record: this.props.record,
        visible: this.props.visible,
        dataSource: this.props.data,
        selectedRows: [],
        indexData: [],
    };

    //气泡确认框确认
    confirm = (record) => {
        const resultData = this.state.dataSource.filter(item => item.name !== record.name);
        this.setState({
            dataSource: resultData
        });
        this.props.modalData(resultData);
        message.success('删除成功');
    };


    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: nextProps.data,
        });
    }

    onCancel = () => {
        this.setState({
            visible: true,
        });
    };
    //校验是否有重名索引
    validateName = (rule, value, callback) => {
        const {indexData, record} = this.state;
        let duplicate = true;
        if (indexData.length !== 0) duplicate = indexData.every(item => item.name !== value);
        if (duplicate) {
            callback();
        } else {
            if (record && record.name === value) {
                callback();
            } else {
                callback('不能建立重复索引名！');
            }
        }
    };

    handleOk = () => {
        const {record} = this.props;
        const {selectedRowKeys} = this.props;
        //校验的范围，由固定的name和type组成
        const fields = [
            'name',
            'type',
            'remark',
        ];
        selectedRowKeys.forEach(item => {
            fields.push(`number[${item}]`);
            fields.push(`order[${item}]`);
        });

        this.props.form.validateFields(fields, (err, value) => {
            const {selectedRowKeys} = this.props;

            if (!err) {
                const columnsData = selectedRowKeys && selectedRowKeys.length && selectedRowKeys.map(item => {
                    return {
                        key: item,
                        name: this.state.dataSource.find(it => it.name === item).name,
                        order: value.order[item],
                        number: value.number[item],
                    }
                });
                delete value.order;
                delete value.number;
                const result = {...value, columns: columnsData};    //添加索引信息后数据
                let {indexData} = this.state;
                //新增，修改索引
                if (record) {
                    indexData = indexData.filter(item => item.name !== record.name);
                }
                indexData.push(result);     //给后端发送的数据
                //
                // if (selectedRowKeys && selectedRowKeys.length !== 0) {
                //     this.setState({
                //         indexData,
                //         visible: false,
                //     });
                //     this.props.modalData(indexData)
                // } else {
                //     notify('error', '请至少选择一个列配置！');
                // }
                this.setState({
                    indexData,
                    visible: false,
                });
                this.props.modalData(indexData)


            }
        });
    };

    render() {
        const {selectedRowKeys, visible} = this.state;
        const {record} = this.props;
        const {getFieldDecorator} = this.props.form;
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

        const columns = [{
            align: 'center',
            title: '列',
            dataIndex: 'name',
            render: text => <a>{text}</a>,
        }, {
            align: 'center',
            title: '顺序',
            render: (text, record) => {
                let it;
                let number;
                if (record) {
                    this.state.indexData.forEach(item => {
                        it = item.columns && item.columns.length && item.columns.find(item => item.key === record.key);
                        number = it && it.number;
                    });
                } else {
                    number = null
                }


                return (<FormItem>
                    {getFieldDecorator(`number[${record.key}]`, {
                        initialValue: number,
                        rules: [{
                            required: true, message: '必填项!',
                        }],
                    })(
                        <InputNumber style={{width: 100}}/>
                    )}
                </FormItem>)
            }


        }, {
            align: 'center',
            title: '排序',
            render: (text, record) => {
                let it;
                let order;
                if (record) {

                    this.state.indexData.forEach(item => {
                        it = item.columns && item.columns.length && item.columns.find(item => item.key === record.key);
                        order = it && it.order;

                    });
                } else {
                    order = null;
                }

                return <FormItem>
                    {getFieldDecorator(`order[${record.key}]`, {
                        initialValue: order,
                        onChange: this.handleChange,
                        rules: [{
                            required: true, message: '必填项!',
                        }]

                    })(
                        <Select style={{width: 120}} placeholder='选择排序方式'>
                            <Option value={0}>ASC</Option>
                            <Option value={1}>DESC</Option>
                        </Select>
                    )}

                </FormItem>

            }

        }];

        //行选择--key值
        const rowSelection = {
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys,
                    selectedRows
                });

                // 如果未选中的行 清除校验信息
                const {dataSource} = this.state;

                dataSource.forEach(item => {
                    const unSelected = !selectedRowKeys.find(it => it === item.key);
                    console.log(unSelected, 'iop');
                    if (unSelected) {

                        const numberKey = `number[${item.key}]`;
                        const numberValue = this.props.form.getFieldValue(numberKey);
                        const orderKey = `order[${item.key}]`;
                        const orderValue = this.props.form.getFieldValue(orderKey);

                        this.props.form.setFields({
                            [numberKey]: {
                                value: numberValue,
                                errors: null,
                            },
                            [orderKey]: {
                                value: orderValue,
                                errors: null,
                            },
                        });
                    }
                })

            },

        };


        return (

            <Modal
                mask
                width="500px"
                destroyOnClose
                title={record ? '修改' : '添加'}
                visible={this.props.visible}
                onCancel={this.props.onCancel}
                footer={[
                    <Button key="submit" type="primary" onClick={this.handleOk}>
                        保存
                    </Button>,
                ]}
            >
                <Form>
                    <FormItem>
                        {getFieldDecorator('id', {
                            initialValue: uuid(),
                        })(
                            <Input type="hidden"/>
                        )}

                    </FormItem>
                    <Row>
                        <FormItem label="索引名称" {...formItemLayout}>
                            {getFieldDecorator('name', {
                                initialValue: record && record.name,
                                rules: [{
                                    required: true, message: '必填项!',
                                },
                                    {validator: (rule, value, callback) => this.validateName(rule, value, callback)},
                                ]
                            })(
                                <Input/>
                            )}

                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem label="索引类型" {...formItemLayout}>
                            {getFieldDecorator('type', {
                                initialValue: record && record.type,
                                onChange: this.handleChange,
                                rules: [{
                                    required: true, message: '必填项!',
                                }]

                            })(
                                <Select>
                                    <Option value='0'>非唯一</Option>
                                    <Option value='1'>唯一</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem>
                            <Table
                                columns={columns}
                                dataSource={this.state.dataSource}
                                bordered
                                pagination={false}
                                rowSelection={rowSelection}
                                rowKey={record => record.name}
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
        )
    }
}
