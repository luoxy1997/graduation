import React, {Component} from 'react';
import {Modal, Row, Col, Form, Input, Button, Table, Select,InputNumber} from 'antd';
import {ajaxHoc} from "../../../commons/ajax";
import notify from '../notify';

const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;
@ajaxHoc()
@Form.create()
export default class IndexEditModal extends Component {

    state = {
        dataSource: this.props.indexTableConfig,
        selectedRowKeys: [],
        selectedRows:[],
        record:this.props.record,
    };

    componentWillReceiveProps(nextProps){
        if(nextProps.record !== this.state.record){
            const colName= nextProps.record && nextProps.record.colName && nextProps.record.colName.split(',');
            this.setState({
                selectedRowKeys: colName,
                record: nextProps.record
            });
            console.log(nextProps.record);

        }
    }

    handleOk = (e) => {
        e.preventDefault();
        const {onOk, form} = this.props;
        const {selectedRowKeys,selectedRows} = this.state;
        //校验的内容固定'type'和'name'
        const fields = [
            'name',
            'type',
            'remark'
        ];
        //动态添加要校验的内容
        selectedRowKeys.forEach(item => {
            fields.push(`number[${item}]`);
            fields.push(`order[${item}]`);
        });

        form.validateFieldsAndScroll(fields, (err, values) => {
            if (!err) {
                const data = selectedRowKeys.map(item => {
                    return {
                        columnId: selectedRows.find(it=> it.name === item).key,
                        order: values.order[item],
                        number: values.number[item],
                    }
                });
                delete values.order;
                delete values.number;
                const result = {...values, columns: data,tableId:this.props.tableId};
                this.props.ajax.post(`/indexinfo`,[result])
                    .then(() => {
                        notify('success','索引信息添加成功');
                        onOk(result);
                    });

            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {record,selectedRowKeys} = this.state;
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
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys,
                    selectedRows
                });


                //取消选中时，清除校验

                const {dataSource} = this.props;
                dataSource.forEach(item => {
                    const unSelected = !selectedRowKeys.find(it => it === item.key);
                    if (unSelected) {

                        const numberKey = `number[${item.name}]`;
                        const numberValue = this.props.form.getFieldValue(numberKey);
                        const orderKey = `order[${item.name}]`;
                        const orderValue = this.props.form.getFieldValue(orderKey);

                        this.props.form.setFields({
                            [numberKey]: {
                                value: numberValue,
                                errors: null
                            },
                            [orderKey]: {
                                value: orderValue,
                                errors: null
                            },
                        });
                    }


                });

            }
        };
        const columns = [{
            align: 'center',
            title: '列',
            dataIndex: 'name',
        }, {
            align: 'center',
            title: '顺序',
            render: (text, record) =>{

                return <FormItem>
                    {getFieldDecorator(`number[${record.name}]`, {
                        initialValue: record && record.number,
                        onChange: this.handleChange,
                        rules: [{
                            required: true, message: '必填项！'
                        }

                        ]
                    })(
                        <InputNumber
                            style={{width: 100}}
                        />
                    )}

                </FormItem>}
        }, {
            align: 'center',
            title: '排序',
            render: (text, record) =>
                <FormItem>
                    {getFieldDecorator(`order[${record.name}]`, {
                        initialValue: record && record.order,
                        rules: [{
                            required: true, message: '必填项！'
                        }]
                        // onChange: this.handleChange
                    })(
                        <Select style={{width: 120}} placeholder='选择排序方式'>
                            <Option value={0}>ASC</Option>
                            <Option value={1}>DESC</Option>
                        </Select>
                    )}

                </FormItem>
        }];

        return (
            <Modal
                mask
                width="600px"
                title={this.props.title}
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.onCancel}
                destroyOnClose={true}
                footer={[
                    <Button key="submit" type="primary" onClick={this.handleOk}>
                        保存
                    </Button>,
                    <Button key="back" onClick={this.props.onCancel}>
                        取消
                    </Button>,
                ]}
            >
                <Form>
                    <Row>
                        <FormItem label="索引名称" {...formItemLayout}>
                            {getFieldDecorator('name', {
                                initialValue: record && record.name,
                                rules: [
                                    {required: true, message: '请输入索引名称！'}
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
                                // onChange: this.handleChange
                                rules: [
                                    {required: true, message: '请输入索引类型！'}
                                ]
                            })(
                                <Select>
                                    <Option value="1">唯一</Option>
                                    <Option value="0">非唯一</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem>
                            <Table
                                columns={columns}
                                dataSource={this.props.dataSource}
                                bordered
                                pagination={false}
                                rowSelection={rowSelection}
                                rowKey={(record) => record.name}
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
        );
    }
}
